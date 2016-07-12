module.exports = (function getEndPoints() {
    var mongoose = require("mongoose");
    var Posts = require("./models.js").posts;
  function createPost(post) {
    Posts.findById();
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
