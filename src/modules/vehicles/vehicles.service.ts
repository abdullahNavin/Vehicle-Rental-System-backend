import { pool } from "../../config/db"

const addVehicel = async (payload: Record<string, unknown>) => {

    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload

    const result = await pool.query(
        `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    )
    return result
}

// get all vehicles
const getAllVehicles = async () => {
    const result = await pool.query(
        `SELECT * FROM vehicles`
    )
    return result
}

// get single vehicle by id
const getSingleVehicle = async (id: string) => {
    const result = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`, [id]
    )
    return result;
}

// update vehicle
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {

    const fields = []
    const values = []
    let index = 1

    for (const [key, value] of Object.entries(payload)) {
        fields.push(`${key} = $${index}`)
        values.push(value)
        index++;
    }

    if (fields.length === 0) {
        throw new Error("No fields to update")
    }
    values.push(id)

    const query = `
        UPDATE vehicles
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *
    `
    const result = await pool.query(query, values)
    return result;
}

// delete vehicle
const deleteVehicle = async (id: string) => {
    const result = await pool.query(
        `DELETE FROM vehicles WHERE id=$1`, [id]
    )
    return result;
}

export const vehicleService = {
    addVehicel,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}