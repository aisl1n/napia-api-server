import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  totalScore: { 
    type: Number,
    default: 0 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
