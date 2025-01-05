
import { Router } from "express";
import { varifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessagesController.js";

const messagesRoutes = Router();
messagesRoutes.post("/get-messages", varifyToken, getMessages)


export default messagesRoutes;