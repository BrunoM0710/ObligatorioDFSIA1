import express from "express";

import { agregarPerfumeSchema } from "../validators/perfumes.validators.js";
import {
  obtenerPerfumes,
  altaPerfume,
  bajaPerfume,
  obtenerPerfumesPorProyeccion,
  obtenerPerfumesPorConcentracion,
} from "../controllers/perfume.controller.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await obtenerPerfumes();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  async (req, res, next) => {
    try {
      await agregarPerfumeSchema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  altaPerfume
);

router.delete("/:id", async (req, res, next) => {
  try {
    await bajaPerfume(req.params.id);
    res.status(200).json({ message: "Perfume eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

router.get("/proyeccion/:proyeccion", async (req, res, next) => {
  try {
    const data = await obtenerPerfumesPorProyeccion(req.params.proyeccion);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.get("/concentracion/:concentracion", async (req, res, next) => {
  try {
    const data = await obtenerPerfumesPorConcentracion(
      req.params.concentracion,
    );
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
