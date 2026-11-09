
import app from "../v1/app.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "../v1/config/db.config.js";

await connectDB();

export default app;
