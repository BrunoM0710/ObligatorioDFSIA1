import {
  registrarUsuarioService,
  loginUsuarioService,
} from "../services/auth.services.js";

import { obtenerUsuarioPorEmailService } from "../services/usuario.services.js";

export const registrarUsuario = async (req, res) => {
  const { email } = req.body;

  const usuarioExistente = await obtenerUsuarioPorEmailService(email);
  if (usuarioExistente) {
    return res.status(400).json({ message: "El email ya está registrado" });
  }
  const { usuario, token } = await registrarUsuarioService(req.body);
  res.json({
    message: `Usuario registrado exitosamente`,
    usuario,
    token,
  });
};

export const loginUsuario = async (req, res) => {
  const { email, contrasenia } = req.body;
  const { usuario, token, message } = await loginUsuarioService(
    email,
    contrasenia,
  );
  if (message) return res.status(400).json({ message });
  res.json({ message: "Usuario logueado", usuario, token });
};
