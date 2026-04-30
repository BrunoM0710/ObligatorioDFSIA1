import perfume from "../models/perfume.model.js";
import { obtenerImagenPerfume } from "../services/unsplash.service.js";

export const obtenerPerfumesService = async (page, limit) => {
  limit = Number(limit) || 12; // Valor predeterminado de 12 si no se proporciona
  page = Number(page) || 1; // Valor predeterminado de 1 si no se proporciona
  const skip = (page - 1) * limit; // Calcular el número de documentos a omitir
  const cantidadPerfumes = await perfume.countDocuments(); // Contar el total de perfumes en la base de datos
  const totalPages = Math.ceil(cantidadPerfumes / limit); // Calcular el total de páginas
  try {
    const perfumes = await perfume.find().limit(limit).skip(skip);
    return { perfumes, page, limit, totalPages };
  } catch (error) {
    const errorNuevo = new Error(error.message);
    errorNuevo.statusCode = 500;
    throw errorNuevo;
  }
};

export const obtenerPerfumePorIdService = async (id) => {
  const perfumeEncontrado = await perfume.findById(id);
  return perfumeEncontrado || null;
};

export const obtenerPerfumesPorProyeccionService = async (
  proyeccion,
  page,
  limit,
) => {
  limit = Number(limit);
  page = Number(page);

  const skip = (page - 1) * limit;

  const filtro = {
    proyeccion: { $regex: `^${proyeccion}$`, $options: "i" },
  };

  const cantidadPerfumes = await perfume.countDocuments(filtro);

  const totalPages = Math.ceil(cantidadPerfumes / limit);

  const perfumes = await perfume.find(filtro).limit(limit).skip(skip);

  return { perfumes, page, limit, totalPages };
};

export const obtenerPerfumesPorConcentracionService = async (
  concentracion,
  page,
  limit,
) => {
  limit = Number(limit);
  page = Number(page);

  const skip = (page - 1) * limit;

  const filtro = {
    concentracion: { $regex: `^${concentracion}$`, $options: "i" },
  };

  const cantidadPerfumes = await perfume.countDocuments(filtro);

  const totalPages = Math.ceil(cantidadPerfumes / limit);

  const perfumes = await perfume.find(filtro).limit(limit).skip(skip);

  return { perfumes, page, limit, totalPages };
};

export const altaPerfumeService = async (data) => {
  const existente = await encontrarPorMarcaYNombreService(
    data.nombre,
    data.marca,
  );

  if (existente) {
    const error = new Error("Ya existe un perfume con esa marca y nombre");
    error.statusCode = 409;
    throw error;
  }

  const imagen = data.imagen
    ? data.imagen
    : await obtenerImagenPerfume(data.nombre, data.marca);

  return await perfume.create({ ...data, imagen });
};

export const actualizarPerfumeService = async (
  idPerfume,
  datosActualizados,
) => {
  try {
    const perfumeActualizado = await perfume.findByIdAndUpdate(
      idPerfume,
      datosActualizados,
      { new: true },
    );
    if (!perfumeActualizado) {
      const error = new Error("Perfume no encontrado");
      error.statusCode = 404;
      throw error;
    }
    return perfumeActualizado;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const eliminarPerfumeService = async (idPerfume) => {
  try {
    const perfumeEliminado = await perfume.findByIdAndDelete(idPerfume);
    if (!perfumeEliminado) {
      const error = new Error("Perfume no encontrado");
      error.statusCode = 404;
      throw error;
    }
    return { message: "Perfume eliminado" };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const encontrarPorMarcaYNombreService = async (nombre, marca) => {
  try {
    const perfumeEncontrado = await perfume.findOne({ nombre, marca });
    return perfumeEncontrado || null;
  } catch (error) {
    const errorNuevo = new Error(error.message);
    errorNuevo.statusCode = 500;
    throw errorNuevo;
  }
};
