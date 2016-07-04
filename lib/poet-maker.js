module.exports = function (poet) {
  poet.addRoute('/poet/posts/:post', function (req, res, next) {
    console.log(req.params.post);
    var post = poet.helpers.getPost(req.params.post);
    //post = poet.helpers.getPostCount();
    console.log(post);
    if (post) {
      // Do some fancy logging here
      //res.render('post', { post: post });
      res.send(post);
    } else {
      res.send(404);
    }
  });

  poet.addRoute('/poet/tags/:tag', function (req, res) {
    var taggedPosts = poet.helpers.postsWithTag(req.params.tag);
    if (taggedPosts.length) {
      res.send(taggedPosts);
    }
  });

  poet.addRoute('/poet/pages/:page', function (req, res) {
    var page = req.params.page,
      lastPost = page * 3;
    res.render('page', {
      posts: poet.helpers.getPosts(lastPost - 3, lastPost),
      page: page
    });
  });

  poet.addRoute('/poet/categories/:category', function (req, res) {
    var categorizedPosts = poet.helpers.postsWithCategory(req.params.category);
    if (categorizedPosts.length) {
      res.render('category', {
        posts: categorizedPosts,
        category: req.params.category
      });
    }
  });

  return poet;
};
