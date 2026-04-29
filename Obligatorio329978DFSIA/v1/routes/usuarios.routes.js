import express from "express";
import {
  obtenerOrdenesUsuario,
  cambioDePlanUsuario,
  eliminarUsuario,
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/:id", obtenerOrdenesUsuario);

router.delete("/:id", eliminarUsuario);

router.patch("/:id", cambioDePlanUsuario);

export default router;
