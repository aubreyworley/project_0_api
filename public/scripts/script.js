// CLIENT-SIDE JAVASCRIPT

$(function() {

  // 'postsController' holds all our post functionality
  var postsController = {

    //compile post template
    template: _.template($('#post-template').html()),

    all: function() {
        $.get('/api/posts', function(data) {
          var allPosts = data;

          //iterate through allPosts
          _.each(allPosts, function(post) {
            // pass each post object through template and append to view
            var $postHtml = $(postsController.template(post));
            console.log($postHtml);
            $('#post-list').append($postHtml);
    });
    //add event-handlers for updating/deleting
        postsController.addEventHandlers();
      });
    },
    
    create: function(newDistrict, newStory) {
      var postData = {district: newDistrict, story: newStory};
      // send POST request to server to create new post
      $.post('/api/posts', postData, function(data) {
        // pass post object through template and append to view
        var $postHtml = $(postsController.template(data));
        $('#post-list').append($postHtml);
      });
    },

    update: function(postId, updatedDistrict, updatedStory) {
      // send PUT request to server to update post
      $.ajax({
        type: 'PUT',
        url: '/api/posts/' + postId,
        data: {
          district: updatedDistrict,
          story: updatedStory
        },
        success: function(data) {
          // pass post object through template and append to view
          var $postHtml = $(postsController.template(data));
          $('#post-' + postId).replaceWith($postHtml);
        }
      });
    },

    delete: function(postId) {
      // send DELETE request to server to delete post
      $.ajax({
        type: 'DELETE',
        url: '/api/posts' + postId,
        success: function(data) {
          // remove deleted post from view
          $('#post-' + postId).remove();
        }
      });
    },
  
    // add event-handlers to posts for updating/deleting
    addEventHandlers: function() {
      $('#post-list')
        // for update: submit event on '.update-post' form
      .on('submit', '.update-post', function(event) {
        event.preventDefault();
        //find the post's id (stored in HTML as 'data-id')
        var postId = $(this).closest('.post').attr('data-id');
        //update the posts with form data
        var updatedDistrict = $(this).find('.updated-district').val();
        var updatedStory = $(this).find('.updated-story').val();
        postsController.update(postId,updatedDistrict, updatedStory);
      })
      // for delete: click event on '.delete-post' button
      .on('click', '.delete-post', function(event) {
        event.preventDefault();
        // find the post's id
        var postId = $(this).closest('.post').attr('data-id');
        // delete the post
        postsController.delete(postId);
      });
    },

    setupView: function() {
      //append existing posts to view
      postsController.all();

      // add event-handler to new-post form
      $('#new-post').on('submit', function(event) {
        event.preventDefault();
        // create new post with form data
        var newDistrict = $('#new-district').val();
        var newStory = $('#new-story').val();
        postsController.create(newDistrict, newStory);

        // reset the form 
        $(this) [0].reset();
        $('#new-story').focus();
      });
    }
  };

  postsController.setupView();
  
 });




 
