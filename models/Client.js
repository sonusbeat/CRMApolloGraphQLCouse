const mongoose = require("mongoose");

const ClientsSchema = mongoose.Schema({
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

  company: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: false,
    trim: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User"
  }
});

module.exports = mongoose.model("Client", ClientsSchema);
