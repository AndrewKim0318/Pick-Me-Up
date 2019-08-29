$(() => {
  
  $.ajax({
    url: "/profile",
    method: "GET"
  });

  $(".order-btn").click(function(event){
    $(".cupcake-photo").css("grid-column", "1");
  });

  $(".profile-btn").click(function(event){
    $(".cupcake-photo").css("grid-column", "2");
  });

});