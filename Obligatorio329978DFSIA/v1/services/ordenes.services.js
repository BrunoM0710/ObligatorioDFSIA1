import orden from "../models/orden.model.js";
import perfume from "../models/perfume.model.js";
import usuario from "../models/perfume.usuario.js";
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
  const ordenEncontrada = await orden.find({ orden: idOrden });

  if (!ordenEncontrada) {
    throw new Error(error.message);
  }
  return ordenEncontrada;
};
export const eliminarOrdenService = async (usuario, orden) => {
  const usuarioBuscado = await usuario.find({ usuario: usuario.idUsuario });
  if (!usuarioBuscado) {
    throw new Error(error.message);
  }
  const ordenEliminada = await orden.findOneAndDelete({
    usuario: usuarioBuscado.idOrden,
  });

  if (!ordenEliminada) {
    const error = new Error("Orden no encontrada");
    error.statusCode = 404;
    throw error;
  }

  await usuarioBuscado.findByIdAndUpdate(usuario.idUsuario, {
    $pull: { orden: orden.idOrden },
  });
  return decantEliminado;
};
