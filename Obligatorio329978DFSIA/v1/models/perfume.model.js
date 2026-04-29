import mongoose from "mongoose";

const perfumeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  tamanio: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  familiaOlfativa: {
    type: String,
    required: true,
  },
  concentracion: {
    type: String,
    required: false,
  },
  duracion: {
    type: String,
    required: false,
  },
  proyeccion: {
    type: String,
    enum: ["Íntima", "Moderada", "Bestial"],
    required: false,
  },
  imagen: {
    type: String,
    required: false,
    default: null,
  },
});

export default mongoose.model("perfume", perfumeSchema, "perfumes");
