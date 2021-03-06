const express = require("express");
const Visit = require("../models/visit.model");
const Patient = require("../models/patient.model");
const mongoose = require("mongoose");
const verifyToken = require("../middleware/verifyToken");

const visitRouter = express.Router();

const MESSAGE_UNAUTHORIZED = "Unauthorized request";

module.exports = visitRouter;

visitRouter.get("/", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
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

visitRouter.get("/:id", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
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

visitRouter.delete("/:id", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
  const fullId = req.params.id;
  const visitId = fullId.split("|")[0];
  const patientId = fullId.split("|")[1];

  Patient.findByIdAndUpdate(patientId, { $pull: { visits: visitId } })
    .exec()
    .then(() => {})
    .catch(() => {
      return res.status(500).json({
        message: "Something went wrong in patient's visit removal",
        success: false,
      });
    });

  Visit.findByIdAndRemove(visitId)
    .exec()
    .then(() => {
      res.json({
        success: true,
        message: "Visit removed successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
        success: false,
      });
    });
});

visitRouter.post("/", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
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

visitRouter.post("/:id", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
  const patientId = req.params.id;
  const newVisit = new Visit({
    _id: new mongoose.Types.ObjectId(),
    dateOfVisit: req.body.dateOfVisit,
    diagnosis: req.body.diagnosis,
    tests: req.body.tests,
    symptoms: req.body.symptoms,
    prescription: req.body.prescription,
  });

  newVisit.saveVisit(patientId, newVisit);
  newVisit.save((err, saved) => {
    if (err) {
      res.json({ message: "error in saving", success: false });
    } else {
      res.json({ message: "added successfully", success: true, doc: saved });
    }
  });
});

visitRouter.patch("/:id", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
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

visitRouter.put("/:id", verifyToken, (req, res) => {
  if (!req.authorized) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
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
