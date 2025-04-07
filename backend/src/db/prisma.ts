import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => console.log("Connected to database"))
  .catch((err: any) => console.error("Database connection error:", err));
export default prisma;
