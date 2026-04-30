import express from "express";
const app = express();
// Middlewares
app.use(express.json());
// Rutas
app.get("/api/hello", (req, res) => {
 res.json({ message: "Hola desde Express con imports " });
});
export default app;
