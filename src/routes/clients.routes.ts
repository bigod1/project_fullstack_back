import { Router } from "express";
import { clientsController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientSchemaRequest, clientSchemaUpdate } from "../schemas/clients.schemas";
import { EnsureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";
import { EnsureIsClientMiddleware } from "../middlewares/ensureIsClient.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const clientsRoutes = Router();

clientsRoutes.post(
    "",
    ensureDataIsValidMiddleware(clientSchemaRequest),
    (req, res) => clientsController.create(req, res)
);
clientsRoutes.get("", (req, res) => {
    clientsController.list(req, res);
});

clientsRoutes.use(ensureAuthMiddleware);

clientsRoutes.get("/:id",
    EnsureIsClientMiddleware,
    (req, res) => clientsController.retrive(req, res)
)
clientsRoutes.patch(
    "/:id",
    EnsureIsClientMiddleware,
    ensureDataIsValidMiddleware(clientSchemaUpdate),
    (req, res) => clientsController.update(req, res)
);
clientsRoutes.delete(
    "/:id",
    EnsureIsClientMiddleware,
    (req, res) => clientsController.remove(req, res)
);

export { clientsRoutes };
