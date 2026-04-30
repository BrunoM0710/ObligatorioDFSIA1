import mongoose from "mongoose";
import usuario from "../models/usuario.model.js";
import {
  obtenerUsuariosService,
  eliminarUsuarioService,
  cambioDePlanUsuarioService,
  obtenerOrdenesDeUsuarioService,
} from "../services/usuario.services.js";

export const obtenerOrdenesUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const ordenes = await obtenerOrdenesDeUsuarioService(id);
    if (!ordenes) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await eliminarUsuarioService(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const obtenerDecantUsuario = async (req, res) => {
  const { id } = req.params;

  const decant = await obtenerDecantUsuarioService(id);
  if (!decant) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json(decant);
};

export const cambioDePlanUsuario = async (req, res) => {
  const { id } = req.params;
 
  const cambioPlan = await cambioDePlanUsuarioService(id);
  res.status(204).send();
};
