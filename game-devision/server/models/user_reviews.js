const mongoose = require('mongoose');

const userReviewsSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  ownerUsername: {
    type: String,
    required: true,
    trim: true
  },
  titlePost: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, { timestamps: true });

const UserReview = mongoose.model('UserReview', userReviewsSchema);

module.exports = { UserReview };