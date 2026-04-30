import express from "express";
import {
  obtenerDecantUsuario,
  eliminarDecant,
  altaDecant,
} from "../controllers/decant.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", obtenerDecantUsuario);  

router.delete("/:idDecant-:idUsuario", eliminarDecant);

router.post("/:idUsuario-:idPerfume", altaDecant);

export default router;
