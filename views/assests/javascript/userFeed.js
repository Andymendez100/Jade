$(document).ready(function() {
  $('.modal').modal();

  $.get('/api/userfeed').then(function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const content = data[i].postContent;
      const price = data[i].postPrice;
      $('.pictureDisplay').append(
        $(
          `<div class="card userCard">  <img src="${data[i].postImage}" class="card-img-top cardImg materialboxed"> <div class="card-body"> <p class="card-text">${content} <br >Asking Price ${price}</p></div></div>`
        )
      );
    }
    $('.materialboxed').materialbox();
  });
});
