import mongoose from "mongoose";
import usuario from "./usuario.model.js";

const decantSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  perfume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Perfume",
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
    required: true,
  },
  perfumeConcentracion: {
    type: String,
    required: true,
  },
});

const Decant = mongoose.model("Decant", decantSchema);
export default Decant;
