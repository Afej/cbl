const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    wallet_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Wallet",
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "transfer", "reversal"],
      required: true,
    },
    details: {
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      made_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
        required: true,
      },
      description: String,
      success: {
        type: Boolean,
        default: true,
      },
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
// transactionSchema.virtual("user", {
//   ref: "User",
//   localField: "user_id",
//   foreignField: "_id",
//   justOne: true,
// });

module.exports = mongoose.model("Transaction", transactionSchema);
