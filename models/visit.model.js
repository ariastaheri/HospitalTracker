const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const Patient = require("../models/patient.model");

const Schema = mongoose.Schema;

const visitSchema = new Schema({
  dateOfVisit: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  diagnosis: {
    type: String,
  },
  tests: {
    type: String,
  },
  prescription: {
    type: String,
  },
  symptoms: {
    type: String,
    required: true,
  },
});

visitSchema.methods.saveVisit = function (patientId, visit) {
  Patient.findOneAndUpdate(
    { _id: patientId },
    { $push: { visits: visit } },
    { returnOriginal: false },
    function (err, result) {
      if (err) throw err;
    }
  );
};

visitSchema.plugin(mongooseUniqueValidator);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
