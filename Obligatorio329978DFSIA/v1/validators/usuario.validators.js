import Joi from "joi";

export const agregarUsuarioSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "El nombre debe ser una cadena de texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.min": "El nombre debe tener al menos {#limit} caracteres",
    "string.max": "El nombre no puede tener más de {#limit} caracteres",
    "any.required": "El nombre es obligatorio",
  }),
  apellido: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "El apellido debe ser una cadena de texto",
    "string.empty": "El apellido no puede estar vacío",
    "string.min": "El apellido debe tener al menos {#limit} caracteres",
    "string.max": "El apellido no puede tener más de {#limit} caracteres",
    "any.required": "El apellido es obligatorio",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "El email debe ser una cadena de texto",
    "string.empty": "El email no puede estar vacío",
    "string.email": "El email debe ser un email válido",
    "any.required": "El email es obligatorio",
  }),
  edad: Joi.number().integer().positive().min(14).max(100).required().messages({
    "number.base": "La edad debe ser un número",
    "number.empty": "La edad no puede estar vacía",
    "number.integer": "La edad debe ser un número entero",
    "number.positive": "La edad debe ser un número positivo",
    "number.min": "La edad debe ser al menos {#limit}",
    "number.max": "La edad no puede ser mayor que {#limit}",
    "any.required": "La edad es obligatoria",
  }),
  contrasenia: Joi.string()
    .min(6)
    .trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.base": "La contraseña debe ser una cadena de texto",
      "string.empty": "La contraseña no puede estar vacía",
      "string.min": "La contraseña debe tener al menos {#limit} caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un dígito",
      "any.required": "La contraseña es obligatoria",
    }),
  repetirConrasenia: Joi.string()
    .valid(Joi.ref("contrasenia"))
    .required()
    .messages({
      "any.only": "Las contraseñas deben coincidir",
      "string.empty": "Repetir contraseña no puede estar vacío",
      "any.required": "Repetir contraseña es obligatorio",
    }),
    aceptarTerminos: Joi.boolean().valid(true).required().messages({
    "boolean.base": "Aceptar términos debe ser un valor booleano",
    "any.only": "Debe aceptar los términos y condiciones",
    "any.required": "Aceptar términos es obligatorio",
  }),
  
});
