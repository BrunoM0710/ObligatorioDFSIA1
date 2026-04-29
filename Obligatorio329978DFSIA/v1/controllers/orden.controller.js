import mongoose from "mongoose";
import orden from "../models/orden.model.js";
import {
  obtenerOrdenesPorUsuarioService,
  crearOrdenService,
} from "../services/ordenes.services.js";
import { obtenerUsuarioPorIdService } from "../services/usuario.services.js";
import { obtenerPerfumePorIdService } from "../services/perfumes.services.js";

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

  const nuevaOrden = await crearOrdenService(idUsuario, idPerfume);

  nuevaOrden.precio = perfume.precio;
  perfume.stock -= 1;
  await perfume.save();
  await nuevaOrden.save();

  usuario.ordenes.push(nuevaOrden._id);
  await usuario.save();

  return res.status(201).json(nuevaOrden);
};
