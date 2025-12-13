import { Request, Response } from "express";
import { authService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.registerUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "User registration failed",
                errors: err.message
            }
        )
    }
}

const userSignIn = async (req: Request, res: Response) => {
    const payload = req.body
    try {
        const result = await authService.userSignIn(payload)

        if (result === null || !result) {
            res.status(500).json(
                {
                    success: false,
                    message: "User signIn failed, Check your email and password",
                }
            )
            return;
        }
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token: result.token,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    phone: result.user.phone,
                    role: result.user.role
                }
            }

        })
    }
    catch (err: any) {
        res.status(500).json(
            {
                success: false,
                message: "User signIn failed",
                errors: err.message
            }
        )
    }
}


export const authController = {
    registerUser,
    userSignIn
}