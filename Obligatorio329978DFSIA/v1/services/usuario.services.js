import usuario from "../models/usuario.model.js";

export const eliminarUsuarioService = async (id) => {
  const usuarioEncontrado = await usuario.findById(id);

  if (!usuarioEncontrado) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (
    usuarioEncontrado.ordenes.length > 0 ||
    usuarioEncontrado.decant.length > 0
  ) {
    const error = new Error(
      "No se puede eliminar un usuario con órdenes o decants pendientes"
    );
    error.statusCode = 409;
    throw error;
  }

  const usuarioEliminado = await usuario.findByIdAndDelete(id);
  return usuarioEliminado;
};

export const obtenerUsuariosService = async (req, res) => {
  return await usuario.findById(req.params.id);
};

export const obtenerUsuarioPorEmailService = async (email) => {
  const usuarioEncontrado = await usuario.findOne({ email });
  if (!usuarioEncontrado) {
    return null;
  }
  return usuarioEncontrado;
};

export const  obtenerUsuarioPorIdService = async (id) => {
  const usuarioEncontrado = await usuario
    .findById(id)
    .populate("ordenes")
    .populate("decant");
  if (!usuarioEncontrado) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return usuarioEncontrado || null;
};

export const cambioDePlanUsuarioService = async (id) => {
  const usuarioActualizado = await usuario.findById(id);
  if (!usuarioActualizado) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }
  if (usuarioActualizado.decant.length > 4) {
    const error = new Error("No se puede cambiar el plan si tiene más de 4 decants");
    error.statusCode = 400;
    throw error;
  }
  !usuarioActualizado.esPremium
    ? (usuarioActualizado.esPremium = true)
    : (usuarioActualizado.esPremium = false);
  await usuarioActualizado.save();
  return usuarioActualizado;
};

export const obtenerOrdenesDeUsuarioService = async (id) => {
  const usuarioBuscado = await usuario.findById(id).populate("ordenes");
  if (!usuarioBuscado) {
    return null;
  }
  return usuarioBuscado.ordenes;
};

export const obtenerDecantUsuarioService = async (id) => {
  const usuarioBuscado = await usuario.findById(id).populate("decant");
  if (!usuarioBuscado) {
    return null;
  }
  return usuarioBuscado.decant;
};
