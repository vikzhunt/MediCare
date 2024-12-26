const mongoose = require('mongoose');

const RazorpaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
    unique: true, 
  },
  paymentId: {
    type: String,
    required: true,
    unique: true, 
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpaySignature: {
    type: String,
    required: true, 
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  receipt: {
    type: String,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const RazorpayTransaction = mongoose.model('RazorpayTransaction', RazorpaySchema);

module.exports = RazorpayTransaction;
