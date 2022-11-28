const { Usuario, Categoria } = require("../models");
const Role = require("../models/role");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail)
    throw new Error(`El correo '${correo}', ya se encuentra en uso`);
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) throw new Error(`El ID '${id}', no existe`);
};

const existeCategoriaPorId = async (id) => {
  // Verificar si el correo existe
  const categoria = await Categoria.findById(id);

  if (!categoria) throw new Error(`La categoria no existe`);
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
};
