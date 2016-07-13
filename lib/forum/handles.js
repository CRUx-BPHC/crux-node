module.exports = function getEndPoints(configuration) {
  var mongoose = require("mongoose");
  var Threads = require("./models.js")(configuration.collections).threads;
  var Comments = require("./models.js")(configuration.collections).comments;
  var conf = require("./conf.js");

  function _isThreadDuplicate(post, callback) {
    Threads.count({
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

  function create(post, callback) {
    _isThreadDuplicate(post, function createThreadIfNotDuplicate(err) {
      if (err) {
        return callback(err);
      }
      Threads.create(post, function afterThreadCreate(err, newpost) {
        if (err) {
          return callback(err);
        }
        return callback(null, newpost.id);
      });
    });
  }

  function createComment(comment, threadid, callback) {
    comment.threadid = threadid;
    Comments.create(comment, function afterCommentCreate(err, newcomment) {
      if (err) {
        return callback(err);
      }
      return callback(null, newcomment.id);
    });
  }

  function updateComment(id, changes, callback) {
    Comments.findByIdAndUpdate(id, changes, function (err, comment) {
      if (err) {
        return callback(err);
      }
      return callback(null, comment);
    });
  }

  function getThreadByUrl(url, callback) {
    Threads.findOne({
      url: url
    }, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function getThread(id, callback) {
    Threads.findById(id, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function _paginateThreadsAndReturn(query, callback, start, end) {
    start = start || 1;
    end = end || 10;
    query.
    skip(start - 1).
    limit(end - start + 1).
    sort('created_at').
    exec(function (err, posts) {
      if (err) {
        return callback(err);
      }
      return callback(null, posts);
    });
  }

  function getThreads(callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Threads.find({});
    return _paginateThreadsAndReturn(query, callback, start, end);
  }

  function getThreadsByCategory(maincategory, subcategory, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Threads.find({
      maincategory: category,
      subcategory: subcategory
    });
    return _paginateThreadsAndReturn(query, callback, start, end);
  }

  function getThreadsByAuthor(author, callback, start, end) {
    start = start || 1;
    end = end || 10;
    var query = Threads.find({
      author: author
    });
    return _paginateThreadsAndReturn(query, callback, start, end);
  }

  function deleteThread(id, callback) {
    Threads.findByIdAndRemove(id, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  function updateThread(id, changes, callback) {
    Threads.findByIdAndUpdate(id, changes, function (err, post) {
      if (err) {
        return callback(err);
      }
      return callback(null, post);
    });
  }

  return {
    createThread: createThread,
    createComment: createComment,
    getThreadByUrl: getThreadByUrl,
    getThread: getThread,
    getThreads: getThreads,
    getThreadsByAuthor: getThreadsByAuthor,
    getThreadsByCategory: getThreadsByCategory,
    deleteThread: deleteThread,
    updateThread: updateThread,
    updateComment: updateComment,
  };
};
