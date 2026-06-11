import express from "express";
import {
  obtenerOrdenesPorUsuario,
  crearOrden,
  eliminarOrden,
} from "../controllers/orden.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", obtenerOrdenesPorUsuario);

router.post("/", crearOrden);
router.delete("/ordenes/:idUsuario-:idOrden", eliminarOrden);

export default router;
