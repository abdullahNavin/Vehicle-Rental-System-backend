import { Pool } from 'pg';
import config from '.';

const pool = new Pool({
    connectionString: config.connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

const initDB = async () => {
    try {
        await pool.query(               //Table name users or Users
            `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE CHECK (email = LOWER(email)),
        password TEXT NOT NULL CHECK(LENGTH(password) >= 6),
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer' CHECK(role IN ('admin','customer'))
        )`
        )

        // vehicles table
        await pool.query(               //type	'car', 'bike', 'van' or 'SUV'
            `CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(50) NOT NULL CHECK(type IN ('car','bike','van','SUV')),
            registration_number VARCHAR(100) NOT NULL UNIQUE,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK(availability_status IN ('available','booked'))
            )`
        )

        // BOOKING TABLE
        await pool.query(
            `CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL CHECK(rent_end_date > rent_start_date),
            total_price NUMERIC(10,2) NOT NULL CHECK(total_price > 0),
            status VARCHAR(50) DEFAULT 'active' CHECK(status IN ('active','cancelled','returned'))
            )`
        )
    }
    catch (err: any) {
        console.log({ errorMessage: err.message });
    }

}

export { initDB, pool }