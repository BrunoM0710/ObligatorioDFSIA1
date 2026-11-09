import express from "express";
import router from "./v1.routes.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://frontend-final-phi-rose.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", router);

export default app;
