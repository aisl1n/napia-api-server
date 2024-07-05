import mongoose from 'mongoose';

const donationItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  niche: {
    type: String,
    required: true,
  },
  image: {
    data: {
      type: Buffer,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  selected: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Donation = mongoose.model('Donation', donationItemSchema);
