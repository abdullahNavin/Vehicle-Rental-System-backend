import { Request, Response } from "express";
import { vehicleService } from "../vehicles/vehicles.service";
import { bookingService } from "./booking.service";
import { pool } from "../../config/db";

const createBooking = async (req: Request, res: Response) => {

    const { rent_end_date, rent_start_date, vehicle_id, customer_id } = req.body

    try {

        const vehicle = await vehicleService.getSingleVehicle(vehicle_id)

        if (vehicle.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }

        if (vehicle.rows[0].availability_status !== 'available') {
            return res.status(400).json({
                success: false,
                message: "Vehicle already booked"
            })
        }

        const result = await bookingService.createBooking(req.body, vehicle.rows[0])

        if (result.rowCount === 0) {
            res.status(500).json(
                {
                    success: false,
                    message: "failed to add booking",
                }
            )
            return;
        }

        const updateVehicleStatus = await vehicleService.updateVehicle({ availability_status: "booked" }, vehicle_id)

        if (updateVehicleStatus.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "failed to add booking"
            })
        }

        result.rows[0].vehicle = {
            vehicle_name: vehicle.rows[0].vehicle_name,
            daily_rent_price: vehicle.rows[0].daily_rent_price
        }

        res.status(201).json(
            {
                success: true,
                message: "Booking created successfully",
                data: result.rows[0]
            }
        )

    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to create booking",
                errors: err.message
            }
        )
    }
}

const getBookings = async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        })
    }
    try {
        if (user.role === "admin") {
            const result = await bookingService.getBookings(user)
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result.rows
            })
        }
        if (user.role === 'customer') {

            const result = await bookingService.getBookings(user)
            // console.log('1',result);

            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            const vehicle = await vehicleService.getSingleVehicle(result.rows[0].vehicle_id)
            if (vehicle.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "vehicle not found"
                })
            }

            result.rows[0].vehicle = {
                vehicle_name: vehicle.rows[0].vehicle_name,
                registration_number: vehicle.rows[0].registration_number,
                type: vehicle.rows[0].type
            }

            res.status(200).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to create booking",
                errors: err.message
            }
        )
    }
}

const updateBooking = async (req: Request, res: Response) => {
    const user = req.user;
    const status = req.body.status;
    const id = req.params.bookingId;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        })
    }
    try {

        if (user.role === "customer" && status === "cancelled") {

            const booking = await pool.query(
                `SELECT * FROM bookings WHERE customer_id=$1`, [user.id]
            )
            if (booking.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to find your booking"
                })
            }

            const beforeStartDate = new Date(booking.rows[0].rent_start_date).getTime() > Date.now();

            if (!beforeStartDate) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot cancel booking after start date"
                })
            }

            if (beforeStartDate) {
                const result = await bookingService.customerUpdateBooking(status, id as string)

                if (result.rows.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "Failed to update booking"
                    })
                }
                res.status(200).json({
                    success: true,
                    message: "Booking cancelled successfully",
                    data: result.rows[0]
                })
            }

        }

        // admin update booking logic
        if (user.role === "admin") {
            const result = await bookingService.adminUpdateBooking(status, id as string)
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to update booking"
                })
            }

            // update vehicle status to available
            if (status === "returned") {

                const booking = result.rows[0]

                const updateVehicleStatus = await vehicleService.updateVehicle({ availability_status: "available" }, booking.vehicle_id)

                if (updateVehicleStatus.rows.length === 0) {
                    return res.status(404).json({
                        success: false,
                        message: "failed to update vehicle status"
                    })
                }

                result.rows[0].vehicle = {
                    availability_status: updateVehicleStatus.rows[0].availability_status
                }

                res.status(200).json({
                    success: true,
                    message: "Booking marked as returned. Vehicle is now available",
                    data: result.rows[0]
                })
            }
        }
        res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to create booking",
                errors: err.message
            }
        )
    }
}

export const bookingController = {
    createBooking,
    getBookings,
    updateBooking
}