$(document).ready(function () {

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