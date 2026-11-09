import "dotenv/config";

import app from "./v1/app.js";
import connectDB from "./v1/config/db.config.js";

await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor local corriendo en
http://localhost:${PORT}`);
});
