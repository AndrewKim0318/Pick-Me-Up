
$(() => {
  const $searchContainer = $(".search-container");
  const $searchIcon = $(".search-icon");
  const $changingIcon = $("#change-icon");
  const $pastryButton = $("#pastries");
  const $cookieButton = $("#cookies");
  const $cakeButton = $("#cakes");
  const $pieButton = $("#pies");
  const $macaronButton = $("#macarons");
  const $menuItems = $(".menu-item");
  const $pastry = $(".pastries");
  const $cookie = $(".cookies");
  const $cake = $(".cakes");
  const $pie = $(".pies");
  const $macaron = $(".macarons");

  const url = "/";

  $searchContainer.hide();
  $pastry.show();
  $cookie.hide();
  $cake.hide();
  $pie.hide();
  $macaron.hide();


  $searchIcon.click(function(event) {
    event.preventDefault();

    $searchContainer.animate({width: "toggle"});
    console.log($searchIcon[0].className);

    if($changingIcon[0].className === "fas fa-search"){
      $changingIcon.removeClass("fa-search");
      $changingIcon.addClass("fa-times");
    } else {
      $changingIcon.addClass("fa-search");
      $changingIcon.removeClass("fa-times");
    }
  });

  $pastryButton.click(function(event) {
    event.preventDefault();

    $pastry.show();
    $cookie.hide();
    $cake.hide();
    $pie.hide();
    $macaron.hide();

  });

  $cookieButton.click(function(event) {
    event.preventDefault();

    $pastry.hide();
    $cookie.show();
    $cake.hide();
    $pie.hide();
    $macaron.hide();
  });

  $cakeButton.click(function(event) {
    event.preventDefault();

    $pastry.hide();
    $cookie.hide();
    $cake.show();
    $pie.hide();
    $macaron.hide();
  });
  
  $pieButton.click(function(event) {
    event.preventDefault();

    $pastry.hide();
    $cookie.hide();
    $cake.hide();
    $pie.show();
    $macaron.hide();
  });
  
  $macaronButton.click(function(event) {
    event.preventDefault();

    $pastry.hide();
    $cookie.hide();
    $cake.hide();
    $pie.hide();
    $macaron.show();
  });
});
