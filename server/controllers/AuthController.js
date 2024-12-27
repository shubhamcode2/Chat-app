import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";


//here token data is email and userId and maxAge is 3 days in millisecond and JWT_KEY is the secret key
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password are required");
        }
        const user = await User.create({ email, password });
        response.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"none",
            httpOnly:true, 
        });
        return response
        .status(201)
        .json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
            }
        })

    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
}


export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and Password are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User with this email does not exist");
            
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(404).send("Invalid Password");
        }

        response.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"none",
            httpOnly:true, 
        });
        return response
        .status(200)
        .json({
            user:{
                id:user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color,

                profileSetup:user.profileSetup,
            }
        })

    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
}

