
import { Router } from "express";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";

const channelRoutes = Router();
channelRoutes.post("/create-channel", varifyToken, createChannel) 
channelRoutes.get("/get-user-channels", varifyToken, getUserChannels)
channelRoutes.get("/get-channel-messages/:channelId", varifyToken, getChannelMessages)


export default channelRoutes;