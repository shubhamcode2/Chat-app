import { Router } from "express";
import { getContactsForDMList, searchContacts } from "../controllers/ContactController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";



const contactsRoutes = Router();

contactsRoutes.post("/search", varifyToken, searchContacts)

contactsRoutes.get("/get-contexts-for-dm", varifyToken, getContactsForDMList)




export default contactsRoutes