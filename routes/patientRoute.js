const express = require("express");
const Visit = require("../models/visit.model");
const Patient = require("../models/patient.model");

const patientRouter = express.Router();

module.exports = patientRouter;

patientRouter.get("/", (req, res) => {
  Patient.find({}, (err, patients) => {
    if (err) {
      res.send("error in req");
    } else {
      res.json(patients);
    }
  });
});

patientRouter.get("/:id", (req, res) => {
  Patient.findOne({ _id: req.params.id }, (err, patient) => {
    if (err) {
      res.send("error in req");
    } else {
      res.json(patient);
    }
  });
});

patientRouter.post("/", (req, res) => {
  const newPatient = new Patient({
    name: req.body.name,
    gender: req.body.gender,
    visits: [],
    dateOfBirth: req.body.dateOfBirth,
    history: req.body.history,
  });

  newPatient.save({ j: true }, (err, saved) => {
    if (err) res.send("error in saving");
    res.send("added successfully");
  });
});

patientRouter.delete("/:id", (req, res) => {
  Patient.remove({ _id: req.params.id }, (err) => {
    if (err)
      res.json({
        error: err,
      });
    return res.json({
      message: "deleted successfully",
    });
  });
});

patientRouter.patch("/:id", (req, res) => {
  const patientId = req.params.id;
  Patient.findByIdAndUpdate(patientId, { $set: req.body }, (err, doc) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.json(doc);
  });
});
