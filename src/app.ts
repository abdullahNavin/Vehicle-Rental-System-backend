import express, { Request, Response } from 'express'
import { initDB } from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
import { vehicleRoutes } from './modules/vehicles/vehicles.routes'
import { usersRoutes } from './modules/users/users.routes'
import { bookingRoutes } from './modules/booking/booking.routes'

const app = express()

app.use(express.json())

// DB
initDB()

// bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkJhbGkiLCJlbWFpbCI6ImJhbGlAZXhhbXBsZS5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJwaG9uZSI6IjAxNzE5MDQ1Njc4IiwiaWF0IjoxNzY1Nzk2NzQ0LCJleHAiOjE3NjYxNDIzNDR9.APX5KnV-HjIL6c7d_cAk_fECjn9Aqw9jUgKMpbeTa2M

// {"success":true,"message":"User registered successfully","data":{"id":6,"name":"Bali","email":"bali@example.com","password":"$2b$10$VRBiAPAc8R/eYU91RMSuY.NkmTgVO1zcl.9yAmVB6007jsvHKTq0.","phone":"01719045678","role":"customer"}}

// admin******
// "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gVXBkYXRlZCIsImVtYWlsIjoiam9obi51cGRhdGVkQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwicGhvbmUiOiIrMTIzNDU2Nzg5OSIsImlhdCI6MTc2NTgxNTkyMywiZXhwIjoxNzY2MTYxNTIzfQ.5SuFEyMXnQ2bMDnITz9fA7KkMZfPlMR_jBtQIkOsvHk","user":{"id":1,"name":"John Updated","email":"john.updated@example.com","phone":"+1234567899","role":"admin"}}}

// initialize routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// sign up user
app.use('/api/v1/auth', authRoutes)

// vehicles routes
app.use('/api/v1/vehicles', vehicleRoutes)

// users routes
app.use('/api/v1/users', usersRoutes)

// booking routes
app.use('/api/v1/bookings', bookingRoutes)

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `${req.path} route not found`
    })
})

export default app

