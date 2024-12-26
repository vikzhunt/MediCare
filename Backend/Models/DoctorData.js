const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  img: {
    type: String,
    default: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=600&aut",
  }
}, {collection:'DrData'});

module.exports = mongoose.model('DoctorsData', doctorSchema);
