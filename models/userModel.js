const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: String,
      default: 'data_not_available',
    },
    blog: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    gists_url: {
      type: String,
      default: null,
    },
    repos_url: {
      type: String,
      default: null,
    },
    followers: {
      type: Number,
    },
    following: {
      type: Number,
    },
    mutuals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
