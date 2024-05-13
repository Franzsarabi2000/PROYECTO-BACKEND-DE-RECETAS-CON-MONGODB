const express = require("express");
const rutas = express.Router();
const medicoModel = require("../models/Medico.js");

//endpoint bring all the doctors

rutas.get("/traermedicos", async (req, res) => {
  try {
    const medico = await medicoModel.find();
    res.json(medico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//endpoint 2 create
rutas.post("/crear", async (req, res) => {
  const medico = new medicoModel({
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    specialty: req.body.specialty,
  });
  try {
    const nuevoMedico = await medico.save();
    res.status(201).json(nuevoMedico);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//endpoint 3 update
rutas.put("/editar/:id", async (req, res) => {
  try {
    const medicoEditada = await medicoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!medicoEditada)
      return res.status(404).json({ message: "Medico no encontrado!!!" });
    else return res.status(201).json(medicoEditada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//endpoint 4 delete
rutas.delete("/eliminar/:id", async (req, res) => {
  try {
    const medicoEliminado = await medicoModel.findByIdAndDelete(req.params.id);
    if (!medicoEliminado) {
      return res.status(404).json({ message: "Medico no encontrado!!!" });
    } else {
      return res.status(201).json({ message: "medico Eliminado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// endpoint obtener medico por una especialidad especifica
rutas.get("/obtenermedico/:specialty", async (req, res) => {
  try {
    const medicoEs = await medicoModel.find({
      specialty: new RegExp(req.params.specialty, "i"),
    });
    return res.json(medicoEs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  CONTAR CANTIDAD DE MEDICOS
rutas.get("/totalmedicos", async (req, res) => {
  try {
    const total = await medicoModel.countDocuments();
    return res.json({ totalmedicos: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// OBTENER ULTIMOS MEDICOS
rutas.get("/obtenerultimomedico", async (req, res) => {
  try {
    const ultimosmedicos = await medicoModel
      .find()
      .sort({ createdAt: -1 })
      .limit(3);
    return res.json(ultimosmedicos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// buscar por nombre y especialidad
rutas.get("/buscarpornombreyespecialidad", async (req, res) => {
  const { name, specialty } = req.query;
  try {
    const buscarmedico = await medicoModel
      .find({ name: name, specialty: specialty })
      .sort({ createdAt: -1 });
    if (buscarmedico.length === 0) {
      return res.status(404).send("no se encontro");
    }
    return res.json(buscarmedico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//obtener medicos por especialidad orden descendente
rutas.get("/buscarporespecialidad", async (req, res) => {
  const { specialty } = req.query;

  try {
    // Verificar si se proporcionó la especialidad
    if (!specialty) {
      return res.status(400).send("Se requiere proporcionar la especialidad.");
    }

    // Realizar la búsqueda en la base de datos y ordenar en orden descendente por nombre
    const buscarmedico = await medicoModel
      .find({ specialty: specialty })
      .sort({ name: -1 });

    // Verificar si se encontraron médicos
    if (buscarmedico.length === 0) {
      return res
        .status(404)
        .send("No se encontraron médicos con la especialidad especificada.");
    }

    // Devolver los médicos encontrados
    return res.json(buscarmedico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//obtener medicos por especialidad orden ASCENDENTE
rutas.get("/buscarporespecialidadD", async (req, res) => {
  const { specialty } = req.query;

  try {
    // Verificar si se proporcionó la especialidad
    if (!specialty) {
      return res.status(400).send("Se requiere proporcionar la especialidad.");
    }

    // Realizar la búsqueda en la base de datos y ordenar en orden descendente por nombre
    const buscarmedico = await medicoModel
      .find({ specialty: specialty })
      .sort({ name: 1 });

    // Verificar si se encontraron médicos
    if (buscarmedico.length === 0) {
      return res
        .status(404)
        .send("No se encontraron médicos con la especialidad especificada.");
    }

    // Devolver los médicos encontrados
    return res.json(buscarmedico);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = rutas;
