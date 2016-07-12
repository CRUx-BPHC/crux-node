module.exports = (function getEndPoints() {
  var mongoose = require("mongoose");
  var Posts = require("./models.js").posts;

  function _isPostDuplicate(post, callback) {
    Posts.count({
      url: post.url
    }, function isDuplicate(err, count) {
      if (err) {
        return callback(err);
      }
      if (count > 0) {
        return callback(new Error('Duplicate URL'));
      }
      callback(null);
    });
  }

  function createPost(post, callback) {
    _isPostDuplicate(post, function createPostIfNotDuplicate(err) {
      if (err) {
        return callback(err);
      }
      Posts.create(post, function afterPostCreate(err, newpost) {
        if (err) {
          return callback(err);
        }
        return callback(null, newpost.id);
      });
    });
  }

  function getPostByUrl(url, callback) {
    Posts.findOne({
      url: url
    }, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function getPost(id, callback) {
    Posts.findById(id, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function getPostsByIndex() {

  }

  function getPostsByCategory() {

  }

  function getPostsByAuthor() {

  }

  function deletePost() {

  }

  function updatePost() {

  }
  return {
    createPost: createPost,
    getPostByUrl: getPostByUrl,
    getPost: getPost,
    getPostsByIndex: getPostsByIndex,
    getPostsByAuthor: getPostsByAuthor,
    getPostsByCategory: getPostsByCategory,
    deletePost: deletePost,
    updatePost: updatePost,
  };
}());
