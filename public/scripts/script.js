// CLIENT-SIDE JAVASCRIPT

$(function() {

  // 'storiesController' holds all our story functionality
  var storiesController = {

    //compile story template
    template:_.template($('#story-template').html()),

    // pass each story object through template and append to view
    render: function(storyObj) {
       var $storyHtml = $(storiesController.template(storyObj));
            $('#story-list').append($storyHtml);
    }

    all: function() {
      // send GET request to server to get all stories
      $.get('/api/stories', function(data) {
        var allStories = data;

        //iterate through each story
        _.each(allStories, function(story){
          storiesController.render(story);
          });

        //add event-handlers for updating/deleting
        storiesController.addEventHandlers();
      });
    },

    create: function(newDistrict, newStory) {
      var storyData = {district: newDistrict, story: newStory};

      // send POST request to server to create new story
      $.post('api/stories', storyData, function(data) {
        var newStory = data;
        storiesController.render(newStory);
      });
    },

    update: function(storyId, updatedDistrict, updatedStory) {
      // send PUT request to server to update story
      $.ajax({
        type: 'PUT',
        url: '/api/stories/' + storyId,
        data: {
          district: updatedDistrict,
          Story: updatedStory
        },
        success: function(data) {
          var updatedStory = data;
        }
      });
    },

    //delete: function(storyId) {
      //send DELETE request to server to delete story
      //$.ajax({
        //type: 'DELETE',
        //url: '/api/stories' + storyId,
        //success: function(data) {

          //remove deleted story from view
          //$('#story-' + storyId).remove();
        }
      })
    }
  
    // add event-handlers to stories for updating/deleting
    addEventHandlers: function() {
      $('#story-list')

      // for update: submit event on '.update-story' form
      .on('submit', '.update-story', function(event) {
        event.preventDefault();

        //find the story's id (stoed in HTML as 'data-id')
        var storyId = $(this).closest('.story').attr('data-id');

        //update the stories with form data
        var updatedDistrict = $(this).find('.updated-district').val();
        var updatedStory = $(this).find('.updated-story').val();
        storiesController.update(storyId,updatedDistrict, updatedStory);
      })

      // for delete: click event on '.delete-story' button
      //.on('click', '.delete-story', function(event) {
        //event.preventDefault();

        // find the story's id
        //var storyId = $(this).closest('.story').attr('data-id');

        // delete the story
        //storiesController.delete(storyId);
      });
    },

    setupView: function() {
      //append existing stories to view
      storiesController.all();

      // add event-handler to new-story form
      $('#new-story').on('submit', function(event) {
        event.preventDefault();

        // create new story with form data
        var newDistrict = $('#new-district').val();
        var newDefinition = $('#new-story').val();
        storiesController.create(newDistrict, newStory);

        // reset the form 
        //$(this) [0].reset();
        //$('#new-word').focus();
      });
    }
  };

  storiesController.setupView();
  
 });




 //var $saveStory = $("#saveStory");
  //console.log($saveStory);

  //$saveStory.on('click', function(event) {
   // event.preventDefault();
   // console.log("submitted");
 // })

function SF(post) {
  this.post = post;
}

SF.persist = function(comment) {
  if (!SF.all) {
    SF.all = []
  }

  SF.all.push(comment);

  localStorage.setItem(SF.key, JSON.stringify(SF.all));
};

SF.populate = function() {
  var objects = JSON.parse(localStorage.getItem(SF.key));

  var storageStories = [];

  _.each(objects, function(obj) {
    var post = new SF(obj.post);
    storageStories.push(post);
  });

  SF.all = storageStories;
};

SF.key = "stories";
SF.populate();

SF.prototype.save = function() {
  SF.persist(this);
};

SF.prototype.renderTemplate = function(template_source, where) {
  var template = _.template($(template_source).html());

  _.each(SF.all, function(item) {
    $(where).append(template(item));
  });
};

$(function() {
  var mySF = SF.all && SF.all[0];

  if (!mySF) {
    mySF = new SF("story");
    mySF.save();
  }

  mySF.renderTemplate("#post-template", "#post-container");
});