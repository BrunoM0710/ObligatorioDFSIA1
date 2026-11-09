import orden from "../models/orden.model.js";
import perfume from "../models/perfume.model.js";
import { obtenerPerfumePorIdService } from "./perfumes.services.js";

export const crearOrdenService = async (idUsuario, idPerfumes) => {
  try {
    const ordenCreada = new orden({
      usuario: idUsuario,
      perfume: idPerfumes,
      precio: 0,
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

export const obtenerEstadisticasPerfumesService = async () => {
  const estadisticas = await perfume.aggregate([
    {
      $lookup: {
        from: "ordenes",
        localField: "_id",
        foreignField: "perfume",
        as: "ordenes",
      },
    },
    {
      $project: {
        _id: 0,
        perfumeId: "$_id",
        nombre: 1,
        marca: 1,
        cantidadCompras: { $size: "$ordenes" },
      },
    },
    {
      $sort: {
        cantidadCompras: -1,
        nombre: 1,
      },
    },
  ]);

  return estadisticas;
};
