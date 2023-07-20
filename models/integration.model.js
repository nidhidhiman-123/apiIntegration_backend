const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const integrationSchema = new Schema({
    name: { type: String, },
    email: { type: String, },
    phonenumber: { type: String, },
    dob: { type: Date, },
    image: {
        type: String, default: ''
    },

}, { timestamps: true, toJSON: { getters: true } });

module.exports = mongoose.model('Integration', integrationSchema, 'integration')