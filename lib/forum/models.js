module.exports = function exportModels(collections) {
  var mongoose = require('mongoose');
  var threads = mongoose.model(collections.threads, new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    author: String,
    gitid: String,
    maincategory: String,
    subcategory: String,
    content: String,
    created_at: Date,
    showcase: {
      type: Number,
      default: 0,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  }));
  var comments = mongoose.model(collections.comments, new mongoose.Schema({
    title: String,
    threadid: String,
    author: String,
    gitid: String,
    content: String,
    created_at: Date,
    updated_at: {
      type: Date,
      default: Date.now,
    }
  }));
  var categories = mongoose.model(collections.categories, new mongoose.Schema({
    title: String,
    description: String,
    subcategories: [{
      title: String,
      description: String
    }],
  }));

  return {
    posts: posts,
    comments: comments,
    categories: categories
  };
};
