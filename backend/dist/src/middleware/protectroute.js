import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "unauthorized request" });
        }
        const decrypt = jwt.verify(token, process.env.JWT_SECRET);
        if (!decrypt) {
            return res.status(401).json({ error: "unauthorized request" });
        }
        const user = await prisma.user.findUnique({
            where: { id: decrypt.userId },
            select: { id: true, username: true, fullName: true, profilePic: true },
        });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("protection middleware error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
export default protectRoute;
