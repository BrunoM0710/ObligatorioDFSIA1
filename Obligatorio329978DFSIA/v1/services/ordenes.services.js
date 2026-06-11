import orden from "../models/orden.model.js";
import perfume from "../models/perfume.model.js";
import usuario from "../models/usuario.model.js";
import { obtenerPerfumePorIdService } from "./perfumes.services.js";

export const crearOrdenService = async (usuario, perfume) => {
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

export const obtenerOrdenesPorIdService = async (idOrden) => {
  return await orden.findById(idOrden);
};
export const eliminarOrdenService = async (idOrden, idUsuario) => {
  const ordenEliminada = await orden.findOneAndDelete({
    _id: idOrden,
    usuario: idUsuario,
  });

  if (!ordenEliminada) {
    const error = new Error("Orden no encontrada");
    error.statusCode = 404;
    throw error;
  }

  await usuario.findByIdAndUpdate(idUsuario, {
    $pull: {
      ordenes: idOrden,
    },
  });

  return ordenEliminada;
};
