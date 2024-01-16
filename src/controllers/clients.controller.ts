import { Request, Response } from "express";
import { ClientsService } from "../services/clients.service";
import { TClientRequest, TClientUpdate } from "../interfaces/clients.interfaces";

class ClientsController {
    constructor(private clientService: ClientsService) {}
    
    async create(req: Request, res: Response) {
        const { name, email, password, telephone }: TClientRequest = req.body;
        const newClient = await this.clientService.create({
            name,
            email,
            password,
            telephone,
        });

        return res.status(201).json(newClient);
    }

    async list(_: Request, res: Response) {
        const clients = await this.clientService.list();

        return res.json(clients);
    }

    async retrive(req: Request, res: Response) {
        const clientId = req.params.id
        
        const clients = await this.clientService.retrive(clientId);

        return res.json(clients);
    }

    async update(req: Request, res: Response) {
        const updateData: TClientUpdate = req.body
        const clientId = req.params.id

        const updateClient = await this.clientService.update(updateData, clientId);

        return res.json(updateClient);
    }

    async remove(req: Request, res: Response) {
        const clientId = req.params.id
        await this.clientService.remove(clientId);

        return res.status(204).send();
    }
}

export { ClientsController };
