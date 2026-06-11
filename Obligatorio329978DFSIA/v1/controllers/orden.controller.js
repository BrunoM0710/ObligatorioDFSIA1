import mongoose from "mongoose";
import orden from "../models/orden.model.js";
import {
  obtenerOrdenesPorUsuarioService,
  crearOrdenService,
  eliminarOrdenService,
  obtenerOrdenesPorIdService,
} from "../services/ordenes.services.js";
import { obtenerUsuarioPorIdService } from "../services/usuario.services.js";
import { obtenerPerfumePorIdService } from "../services/perfumes.services.js";
import { obtenerDecantPorIdService } from "../services/decant.services.js";

export const obtenerOrdenesPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;

  const ordenes = await obtenerOrdenesPorUsuarioService(idUsuario);
  if (!ordenes) {
    return res
      .status(404)
      .json({ message: "No se encontraron órdenes para este usuario" });
  }
  res.status(200).json(ordenes);
};

export const crearOrden = async (req, res) => {
  const { idUsuario, idPerfume } = req.body;

  if (!idUsuario || !idPerfume) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  const perfume = await obtenerPerfumePorIdService(idPerfume);
  if (!perfume) {
    return res.status(404).json({ message: "Perfume no encontrado" });
  }

  const usuario = await obtenerUsuarioPorIdService(idUsuario);
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (perfume.stock <= 0) {
    return res.status(400).json({ message: "Perfume sin stock" });
  }

  const nuevaOrden = await crearOrdenService(usuario, perfume);
  usuario.ordenes.push(nuevaOrden._id);
  perfume.stock = perfume.stock - 1;
  await perfume.save();
  await usuario.save();
  await nuevaOrden.save();

  return res.status(201).json(nuevaOrden);
};
export const eliminarOrden = async (req, res) => {
  const { idUsuario, idOrden } = req.params;

  const usuarioEncontrado = await obtenerUsuarioPorIdService(idUsuario);

  if (!usuarioEncontrado) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }

  const ordenEncontrada = await obtenerOrdenesPorIdService(idOrden);

  if (!ordenEncontrada) {
    return res.status(404).json({
      message: "Orden no encontrada",
    });
  }

  await eliminarOrdenService(idOrden, idUsuario);

  return res.status(204).send();
};
export const obtenerOrdenPorId = async (req, res) => {
  const { idOrden } = req.params;
  return obtenerOrdenPorId(idOrden)
};
