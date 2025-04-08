import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma.js";

interface decodedToken extends JwtPayload {
  userId: string;
}
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "unauthorized request" });
    }

    const decrypt = jwt.verify(token, process.env.JWT_secret!) as decodedToken;
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
  } catch (error: any) {
    console.error("protection middleware error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export default protectRoute;
