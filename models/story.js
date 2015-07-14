// story.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StorySchema = new Schema({
  district: String,
  story: String
});

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;

// get all stories
app.get('/api/stories', function (req, res) {
  // find all stories in db
  Story.find(function (err, stories) {
    res.json(stories);
  });
});

// create new story
app.post('/api/stories', function (req, res) {
  // create new story with form data (`req.body`)
  var newStory = new Story({
    district: req.body.district,
    story: req.body.story
  });

  // save new story in db
  newStory.save(function (err, savedStory) {
    res.json(savedStory);
  });
});