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
        return callback(null,newpost.id);
      });
    });
  }

  function getPostByUrl() {

  }

  function getPost() {

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
