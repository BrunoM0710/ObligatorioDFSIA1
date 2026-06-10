import mongoose from "mongoose";

const ordenSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario",
    required: true,
  },

  perfume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "perfume",
    required: true,
  },

  precio: {
    type: Number,
    required: true,
  },

  perfumeNombre: {
    type: String,
    required: true,
  },

  perfumeMarca: {
    type: String,
    required: true,
  },

  perfumeImagen: {
    type: String,
    default: null,
  },

  perfumeConcentracion: {
    type: String,
    default: null,
  },

  fechaCompra: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("orden", ordenSchema, "ordenes");
