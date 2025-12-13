import express, { Request, Response } from 'express'
import { initDB } from './config/db'
import { authRoutes } from './modules/auth/auth.routes'
import { vehicleRoutes } from './modules/vehicles/vehicles.routes'
import { usersRoutes } from './modules/users/users.routes'

const app = express()

app.use(express.json())

// DB
initDB()

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

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `${req.path} not found this route`
    })
})

export default app

