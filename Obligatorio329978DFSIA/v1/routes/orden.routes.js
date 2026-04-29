import express from "express";
import {
  obtenerOrdenesPorUsuario,
  crearOrden,
} from "../controllers/orden.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", obtenerOrdenesPorUsuario);

router.post("/", crearOrden);

export default router;
