import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entitie";
import { Contact } from "../entities/contact.entitie";
import { AppError } from "../errors/AppError";
import {
    TContactRequest,
    TContactResponse,
    TContactUpdate,
    TContactsResponse,
} from "../interfaces/contacts.interfaces";
import {
    contactSchema,
    contactsSchemaResponse,
} from "../schemas/contacts.schemas";

export class ContactsService {
    async create(
        data: TContactRequest,
        clientId: string
    ): Promise<TContactResponse> {
        const contactRepo = AppDataSource.getRepository(Contact);
        const clientRepo = AppDataSource.getRepository(Client);

        const findClient = await clientRepo.findOne({
            where: { id: clientId },
        });

        if (!findClient) {
            throw new AppError("Client not found.", 404);
        }

        const newDate = new Date(Date.now());

        const contact = contactRepo.create({
            ...data,
            dateJoin: newDate,
            client: findClient,
        });

        await contactRepo.save(contact);

        return contactSchema.parse(contact);
    }

    async list(clientId: string): Promise<TContactsResponse> {
        const clientRepo = AppDataSource.getRepository(Client);
        const findClient = await clientRepo.findOne({
            where: { id: clientId },
            relations: { contacts: true },
        });

        if (!findClient) {
            throw new AppError("Client not found.", 404);
        }

        return contactsSchemaResponse.parse(findClient.contacts);
    }

    async update(
        data: TContactUpdate,
        contactId: string
    ): Promise<TContactResponse> {
        const contactRepo = AppDataSource.getRepository(Contact);
        const findContact = await contactRepo.findOneBy({ id: contactId });

        if (!findContact) {
            throw new AppError("Contact not found.", 404);
        }

        const newContact = contactRepo.create({
            ...findContact,
            ...data,
        });

        await contactRepo.save(newContact);

        return contactSchema.parse(newContact);
    }

    async remove(contactId: string): Promise<void> {
        const contactRepo = AppDataSource.getRepository(Contact);
        const findContact = await contactRepo.findOne({
            where: { id: contactId },
        });

        if (!findContact) {
            throw new AppError("Contact not found.", 404);
        }

        await contactRepo.remove(findContact);
    }
}
