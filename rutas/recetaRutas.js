const express = require("express");
const rutas = express.Router();
const RecetaModel = require("../models/Receta.js");

//endpoint traer todas las recetas

rutas.get("/traerecetas", async (req, res) => {
  try {
    const receta = await RecetaModel.find();
    res.json(receta);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});
//endpoint 2 create
rutas.post("/crear", async (req, res) => {
  const receta = new RecetaModel({
    nombre: req.body.nombre,
    ingredientes: req.body.ingredientes,
    porciones: req.body.porciones,
  });
  try {
    const nuevaReceta = await receta.save();
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//endpoint 3 update
rutas.put("/editar/:id", async (req, res) => {
  try {
    const recetaEditada = await RecetaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recetaEditada)
      return res.status(404).json({ message: "Receta no encontrada!!!" });
    else return res.status(201).json(recetaEditada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//endpoint 4 delete
rutas.delete("/eliminar/:id", async (req, res) => {
  try {
    const recetaEliminada = await RecetaModel.findByIdAndDelete(req.params.id);
    if (!recetaEliminada) {
      return res.status(404).json({ message: "Receta no encontrada!!!" });
    } else {
      return res.status(201).json({ message: "Receta Eliminada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// obtener una receta por su ID
rutas.get("/receta/:id", async (req, res) => {
  try {
    const receta = await RecetaModel.findById(req.params.id);
    if (!receta)
      return res.status(404).json({ message: "Receta no encontrada!!!" });
    else return res.json(receta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//obtener  recetas por un ingrediente especifico
rutas.get("/recetaPorIngrediente/:ingrediente", async (req, res) => {
  try {
    const recetaIngrediente = await RecetaModel.find({
      ingredientes: req.params.ingrediente,
    });
    return res.json(recetaIngrediente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//ELIMINAR TODAS LAS RECETAS
rutas.delete("/eliminarTodos", async (req, res) => {
  try {
    await RecetaModel.deleteMany({});
    return res.json({ mensaje: "Todas las recetas han sido eliminadas" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//  CONTAR EL NUMERO TOTAL DE RECETAS
rutas.get("/totalrecetas", async (req, res) => {
  try {
    const total = await RecetaModel.countDocuments();
    return res.json({ totalreceta: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//obtener  recetas ordenadas por nombre ascendente
rutas.get("/ordenarRecetas", async (req, res) => {
  try {
    const recetaOrdenadas = await RecetaModel.find().sort({ nombre: 1 });
    res.status(200).json(recetaOrdenadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// OBTENER RECETA POR CANTIDAD DE PORCIONES
rutas.get("/recetaPorCantidad/:cantidad", async (req, res) => {
  try {
    const recetas = await RecetaModel.find({ porciones: req.params.cantidad });
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
