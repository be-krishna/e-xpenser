import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be more than 40 chars']
  },

  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot be more than 200 chars']
  },

  type: {
    type: String,
    required: [true, 'Please add type'],
  },

  amount: {
    type: Number,
    required: [true, 'Please add amount'],
  },

  category: {
    type: String,
    required: [true, 'Please add category']
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true })

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)
