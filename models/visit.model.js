const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const visitSchema = new Schema({
    dateOfVisit: {
        type: Date,
        required: true
    },
    diagnosis: {
        type: String
    },
    tests: {
        type: String
    },
    prescription: {
        type: String
    },
    symptoms: {
        type: String,
        required: true
    }
})

visitSchema.plugin(mongooseUniqueValidator);

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
