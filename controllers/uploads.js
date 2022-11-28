const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)
    return res.status(400).json({ msg: "No hay archivos que subir" });

  // Imgs
  try {
    const nombre = await subirArchivo(req.files, undefined, "images");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

module.exports = {
  cargarArchivo,
};
