const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  history: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  visits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Visit",
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
