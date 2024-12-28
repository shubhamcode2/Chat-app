import { Router } from "express";
import { getUserInfo, login, signup } from "../controllers/AuthController.js";
import { varifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info",varifyToken, getUserInfo)
export default authRoutes;