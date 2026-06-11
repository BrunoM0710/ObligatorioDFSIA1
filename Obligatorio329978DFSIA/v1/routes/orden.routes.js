import express from "express";
import {
  obtenerOrdenesPorUsuario,
  crearOrden,
  eliminarOrden,
  obtenerOrdenPorId,
} from "../controllers/orden.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/usuario/:idUsuario", obtenerOrdenesPorUsuario);
router.get("/:idOrden", obtenerOrdenPorId);
router.post("/", crearOrden);
router.delete("/:idUsuario-:idOrden", eliminarOrden);

export default router;
