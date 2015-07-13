// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
    _ = require('underscore');

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));

// configure bodyParser (for handling data)
app.use(bodyParser.urlencoded({extended: true}));

// pre-seeded story data = [
  {id: 1, district: 'Sunset', story: 'farmers market on 40th and Noriega st.'}
];

//STATIC ROUTES


//tell our Express app to server static HTML files
// root (serves index.html)
app.get('/', function (req, res) {
  res.sendFile(_dirname + '/public/views/index.html');
});

// API ROUTES

// stories index
app.get('/api/stories', function (req, res) {
  // send all stories as JSON response
  res.json(stories);
});

// create new story
app.post('/api/stories', function (req, res) {
  // grab params (district and story) from form data
  var newStory = req.body;

  // set sequential id (last id in 'stories' array + 1)
  if (stories.length > 0) {
    newStory.id = stories[stories.length - 1].id + 1;
  } else {
    newStory.id = 0;
  }

  // add newStory to 'stories' array
  stories.push(newStory);

  // send newStory as JSON response
  res.json(newStory);
});

// update story
app.put('/api/stories/:id', function (req, res) {

  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in 'stories' array matching the id
  var foundStory = _.findWhere(stories, {id: targetId});

  // update the district
  foundStory.district = req.body.district;

  // update the story
  foundStory.story = req.body.story;

  // send back edited object
  res.json(foundStory);
});

// delete story
//app.delete('/api/stories/:id', function (req, res) {

  // set the value of the id
  //var targetId = parseInt(req.params.id);

  // find item in 'stories' array matching the id
  //var foundStory = _findWhere(stories, {id: targetId});

  // get the index of the found item
  //var index = stories.indexOf(foundStory);

  // remove the item at the index, only remove 1 item 
  //stories.splice(inex, 1);

  // send back deleted object
  //res.json(foundStory);
//});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});

