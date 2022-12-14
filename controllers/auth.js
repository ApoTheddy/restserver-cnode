const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - correo" });

    // Verifica si el usuario esta activo
    if (!usuario.estado)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - estado false" });

    // Verificar la contrasenia
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - password" });

    // Generar el JWT
    const token = await generarJWT(usuario.id);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo salio mal" });
  }
};

module.exports = {
  login,
};
