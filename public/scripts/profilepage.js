const $updateMessage = $(".updated-profile");
$(() => {
  $updateMessage.hide()
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

  $(".edit-button").submit(function(event){
    event.preventDefault();
    const data = $(this).parent().serialize();

    $.ajax({
      url: "/profile/edit",
      method: "POST",
      data: data
    });

  });

});