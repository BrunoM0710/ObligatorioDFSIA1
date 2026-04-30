import "dotenv/config";
import app from "./app.js";
import connectDB from "./v1/config/db.config.js";

await connectDB();

app.listen(3000, () => {
  console.log("Servidor corriendo");
}); 