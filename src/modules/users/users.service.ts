import { pool } from "../../config/db"

const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT * FROM users`
    )
    return result;
}

// delete user
const deleteUser = async (id: string) => {
    const result = await pool.query(
        `DELETE FROM users WHERE id=$1`, [id]
    )
    return result;
}

// update user
const updateUser = async (payload: Record<string, unknown>, id: string) => {
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
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id = $${index}
        RETURNING *
    `
    const result = await pool.query(query, values)

    return result
}

export const usersService = {
    getAllUsers,
    deleteUser,
    updateUser
}