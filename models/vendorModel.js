// models/vendorModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'vendor',
  },
  certificates: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    certificateName: {
      type: String,
    },
  }],
});


const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
