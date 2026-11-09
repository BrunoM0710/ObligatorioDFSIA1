import express from "express";
import {
  obtenerOrdenesPorUsuario,
  crearOrden,
  obtenerEstadisticasPerfumes,
} from "../controllers/orden.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", obtenerOrdenesPorUsuario);

router.get("/estadisticas/perfumes", obtenerEstadisticasPerfumes);

router.post("/", crearOrden);

export default router;
