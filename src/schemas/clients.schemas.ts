import { z } from "zod";

const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    telephone: z.string(),
    dateJoin: z.string().or(z.date()),
});

const clientSchemaRequest = clientSchema.omit({
    id: true,
    dateJoin: true,
});

const clientSchemaResponse = clientSchema.omit({
    password: true,
});

const clientsSchemaResponse = z.array(clientSchemaResponse);

const clientSchemaUpdate = clientSchema.omit({
    id: true,
    dateJoin: true,
}).partial();

export {
    clientSchema,
    clientSchemaRequest,
    clientSchemaResponse,
    clientSchemaUpdate,
    clientsSchemaResponse,
};
