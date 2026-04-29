import express from "express";
import {
  obtenerOrdenesUsuario,
  cambioDePlanUsuario,
  eliminarUsuario,
} from "../controllers/usuario.controller.js";

const router = express.Router({ mergeParams: true });

//llego a el enrutador con rutas /usuario

router.get("/:id", async (req, res, next) => {
  try {
    const data = await obtenerOrdenesUsuario(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await eliminarUsuario(req.params.id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const data = await cambioDePlanUsuario(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
