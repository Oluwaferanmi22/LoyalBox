const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['earn', 'redeem'], required: true },
  amount: { type: Number, required: true }, // points earned or spent
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
