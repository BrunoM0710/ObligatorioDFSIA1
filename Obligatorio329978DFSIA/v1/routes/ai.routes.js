import express from "express";
import { ObtenerRespuestaDeIa } from "../controllers/ai.controllers.js";
const router = express.Router();

router.post("/groq", ObtenerRespuestaDeIa);

export default router;
  