$(document).ready(function () {

    const getUserFeed = () => {
        $.get("/api/userFeed").then((data) => {
            for (let i = 0; i < data.length; i++) {
                var newCard = $("#welcome").append(
                    $('<div class="card" style = "width:18rem;')



                    // $('<div class="card" style="width:18rem;">'),
                    // $(" <img class='card-img-top' src='" + data[i] + "' alt='Card image cap'>"),
                    // $("  <div class='card-body'>"),
                    // $("<p class='card-text'>Some quick example text to build on the card title and make up the bulk of the cards content."),
                    // $("</p>"),
                    // $("</div>"),
                    // $("</div>")
                )
            }
        })
    }

    getUserFeed();
})