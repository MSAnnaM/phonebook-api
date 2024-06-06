import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import checkIsValidId from "../midellwares/isValidId.js";
import { verifyToken } from "../midellwares/checkToken.js";

const contactsRouter = express.Router();

contactsRouter.use(verifyToken);
contactsRouter.use("/:id", checkIsValidId);
contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", validateBody(createContactSchema), createContact);

export default contactsRouter;
