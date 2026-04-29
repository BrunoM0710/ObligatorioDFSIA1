import express from "express";

import { agregarPerfumeSchema } from "../validators/perfumes.validators.js";
import {
  obtenerPerfumes,
  altaPerfume,
  bajaPerfume,
  obtenerPerfumesPorProyeccion,
  obtenerPerfumesPorConcentracion,
} from "../controllers/perfume.controller.js";
import { validateBodyMiddleware } from "../middlewares/validatebody.middleware.js";

const router = express.Router();

router.get("/", obtenerPerfumes);

router.get("/concentracion/:concentracion", obtenerPerfumesPorConcentracion);

router.get("/proyeccion/:proyeccion", obtenerPerfumesPorProyeccion);

router.post("/", validateBodyMiddleware(agregarPerfumeSchema), altaPerfume);

router.delete("/:id", bajaPerfume);

export default router; 
