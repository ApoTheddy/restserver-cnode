const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/configs.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Lectura y parseo del body
    this.app.use(express.json());

    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Directorio Publico
    this.app.use(express.static("public"));

    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server in port ${this.port}`);
    });
  }
}

module.exports = Server;
