import mongoose from "mongoose";
import perfume from "./perfume.model.js";
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
  precio: { type: Number, required: true }, // precio en el momento de compra
  fechaCompra: { type: Date, default: Date.now },
 
});
export default mongoose.model("orden", ordenSchema, "ordenes");
