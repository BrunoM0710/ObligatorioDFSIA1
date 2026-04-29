import express from "express";
import {
  obtenerDecantUsuario,
  eliminarDecant,
  altaDecant,
} from "../controllers/decant.controller.js";
const router = express.Router({ mergeParams: true });

router.get("/:idUsuario", async (req, res, next) => {
  try {
    const data = await obtenerDecantUsuario(req.params.idUsuario);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:idDecant-:idUsuario", async (req, res, next) => {
  try {
    await eliminarDecant(req.params.idDecant, req.params.idUsuario);
    res.status(200).json({ message: "Decant eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

router.post("/:idUsuario-:idPerfume", async (req, res, next) => {
  try {
    const data = await altaDecant(req.params.idUsuario, req.params.idPerfume);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
