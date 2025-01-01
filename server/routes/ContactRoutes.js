import { Router } from "express";
import { searchContacts } from "../controllers/ContactController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";
const contactsRoutes = Router();

contactsRoutes.post("/search", varifyToken, searchContacts)

export default contactsRoutes