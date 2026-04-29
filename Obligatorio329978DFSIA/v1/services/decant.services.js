import perfume from "../models/perfume.model.js";
import decant from "../models/decant.model.js";
import usuario from "../models/usuario.model.js";

export const obtenerDecantUsuarioService = async (idUsuario, idDecant) => {
  return await decant.findOne({
    usuario: idUsuario,
    _id: idDecant,
  });
};

export const eliminarDecantService = async (idDecant, idUsuario) => {
  const decantEliminado = await decant.findOneAndDelete({
    _id: idDecant,
    usuario: idUsuario,
  });

  if (!decantEliminado) {
    throw new Error("Decant no encontrado para este usuario");
  }
  await usuario.findByIdAndUpdate(idUsuario, {
    $pull: { decant: idDecant },
  });

  return decantEliminado;
};
