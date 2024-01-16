import { Request, Response } from "express-serve-static-core";
import { TContactRequest, TContactUpdate } from "../interfaces/contacts.interfaces";
import { ContactsService } from "../services/contacts.service";


export class ContactsController {
    constructor(private contactsService: ContactsService) {}

    async create(req: Request, res: Response) {
        const clientId = res.locals.clientId

        const newClient = await this.contactsService.create(
            req.body,
            clientId
        );

        return res.status(201).json(newClient);
    }

    async list(req: Request, res: Response) {
        const clientId = res.locals.clientId

        const contacts = await this.contactsService.list(clientId);

        return res.json(contacts);
    }

    async update(req: Request, res: Response) {
        const updateData: TContactUpdate = req.body
        const contactId = req.params.id

        const updateContact = await this.contactsService.update(updateData, contactId);

        return res.json(updateContact);
    }

    async remove(req: Request, res: Response) {
        const clientId = req.params.id
        await this.contactsService.remove(clientId);

        return res.status(204).send();
    }
}
