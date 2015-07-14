// SERVER-SIDE JAVASCRIPT

// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    _ = require('underscore');

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));


// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// include mongoose
var mongoose = require('mongoose');

// require Post module from other file
var Post = require('./models/post');

// connect a server to database
mongoose.connect('mongodb://localhost/posts');

// STATIC ROUTES

//tell our Express app to server static HTML files
// root route(serves index.html)
app.get('/', function (req, res) {
  res.sendFile(_dirname + '/public/views/index.html');
});

// Data/API routes

// get all posts
app.get('/api/posts', function (req, res) {
  // find all posts in db
  Post.find({}, function (err, allposts) {
    if (err){
      console.log("error: ", err);
      res.status(500).send(err);
    } else {
      // send all posts as JSON response
      res.json(posts);
    }
  });

});

// create new post
app.post('/api/posts', function (req, res) {
  // create new post with form data (`req.body`)
  var newPost = new Post({
    district: req.body.district,
    story: req.body.story
  });

  // save new post in db
  newPost.save(function (err, savedPost) {
    if (err) {
      console.log("error:",err);
      res.status(500).send(err);
    } else {
      // once saved, send the new post as JSON response
      res.json(savedPost);
    }
  });
});

// // grab params (story and district) from form data
//   var newPost = {}
//   newPost.district = req.body.district;
//   newPost.story = req.body.story;
  
//   // set a unique id never used by a post until now
//   totalPostCount++;
//   newPost.id = totalPostCount;

//   // add newPost to `posts` array
//   posts.push(newPost);

// get a single post 
app.get('/api/posts/:id', function(req, res) {

  // take the value of the id from the url parameter
  var targetId = parseInt(req.params.id);

  // find item in `posts` array matching the id
  // var foundPost = _.findWhere(posts, {id: targetId});

  // find item in database matching the id
  Post.findOne({_id: targetId}, function(err, foundPost){
    console.log(foundPost);
    if(err){
      console.log("error: ", err);
      res.status(500).send(err);
    } else {
      // send back post object
      res.json(foundPost);
    }
  });

});

// update single post
app.put('/api/posts/:id', function(req, res) {

  // take the value of the id from the url parameter
  var targetId = parseInt(req.params.id);

  // find item in `posts` array matching the id
  //var foundPost = _.findWhere(posts, {id: targetId});
  Post.findOne({_id: targetId}, function(err, foundPost){
    console.log(foundPost); 

    if(err){
      res.status(500).send(err);

    } else {
      // update the post's district
      foundPost.district = req.body.district;

      // update the post's story
      foundPost.story = req.body.story;

      // save the changes
      foundPost.save(function(err, savedPost){
        if (err){
          res.status(500).send(err);
        } else {
          // send back edited object
          res.json(savedPost);
        }
      });
    }

  });  

});
  // // update the post's story
  // foundPost.story = req.body.story;

  // // update the post's district
  // foundPost.district = req.body.district;

  // // send back edited object
  // res.json(foundPost);


// delete post
app.delete('/api/posts/:id', function(req, res) {
  
// take the value of the id from the url parameter
  var targetId = req.params.id;

 // remove item from the db that matches the id
   Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
    if (err){
      res.status(500).send(err);
    } else {
      // send back deleted post
      res.json(deletedPost);
  });
});

// // take the value of the id from the url parameter
  // var targetId = parseInt(req.params.id);

  // // find item in `posts` array matching the id
  // var foundPost = _.findWhere(posts, {id: targetId});

  // // get the index of the found item
  // var index = posts.indexOf(foundPost);
  
  // // remove the item at that index, only remove 1 item
  // posts.splice(index, 1);
  
  // // send back deleted object
  // res.json(foundPost);
// });

// set server to localhost:3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});