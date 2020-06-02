const express = require("express");
const Visit = require("../models/visit.model");
const Patient = require("../models/patient.model");
const mongoose = require("mongoose");

const visitRouter = express.Router();

module.exports = visitRouter;

visitRouter.get("/", (req, res) => {
  Visit.find()
    .exec()
    .then((visits) => {
      res.json(visits);
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

visitRouter.get("/:id", (req, res) => {
  const visitId = req.params.id;
  Visit.findById(visitId)
    .exec()
    .then((visit) => {
      res.json(visit);
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

visitRouter.delete("/:id", (req, res) => {
  const visitId = req.params.id;
  Visit.findByIdAndRemove(visitId)
    .exec()
    .then(() => {
      res.json("done");
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
});

visitRouter.post("/", (req, res) => {
  const newVisit = new Visit({
    dateOfVisit: req.body.dateOfVisit,
    diagnosis: req.body.diagnosis,
    tests: req.body.tests,
    symptoms: req.body.symptoms,
    prescription: req.body.prescription,
  });

  newVisit.save((err, saved) => {
    if (err) {
      res.send("error in saving");
    } else {
      res.send("added successfully");
    }
  });
});

visitRouter.post("/:id", (req, res) => {
  const patientId = req.params.id;
  const newVisit = new Visit({
    _id: new mongoose.Types.ObjectId(),
    dateOfVisit: req.body.dateOfVisit,
    diagnosis: req.body.diagnosis,
    tests: req.body.tests,
    symptoms: req.body.symptoms,
    prescription: req.body.prescription,
  });

  Visit.saveVisit(patientId, newVisit);
  newVisit.save((err, saved) => {
    if (err) {
      res.send("error in saving");
    } else {
      res.send("added successfully");
    }
  });
});

visitRouter.patch("/:id", (req, res) => {
  const visitId = req.params.id;
  Visit.findByIdAndUpdate(visitId, { $set: req.body }, (err, doc) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    res.json(doc);
  });
});
