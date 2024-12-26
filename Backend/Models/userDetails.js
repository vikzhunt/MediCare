const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  image: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    default: 987654321,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
  specialization: {
    type: String,
    default: '', 
  },
  experience: {
    type: Number,
    default: 0,
  },
  consultationFee: {
    type: Number,
    default: 0,
  },
  availability: {
    type: [String],
    default: [], 
  },
  address: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    min: 0,
    default: 0, 
  },
  gender: {
    type: String,
    default: '',
    enum: ['Male', 'Female', 'Other','Missing Data'],
  },
  bloodGroup: {
    type: String,
    default: '',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'NA'],
  },
}, { collection: 'userDetails'});

module.exports = mongoose.model('UserData', userSchema);
