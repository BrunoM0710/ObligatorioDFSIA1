import express from "express";
import router from "./v1.routes.js"; 

const app = express();

app.use(express.json());


app.use("/", router);

export default app;