const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token)
    return res.status(401).json({ msg: "No hay token en la peticion" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer el usuario que corresponde al uid
    const usuario = await Usuario.findOne({ _id: uid });

    if (!usuario)
      return res
        .status(401)
        .json({ msg: "Token no valido - usuario no existente en BD" });

    // Verificar si el uid tiene estado en true
    if (!usuario.estado)
      return res
        .status(401)
        .json({ msg: "Token no valido - usuario con estado false" });

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
