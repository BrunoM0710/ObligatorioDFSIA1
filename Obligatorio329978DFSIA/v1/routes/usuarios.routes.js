import express from "express";
import {
  obtenerOrdenesUsuario,
  cambioDePlanUsuario,
  eliminarUsuario,
  obtenerDecantUsuario,
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/:id", obtenerOrdenesUsuario);

router.delete("/:id", eliminarUsuario);

router.patch("/:id", cambioDePlanUsuario);
router.get("/:id/decant", obtenerDecantUsuario);

export default router;
