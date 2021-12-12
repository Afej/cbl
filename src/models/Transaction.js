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
    action: {
      type: String,
      enum: ["deposit", "withdrawal", "transfer"],
      required: true,
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
