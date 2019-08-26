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
  $searchContainer.hide();

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

    $menuItems.empty();
  });

  $cookieButton.click(function(event) {
    event.preventDefault();

    $menuItems.empty();
  });

  $cakeButton.click(function(event) {
    event.preventDefault();

    $menuItems.empty();
  });
  
  $pieButton.click(function(event) {
    event.preventDefault();

    $menuItems.empty();
  });
  
  $macaronButton.click(function(event) {
    event.preventDefault();

    $menuItems.empty();
  });
});
