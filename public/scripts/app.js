$(() => {
  const $searchContainer = $(".search-container");
  const $searchIcon = $("#search-icon");
  $searchContainer.hide();
  console.log($searchContainer[0]);


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

    $searchContainer.animate({width: "toggle"});

    if($searchIcon[0].className === "fas fa-search"){
      $searchIcon.removeClass("fa-search");
      $searchIcon.addClass("fa-times");
    } else {
      $searchIcon.addClass("fa-search");
      $searchIcon.removeClass("fa-times");
    }
  })
});
