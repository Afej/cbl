const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret, jwt_expiry } = require("config");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please add first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please add last name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false,
    },
    account_status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
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

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ user_id: this._id }, jwt_secret, {
    expiresIn: jwt_expiry,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Cascade delete wallet when a user is deleted
UserSchema.pre("remove", async function (next) {
  // console.log(`wallet being removed from user ${this._id}`);
  await this.model("Wallet").deleteOne({ user_id: this._id });
  next();
});

// Reverse populate with virtuals
UserSchema.virtual("wallet", {
  ref: "Wallet",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

UserSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "user_id",
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
