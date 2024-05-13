//importaciones de libs
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const recetaRutas = require("./rutas/recetaRutas.js");

const medicoRutas = require("./rutas/medicoRutas.js");

//configuraciones de environment

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
//manejo de json
app.use(express.json());

//CONEXION CON MONGODB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("conexion exitosa");
    app.listen(PORT, () => {
      console.log("servidor express corriendo en el puerto : " + PORT);
    });
  })
  .catch((error) => console.error("error de conexion", error));

//utilizar las rutas de recetas
app.use("/recetas", recetaRutas);

// use medical routes
app.use("/medicos", medicoRutas);
