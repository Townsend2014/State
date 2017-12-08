
      // Initial array of animals
      var animals = ["Puppies", "Kittens", "Shark", "Lion"];

      // displayAnimalInfo function re-renders the HTML to display the appropriate content
      function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // Creating a div to hold the animal
          var animalDiv = $("<div class='animal'>");

          // Storing the rating data
          var rating = response.Rated;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          animalDiv.append(pOne);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          animalDiv.append(image);

          // Putting the entire animal above the previous animals
          $("#animals-view").prepend(animalDiv);
        });

      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where an animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayAnimalInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

// Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var animal = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the animal
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a property pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and animalImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });