const express = require("express");
const Visit = require("../models/visit.model");
const Patient = require("../models/patient.model");
const verifyToken = require("../middleware/verifyToken");

const patientRouter = express.Router();

module.exports = patientRouter;

patientRouter.get("/", verifyToken, (req, res) => {
  Patient.find({})
    .populate("visits")
    .exec((err, patients) => {
      if (err) {
        res.send("error in req");
      } else {
        res.json(patients);
      }
    });
});

patientRouter.get("/:id", verifyToken, (req, res) => {
  Patient.findOne({ _id: req.params.id })
    .populate("visits")
    .exec((err, patient) => {
      if (err) {
        res.send("error in req");
      } else {
        res.json(patient);
      }
    });
});

patientRouter.post("/", verifyToken, (req, res) => {
  const newPatient = new Patient({
    name: req.body.fullName,
    gender: req.body.genderPicked,
    visits: [],
    dateOfBirth: new Date(req.body.DOB),
    history: req.body.history,
  });

  newPatient.save({ j: true }, (err, saved) => {
    if (err) res.json({ success: false, message: "error in saving" });
    res.json({ success: true, message: "added successfully" });
  });
});

patientRouter.delete("/:id", verifyToken, (req, res) => {
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

patientRouter.patch("/:id", verifyToken, (req, res) => {
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
