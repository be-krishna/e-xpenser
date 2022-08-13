import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: [24, 'Username cannot be more than 24 characters long.']
  },

  passwordHash: {
    type: String,
    required: true,
  },

  passwordSalt: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
