import jwt from "jsonwebtoken";

export const varifyToken = (request, response, next) => {
    const token = request.cookies.jwt;
    if (!token) return response.status(401).send("Access Denied, you are not authenticated");
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return response.status(403).send("Token is not valid!");
        request.userId = payload.userId;
        next();
    });
}