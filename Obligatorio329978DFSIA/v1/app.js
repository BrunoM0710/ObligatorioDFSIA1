import express from "express";
import router from "./v1.routes.js"; // 👈 IMPORTANTE

const app = express();

app.use(express.json());


app.use("/", router);

export default app;