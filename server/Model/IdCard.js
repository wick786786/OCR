const mongoose = require("mongoose");

const IdCardSchema = new mongoose.Schema({
  identificationNo: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
  errorMsg: {
    type: String,
  },
});

const IdCard = mongoose.model("IdCard", IdCardSchema);

module.exports = IdCard;
