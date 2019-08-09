$(document).ready(function () {

    //Create function for event that clears all card notifications when the 'clear' button is clicked
    $("#clearButton").on("click", function() {
    //    alert("I've been clicked!"); 
      $("#notifs").empty();
      $("#welcome").empty();
      
    });

    //Create event that when the "X" buttons are clicked on a card, they dismiss that single card.
      // If I don't figure this out by the end of Thursday- scrub this. - EMMA
      $("btn btn-primary float-left").on("click", function() {
        alert("I've been clicked!");
        //$("notifs").empty();
    });

    // Make a get request to the api holding our links and dynamically creating cards for the feed
    const getUserFeed = () => {
        $.get("/api/userFeed").then((data) => {
            for (let i = 0; i < data.length; i++) {
                var newCard = $("#notifs").prepend(
                    $('<div class="card" style = "width:18rem;"> <img src="' + data[i] + '" class="card-img-top"> <div class="card=body"> <p class="card-text"> Some quick example text to build on the card title and make up the bulk of the cards content. </p> </div> </div>')

                )
            }
        })
    }

    getUserFeed();
 })