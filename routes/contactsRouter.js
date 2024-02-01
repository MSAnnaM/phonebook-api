import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateStatusSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import checkIsValidId from "../midellwares/isValidId.js";
const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",checkIsValidId, getOneContact);

contactsRouter.delete("/:id",checkIsValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", checkIsValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", checkIsValidId, validateBody(updateStatusSchema), updateContact);

export default contactsRouter;
