const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  ownerUsername: {
    type: String,
    required: true,
    trim: true
  },
  ownerId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = { Article };