const mongoose = require('mongoose');
const Wallet = require('domain/entities/Wallet');

const walletSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual field "user" to automatically retrieve the user
walletSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'wallet_id',
  justOne: false,
});

walletSchema.loadClass(Wallet);

module.exports = mongoose.model('Wallet', walletSchema);
