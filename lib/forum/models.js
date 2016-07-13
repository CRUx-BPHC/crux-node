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
    viewer: {
      type: String,
      default: 'markdown',
      enum: ['markdown', 'html', 'ejs', 'pug'],
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
    },
    viewer: {
      type: String,
      default: 'markdown',
      enum: ['markdown', 'html', 'ejs', 'pug'],
    },
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
    threads: threads,
    comments: comments,
    categories: categories
  };
};
