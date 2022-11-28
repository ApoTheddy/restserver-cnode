const { Schema, model } = require("mongoose");

const ProductoSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    precio: { type: Number, default: 0 },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
  },
  { versionKey: false }
);

ProductoSchema.methods.toJSON = function () {
  let { estado, __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", ProductoSchema);
