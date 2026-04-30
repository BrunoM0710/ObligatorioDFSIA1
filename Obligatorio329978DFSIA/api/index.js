import app from "../v1/app.js";
import connectDB from "../v1/config/db.config.js";

await connectDB(); // 🔥 CLAVE

export default app;