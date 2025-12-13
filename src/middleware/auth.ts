import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config';

const auth = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const headersToken = req.headers.authorization;
        if (!headersToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            })
        }
        const token = headersToken.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            })
        }

        const decode = jwt.verify(token, config.jwtSecret as string) as JwtPayload

        if (!decode) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access'
            })
        }
        req.user = decode;

        if (role.length && !role.includes(decode.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden access'
            })
        }

        if (decode.role === 'customer') {
            if (decode.id != req?.params?.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden access customer'
                })
            }
        }

        next()

    }
}

export default auth;