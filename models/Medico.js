const mongoose = require("mongoose");
//define the scheme

const medicoSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  phone: Number,
  specialty: String,
});

const MedicoModel = mongoose.model("Medico", medicoSchema, "medico");
module.exports = MedicoModel;
