import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entitie";
import { AppError } from "../errors/AppError";
import { TLoginRequest } from "../interfaces/login.interfaces";
import { sign } from "jsonwebtoken";
import "dotenv/config"

export class SessionService {
    async create({ email, password }: TLoginRequest) {
        const clientRepo = AppDataSource.getRepository(Client);
        const findClient = await clientRepo.findOne({
            where: { email },
        });

        if (!findClient) {
            throw new AppError("Invalid credentials.", 401);
        }

        const passwordMatch = await compare(password, findClient.password);

        if (!passwordMatch) {
            throw new AppError("Invalid credentials.", 401);
        }

        const token = sign(
            { userName: findClient.name },
            process.env.SECRET_KEY!,
            { expiresIn: "1h", subject: findClient.id }
        );
        
        return token
    }
}
