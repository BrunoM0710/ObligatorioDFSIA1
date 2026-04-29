import perfume from "../models/perfume.model.js";

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
    throw new Error(error.message);
  }
};

export const obtenerPerfumePorIdService = async (id) => {
  const perfumeEncontrado = await perfume.findById(id);
  return perfumeEncontrado || null;
};

export const obtenerPerfumesPorProyeccionService = async (page, limit, req) => {
  const proyeccion = req.query.proyeccion;

  if (proyeccion) {
    const campos = proyeccion.split(",").join(" ");

    return await Perfume.find()
      .select(campos)
      .limit(limit)
      .skip((page - 1) * limit);
  }

  return await obtenerPerfumesService(page, limit);
};

export const obtenerPerfumesPorConcentracionService = async (
  page,
  limit,
  req,
) => {
  const concentracion = req.query.concentracion;

  if (concentracion) {
    const campos = concentracion.split(",").join(" ");

    return await Perfume.find()
      .select(campos)
      .limit(limit)
      .skip((page - 1) * limit);
  }

  return await obtenerPerfumesService(page, limit);
};

export const altaPerfumeService = async (data) => {
  return await perfume.create(data);
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
      throw new Error("Perfume no encontrado");
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
      throw new Error("Perfume no encontrado");
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
    throw new Error(error.message);
  }
};
