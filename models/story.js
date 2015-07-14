// story.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  district: String,
  story: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;

