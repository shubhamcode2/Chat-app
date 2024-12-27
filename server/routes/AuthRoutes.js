import { Router } from "express";
import { login, signup } from "../controllers/AuthController.js";
import { get } from "mongoose";


const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info",get)
export default authRoutes;