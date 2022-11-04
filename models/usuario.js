const { model, Schema } = require("mongoose");

//"required: [true,"Mensaje de error, por si no se ah enviado"]"

const UsuarioSchema = Schema(
  {
    nombre: { type: String, required: [true, "El nombre es obligatorio"] },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contrasenia es obligatoria"],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      // enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
