import { Request, Response } from "express";
import { SessionService } from "../services/session.service";
import { verify } from "jsonwebtoken";


export class SessionController {
    constructor(private sessionService: SessionService) { }
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const token = await this.sessionService.create({ email, password })

        const clientId = verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
            if (error) {
                return res.status(401).json({
                    message: "invalid token"
                })
            }
            
            return decoded.sub
        })
        

        return res.json({ token, clientId })
    }
}