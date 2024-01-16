import { z } from "zod";

const contactSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    telephone: z.string(),
    dateJoin: z.string().or(z.date()),
});

const contactSchemaRequest = contactSchema.omit({
    id: true,
    dateJoin: true,
});

const contactsSchemaResponse = z.array(contactSchema);

const contactSchemaUpdate = contactSchema.omit({
    id: true,
    dateJoin: true,
}).partial();

export {
    contactSchema,
    contactSchemaRequest,
    contactsSchemaResponse,
    contactSchemaUpdate,
};
