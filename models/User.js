const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },

  last_name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UsersSchema);
