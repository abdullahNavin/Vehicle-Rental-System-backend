import { JwtPayload } from "jsonwebtoken"
import { pool } from "../../config/db"

const createBooking = async (payload: Record<string, unknown>, vehicle: Record<string, unknown>) => {

    const { rent_end_date, rent_start_date, vehicle_id, customer_id } = payload as {
        rent_end_date: string
        rent_start_date: string
        vehicle_id: number
        customer_id: number
    }

    const { daily_rent_price } = vehicle as { daily_rent_price: number }

    const startDate = new Date(rent_start_date)
    const endDate = new Date(rent_end_date)

    const millisecondsPerDay = 1000 * 60 * 60 * 24
    const totalDays =
        Math.floor((endDate.getTime() - startDate.getTime()) / millisecondsPerDay) + 1;

    // console.log(totalDays);
    const totalPrice = totalDays * daily_rent_price

    const result = await pool.query(
        `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, "active"]
    )
    return result;

}

const getBookings = async (user: JwtPayload) => {
    if (user.role === 'customer') {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE customer_id=$1`, [user.id]
        )
        return result;
    }
    const result = await pool.query(
        `SELECT * FROM bookings`
    )
    return result;
}

// update booking from customer side
const customerUpdateBooking = async (status: string, id: string) => {

    const query = `
        UPDATE bookings
        SET status=$1
        WHERE id = $2
        RETURNING *
    `
    const result = await pool.query(query, [status, id])
    return result;
}

// update booking from admin side
const adminUpdateBooking = async (status: string, id: string) => {
    const query = `
        UPDATE bookings
        SET status=$1
        WHERE id = $2
        RETURNING *
    `
    const result = await pool.query(query, [status, id])
    return result;
}

// get booking by vehicle id or user id
const getBookingByVehicleIdOrUserId = async (obj: { vehicleId?: number, userId?: number }) => {
    if (obj.vehicleId) {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE vehicle_id=$1`, [obj.vehicleId]
        )
        return result;
    }
    if (obj.userId) {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE customer_id=$1`, [obj.userId]
        )
        return result;
    }
    return { rows: [] };
}

export const bookingService = {
    createBooking,
    getBookings,
    customerUpdateBooking,
    adminUpdateBooking,
    getBookingByVehicleIdOrUserId
}