$(document).ready(function() {
  $('.modal').modal();

  $.get('/api/userfeed').then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const content = data[i].postContent;
      const price = data[i].postPrice;
      const title = data[i].postTitle;
      $('.pictureDisplay').append(
        $(
          `
      <div class="flip-card userCard">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${data[i].postImage}" style="width:300px;height:200px; border-radius: 25px;" >
          </div>
          <div class="flip-card-back">
            <h1> ${title} </h1>
            <p> Asking Price: $${price} </p>
            <p > ${content} </p>
          </div>
        </div>
      </div>`
        )
      );
    }
    // $('.materialboxed').materialbox();
  });
});
