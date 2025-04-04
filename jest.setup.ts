import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

console.log("Loaded DATABASE_URL in Jest:", process.env.DATABASE_URL);
