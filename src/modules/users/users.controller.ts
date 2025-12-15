import { Request, Response } from "express";
import { usersService } from "./users.service";
import { bookingService } from "../booking/booking.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersService.getAllUsers()
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'users not found'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                data: result.rows
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to get all users",
                errors: err.message
            }
        )
    }
}

// delete user
const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.userId;
    try {

        const checkBookingOnUserId = await bookingService.getBookingByVehicleIdOrUserId({ userId: parseInt(id as string) })
        
        if (checkBookingOnUserId.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User has active bookings and cannot be deleted"
            })
        }

        const result = await usersService.deleteUser(id as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'failed to delete user'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to delete the user",
                errors: err.message
            }
        )
    }
}

// update user
const updateUser = async (req: Request, res: Response) => {
    const id = req.params.userId
    try {
        const result = await usersService.updateUser(req.body, id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'failed to update user'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "failed to update user",
                errors: err.message
            }
        )
    }

}

export const usersController = {
    getAllUsers,
    deleteUser,
    updateUser
}