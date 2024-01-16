import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Client } from "../entities/client.entitie";

export const EnsureIsClientMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const clientRepo = AppDataSource.getRepository(Client)
    const clientIdParams = req.params.id
    const clientIdToken = res.locals.clientId

    const client = await clientRepo.findOne({
        where: {
            id: clientIdParams
        }
    })

    if(!client){
        throw new AppError("Client not found", 404)
    }
    
    if(clientIdParams !== clientIdToken){
        throw new AppError("You don`t have permission", 403)
    }

    return next()
}