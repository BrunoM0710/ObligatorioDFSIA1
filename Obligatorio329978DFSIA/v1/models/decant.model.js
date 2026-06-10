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
  },
  perfumeMarca: {
    type: String,
  },
  perfumeImagen: {
    type: String,
  },
  perfumeConcentracion: {
    type: String,
  },
});

const Decant = mongoose.model("Decant", decantSchema);
export default Decant;
