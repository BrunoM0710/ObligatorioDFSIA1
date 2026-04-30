import mongoose from "mongoose";
import decant from "../models/decant.model.js";
import usuario from "../models/usuario.model.js";
import perfume from "../models/perfume.model.js";
import { obtenerUsuarioPorIdService } from "../services/usuario.services.js";
import { obtenerPerfumePorIdService } from "../services/perfumes.services.js";
import {
  obtenerDecantUsuarioService,
  eliminarDecantService,
} from "../services/decant.services.js";

export const altaDecant = async (req, res) => {

    const { idUsuario, idPerfume } = req.params;
    const usuario = await obtenerUsuarioPorIdService(idUsuario);
    const perfume = await obtenerPerfumePorIdService(idPerfume);
    const decantUsuario = await obtenerDecantUsuarioService(
      idUsuario,
      idPerfume,
    );

    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }
    if (!perfume) {
      const error = new Error("Perfume no encontrado");
      error.statusCode = 404;
      throw error;
    }

    if (usuario.decant.length >= 4 && !usuario.esPremium) {
      const error = new Error(
        "No puedes agregar más decants, actualiza tu estatus a premium",
      );
      error.statusCode = 403;
      throw error;
    }

    const nuevoDecant = new decant({
      usuario: usuario._id,
      perfume: perfume._id,
    });
    await nuevoDecant.save();
    usuario.decant.push(nuevoDecant._id);
    await usuario.save();
    res.status(201).json(nuevoDecant);

};

export const obtenerDecantUsuario = async (req, res) => {
  try {
    const usuarioEncontrado = await obtenerUsuarioPorIdService(
      req.params.idUsuario,
    );
    if (!usuarioEncontrado) {
      throw new Error("Usuario no encontrado");
    }
    const decantUsuario = await obtenerDecantUsuarioService(
      req.params.idUsuario,
      req.params.idDecant,
    );
    if (!decantUsuario) {
      return res.status(404).json({
        message: "Decant no encontrado para este usuario",
      });
    }
    res.status(200).json(decantUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarDecant = async (req, res) => {
  const { idDecant, idUsuario } = req.params;

  const usuarioEncontrado = await obtenerUsuarioPorIdService(idUsuario);
  if (!usuarioEncontrado) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(idDecant)) {
    const error = new Error("ID de decant no válido");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(idUsuario)) {
    const error = new Error("ID de usuario no válido");
    error.statusCode = 400;
    throw error;
  }

  const decantUsuario = await obtenerDecantUsuarioService(idUsuario, idDecant);

  if (!decantUsuario) {
    const error = new Error("Decant no encontrado para este usuario");
    error.statusCode = 404;
    throw error;
  }

  await eliminarDecantService(idDecant, idUsuario);

  usuarioEncontrado.decant.pull(idDecant);
  await usuarioEncontrado.save();

  return res.status(204).send();
};
