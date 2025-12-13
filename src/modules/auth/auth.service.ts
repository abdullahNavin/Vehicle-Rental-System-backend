import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";

const registerUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload
    const hassPass = await bcrypt.hash(password as string, 10)
    const result = await pool.query(
        `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hassPass, phone, role]
    )
    return result;
}

const userSignIn = async (payload: Record<string, unknown>) => {

    const { email, password } = payload

    const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`, [email]
    )
    if (result.rows.length === 0) {
        return null
    }

    const user = result.rows[0]

    const match = bcrypt.compare(password as string, user.password)
    if (!match) {
        return false;
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }, config.jwtSecret as string, { expiresIn: '4d' })

    // console.log(token);
    return { token, user }
}

export const authService = {
    registerUser,
    userSignIn
}