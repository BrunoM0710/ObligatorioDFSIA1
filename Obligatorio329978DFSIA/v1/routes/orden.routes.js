import express from "express";
import {
  obtenerOrdenesPorUsuario,
  crearOrden,
} from "../controllers/orden.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", async (req, res, next) => {
  try {
    const data = await obtenerOrdenesPorUsuario(req.params.idUsuario);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await crearOrden(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
