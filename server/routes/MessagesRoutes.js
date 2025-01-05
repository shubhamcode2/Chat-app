
import { Router } from "express";
import { varifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import multer from "multer";

const messagesRoutes = Router();
const upload = multer({ dest: "uploads/profiles" });
messagesRoutes.post("/get-messages", varifyToken, getMessages)
messagesRoutes.post("/upload-file", varifyToken, upload.single("file"), uploadFile)

export default messagesRoutes;