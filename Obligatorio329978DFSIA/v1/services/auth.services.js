import Usuario from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (usuario) => {
  const passwordHash = bcrypt.hashSync(
    usuario.contrasenia,
    Number(process.env.SALT_ROUNDS),
  );
  const nuevoUsuario = new Usuario({ ...usuario, password: passwordHash });

  await nuevoUsuario.save();
  const token = jwt.sign({ id: nuevoUsuario._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return { usuario: nuevoUsuario, token };
};

export const loginUsuarioService = async (email, contrasenia) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return { message: "Email o contraseña incorrectos" };
  }
  const isMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);
  if (!isMatch) {
    return { message: "Email o contraseña incorrectos" };
  }
  const token = jwt.sign({ id: usuario._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return { usuario, token };
};
