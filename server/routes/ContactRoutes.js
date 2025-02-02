import { Router } from "express";
import { getAllContacts, getContactsForDMList, searchContacts } from "../controllers/ContactController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";



const contactsRoutes = Router();

contactsRoutes.post("/search", varifyToken, searchContacts)

contactsRoutes.get("/get-contexts-for-dm", varifyToken, getContactsForDMList)

contactsRoutes.get("/get-all-contacts", varifyToken, getAllContacts)



export default contactsRoutes