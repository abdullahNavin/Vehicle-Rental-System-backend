import express, { Request, Response } from 'express'
import app from './app'


app.use(express.json())

// initialize routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


