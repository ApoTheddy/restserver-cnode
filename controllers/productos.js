const { Producto } = require("../models");

// obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res) => {
  let { limite = 5, desde = 0 } = req.query;
  let query = { estado: true };

  let [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre"),
  ]);

  res.json({ total, productos });
};

// obtenerProducto - total - populate
const obtenerProducto = async (req, res) => {
  let { id } = req.params;
  let producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json(producto);
};
// actualizarProducto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json(producto);
};

// borrarProducto
const borrarProducto = async (req, res) => {
  let { id } = req.params;

  let productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(productoBorrado);
};

const crearProducto = async (req, res) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res
      .status(400)
      .json({ msg: `El producto ${productoDB.nombre}, ya existe` });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  // Guardar en DB
  await producto.save();

  res.status(201).json(producto);
};

module.exports = {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  actualizarProducto,
  borrarProducto,
};
