import orden from "../models/orden.model.js";
import perfume from "../models/perfume.model.js";
import { obtenerPerfumePorIdService } from "./perfumes.services.js";

export const crearOrdenService = async (idUsuario, perfume) => {
  try {
    const ordenCreada = new orden({
      usuario: usuario._id,

      perfume: perfume._id,

      precio: perfume.precio,

      perfumeNombre: perfume.nombre,

      perfumeMarca: perfume.marca,

      perfumeImagen: perfume.imagen,

      perfumeConcentracion: perfume.concentracion,
    });
    await ordenCreada.save();
    return ordenCreada;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerOrdenesPorUsuarioService = async (idUsuario) => {
  try {
    const ordenesUsuario = await orden.find({ usuario: idUsuario });
    return ordenesUsuario;
  } catch (error) {
    throw new Error(error.message);
  }
};
