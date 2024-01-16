import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entitie";
import { AppError } from "../errors/AppError";

export const EnsureIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contactRepo = AppDataSource.getRepository(Contact)
    const contactId = req.params.id
    const clientId = res.locals.clientId

    const contact = await contactRepo.findOne({
        where: {
            id: contactId
        },
        relations: {
            client: true
        }
    })

    if(!contact){
        throw new AppError("Contact not found", 404)
    }
    
    if(contact.client.id !== clientId){
        throw new AppError("You don`t have permission", 403)
    }

    return next()
}