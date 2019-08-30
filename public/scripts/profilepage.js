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

  $(".edit-button").click(function(event){
    event.preventDefault();
    const data = $(this).parent().serialize();
    $updateMessage.show();
    setTimeout(function(){
      $updateMessage.hide();
      $("#editPassword").val("");
    }, 1500);

    $.ajax({
      url: "/profile/edit",
      method: "POST",
      data: data
    });

  });
});