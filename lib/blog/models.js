module.exports = (function exportModels() {
  var mongoose = require('mongoose');
  var posts = mongoose.model('posts', new mongoose.Schema({
    title: String,
    description: String,
    usr: String,
    author: String,
    created_at: Date,
    updated_at: {
      type: Date,
      default: Date.now,
    },
    activity: {
      type: Array,
      default: [],
    }
  }));
  return {
    posts: posts,

  };
})();
