import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import orden from "./orden.model.js";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: true },
  contrasenia: { type: String, required: true },
  esPremium: { type: Boolean, default: false },
  fechaRegistro: { type: Date, default: Date.now },
  ordenes: [{ type: mongoose.Schema.Types.ObjectId, ref: "orden" }],
  decant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Decant" }],
});

usuarioSchema.pre("save", function () {
  if (!this.isModified("contrasenia")) return;
  this.contrasenia = bcrypt.hashSync(
    this.contrasenia,
    Number(process.env.SALT_ROUNDS),
  );
});



export default mongoose.model("usuario", usuarioSchema);
