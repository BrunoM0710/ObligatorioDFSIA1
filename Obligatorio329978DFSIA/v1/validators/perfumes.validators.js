import Joi from "joi";

export const agregarPerfumeSchema = Joi.object({
  nombre: Joi.string().trim().min(1).max(50).required().messages({
    "string.base": "El nombre del perfume debe ser una cadena de texto",
    "string.empty": "El nombre del perfume no puede estar vacío",
    "string.min":
      "El nombre del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "El nombre del perfume no puede tener más de {#limit} caracteres",
  }),
  marca: Joi.string().trim().min(2).max(30).required().messages({
    "string.base": "La marca del perfume debe ser una cadena de texto",
    "string.empty": "La marca del perfume no puede estar vacía",
    "string.min":
      "La marca del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "La marca del perfume no puede tener más de {#limit} caracteres",
  }),
  tamanio: Joi.number().positive().min(5).max(300).required().messages({
    "number.base": "El tamaño del perfume debe ser un número",
    "number.positive": "El tamaño del perfume debe ser un número positivo",
    "number.min": "El tamaño del perfume debe ser al menos {#limit} ml",
    "number.max": "El tamaño del perfume no puede ser mayor que {#limit} ml",
  }),
  precio: Joi.number().positive().precision(2).required().messages({
    "number.base": "El precio del perfume debe ser un número",
    "number.positive": "El precio del perfume debe ser un número positivo",
    "number.precision":
      "El precio del perfume no puede tener más de {#limit} decimales",
    "any.required": "El precio del perfume es obligatorio",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "El stock del perfume debe ser un número",
    "number.integer": "El stock del perfume debe ser un número entero",
    "number.min": "El stock del perfume no puede ser negativo",
    "any.required": "El stock del perfume es obligatorio",
  }),
  familiaOlfativa: Joi.string().trim().min(3).max(30).required().messages({
    "string.base":
      "La familia olfativa del perfume debe ser una cadena de texto",
    "string.empty": "La familia olfativa del perfume no puede estar vacía",
    "string.min":
      "La familia olfativa del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "La familia olfativa del perfume no puede tener más de {#limit} caracteres",
  }),
  concentracion: Joi.string().trim().min(3).max(20).optional().messages({
    "string.base": "La concentración del perfume debe ser una cadena de texto",
    "string.min":
      "La concentración del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "La concentración del perfume no puede tener más de {#limit} caracteres",
  }),
  duracion: Joi.string().trim().min(2).max(30).optional().messages({  
    "string.base": "La duración del perfume debe ser una cadena de texto",
    "string.min":
      "La duración del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "La duración del perfume no puede tener más de {#limit} caracteres",
  }),
  proyeccion: Joi.string().trim().min(3).max(30).optional().valid("Íntima","Moderada","Bestial").optional().messages({
    "string.base": "La proyección del perfume debe ser una cadena de texto",
    "string.min":
      "La proyección del perfume debe tener al menos {#limit} caracteres",
    "string.max":
      "La proyección del perfume no puede tener más de {#limit} caracteres",
    "any.only": "La proyección del perfume debe ser una de las siguientes: Íntima, Moderada, Bestial",
  }),
});
