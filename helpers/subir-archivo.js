const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  extensionesValidas = [".png", ".jpg", ".jpeg", ".gif"],
  carpeta = ""
) => {
  return new Promise((res, rej) => {
    const { archivo } = files;

    const extension = path.extname(archivo.name);

    // Validar la extension
    if (!extensionesValidas.includes(extension))
      return rej(
        `La extension ${extension} no es permitida ${extensionesValidas}`
      );

    const nombreTemp = uuidv4() + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) rej(err);
      res(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
