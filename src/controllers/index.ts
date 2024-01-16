import { ClientsService } from "../services/clients.service";
import { ClientsController } from "./clients.controller";
import { ContactsService } from "../services/contacts.service";
import { ContactsController } from "./contacts.controller";
import { SessionService } from "../services/session.service";
import { SessionController } from "./session.controller";

const clientsService = new ClientsService();
const clientsController = new ClientsController(clientsService);

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService)

const contactService = new ContactsService();
const contactController = new ContactsController(contactService)


export { clientsController, sessionController, contactController };
