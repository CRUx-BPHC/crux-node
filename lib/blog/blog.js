module.exports = (function () {
  var express = require('express');
  var router = express.Router();
  var handles = require('./handles');

  function _sendResponse(err, data) {
    if (err) {
      return next(err);
    }
    data = data || {};
    res.json(data);
  }

  /* GET users listing. */
  router.get('/posts/id/:id', function (req, res) {
    handles.getPost(req.params.id, _sendResponse);
  });

  router.put('/posts/id/:id', function (req, res) {
    handles.updatePost(req.params.id, req.body, _sendResponse);
  });

  router.delete('/posts/id/:id', function (req, res) {
    handles.deletePost(req.params.id, _sendResponse);
  });

  router.get('/posts/url/:url/get', function (req, res) {
    handles.getPostByUrl(req.params.url, _sendResponse);
  });

  router.post('/posts/create', function (req, res) {
    handles.createPost(req.body, _sendResponse);
  });

  router.post('/pages/', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPosts(_sendResponse, start, end);
  });

  router.post('/pages/author/:author', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPostsByAuthor(req.params.author, _sendResponse, start, end);
  });

  router.post('/pages/category/:category', function (req, res) {
    var start = req.body.start || 1;
    var end = req.body.end || 10;
    handles.getPostsByCategory(req.params.category, _sendResponse, start, end);
  });

  return router;
}());
