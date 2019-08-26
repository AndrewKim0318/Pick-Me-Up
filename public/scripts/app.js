$(() => {
  const $searchContainer = $(".search-container");
  $searchContainer.hide();

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $(".search-icon").click(function(event) {
    event.preventDefault();

    $searchContainer.animate({width: "toogle"});
  })
});
