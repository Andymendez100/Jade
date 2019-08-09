$(document).ready(function () {
  //Create function for event that clears all card notifications when the 'clear' button is clicked
  $("#clearButton").on("click", function () {
    //    alert("I've been clicked!"); 
    $("#notifs").empty();
    $("#welcome").empty();
    // After notifications are cleared, text will display on the feed "No new messages! Perhaps you should submit something to liven things up?""
  });

  $("#userId").val(sessionStorage.getItem("id"));

  $.get("/api/userfeed").then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      let imgUrl = data[i].postImage;
      let Content = data[i].postContent;
      let price = data[i].postPrice

      console.log(data[i].postImage);

      $("#notifs").prepend(
        $('<div class="card" style = "width:18rem;"> <div class="card-body"> <img src="' + data[i].postImage + '" class="img-thumbnail float-left"> <p class="lead" style="clear: both;">' + Content + " \n Asking Price \n" + price + '"</p></div></div>')

      )
    }
  })
})