import express from "express";
import v1Router from "./v1/v1.routes.js";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errormiddleware } from "./v1/middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {res.send({ message: "Bienvenido a la API de Perfumes" })});    
app.use("/v1", v1Router);
app.use(notFoundMiddleware);
app.use(errormiddleware);

export default app;
