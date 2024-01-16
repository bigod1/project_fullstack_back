import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entitie";
import {
    TClientRequest,
    TClientResponse,
    TClientUpdate,
} from "../interfaces/clients.interfaces";
import {
    clientSchemaResponse,
    clientsSchemaResponse,
} from "../schemas/clients.schemas";
import { AppError } from "../errors/AppError";

class ClientsService {
    async create({
        name,
        email,
        password,
        telephone,
    }: TClientRequest): Promise<TClientResponse> {
        const clientRepo = AppDataSource.getRepository(Client);
        const findClient = await clientRepo.findOne({
            where: { email },
        });

        if (findClient) {
            throw new AppError("Client already exists.", 409);
        }

        const hashedPassword = await hash(password, 10);
        const newDate = new Date(Date.now());

        const client = clientRepo.create({
            name,
            email,
            password: hashedPassword,
            telephone,
            dateJoin: newDate,
        });

        await clientRepo.save(client);

        return clientSchemaResponse.parse(client);
    }

    async list() {
        const clientRepo = AppDataSource.getRepository(Client);
        const clients = await clientRepo.find();

        return clientsSchemaResponse.parse(clients);
    }

    async retrive(clientId: string) {
        const clientRepo = AppDataSource.getRepository(Client);
        const client = await clientRepo.findOneBy({ id: clientId });

        return clientSchemaResponse.parse(client);
    }

    async update(
        data: TClientUpdate,
        clientId: string
    ): Promise<TClientResponse> {
        const clientRepo = AppDataSource.getRepository(Client);
        const findClient = await clientRepo.findOneBy({ id: clientId });

        if (!findClient) {
            throw new AppError("Client not found.", 404);
        }

        if(data.password){
            data.password = await hash(data.password!, 10);
        }

        const newClient = clientRepo.create({
            ...findClient,
            ...data,
        });

        await clientRepo.save(newClient);

        return clientSchemaResponse.parse(newClient);
    }

    async remove(clientId: string): Promise<void> {
        const clientRepo = AppDataSource.getRepository(Client);
        const findClient = await clientRepo.findOne({
            where: { id: clientId },
        });

        if (!findClient) {
            throw new AppError("Client not found.", 404);
        }

        await clientRepo.remove(findClient);
    }
}

export { ClientsService };
