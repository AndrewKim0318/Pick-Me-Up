const $searchContainer = $(".search-container");
const $searchIcon = $(".search-icon");
const $changingIcon = $("#change-icon");
const $pastryButton = $("#pastries");
const $cookieButton = $("#cookies");
const $cakeButton = $("#cakes");
const $pieButton = $("#pies");
const $macaronButton = $("#macarons");
const $pastry = $(".pastries");
const $cookie = $(".cookies");
const $cake = $(".cakes");
const $pie = $(".pies");
const $macaron = $(".macarons");
const $addButton = $(".plus");
const $minusButton = $(".minus");
const $checkoutItemContainer = $(".checkout-container");
let includedItems = [];

const insertIntoCheckoutContainer = function(data, id) {

  const name = $(data).children(".item-name").text();
  const price = $(data).children(".item-price").text();
  let counter = $(data).children(".counter").children("input").val();

  const $item = $(`
  <table class="checkout-item">
  <h4>${name}</h4>
  <span id="${id}" class="item-count">
    x<input class="menu-item-counter" type="text" value="${counter}" readonly>
  </span>
  <div class="plus-minus-btns">
    <i class="far fa-minus-square minus-btn-icon"></i>
    <i class="far fa-plus-square plus-btn-icon"></i>
  </div>
  <span class="item-price">$${price}</span>
  </table>`);

  $checkoutItemContainer.prepend($item);
  return $checkoutItemContainer;
};

const changeCounterInCheckoutContainer = function(data, id) {
  const $value = $checkoutItemContainer.children(".checkout-item").children(`#${id}`).children(".menu-item-counter");
  const $counter = $(data).children(".counter").children("input").val();
  $value.val(`${$counter}`);

};

const removeItemFromCheckoutContainer = function(id) {
  const $counter = $checkoutItemContainer.children(".checkout-item").children(`#${id}`);
  const $parent = $counter.parent();
  $parent.remove();

}


$(() => {

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

  $addButton.click(function(event){
    event.preventDefault();

    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    const nameToCheck = $(grandparent).children(".item-name").text();
    let $quantityCounter = $(parent).children(".menu-item-counter");
    const id = nameToCheck.replace(/\s+/g, '');

    if (!includedItems.includes(id)) {
      $quantityCounter.val(+$quantityCounter.val() + 1);
      includedItems.push(id);
      insertIntoCheckoutContainer(grandparent, id);
    } else {
      $quantityCounter.val(+$quantityCounter.val() + 1);
      changeCounterInCheckoutContainer(grandparent, id);
    }

  });

  $minusButton.click(function(event){
    event.preventDefault();

    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    const nameToCheck = $(grandparent).children(".item-name").text();
    let $quantityCounter = $(parent).children(".menu-item-counter");
    const id = nameToCheck.replace(/\s+/g, '');

    if(Number($quantityCounter.val()) > 1) {
      $quantityCounter.val(+$quantityCounter.val() - 1);
      changeCounterInCheckoutContainer(grandparent, id);
    } else if (Number($quantityCounter.val()) === 1) {
      $quantityCounter.val(+$quantityCounter.val() - 1);
      let newArray = includedItems.filter(item => item !== id);
      includedItems = newArray;
      removeItemFromCheckoutContainer(id);
    }

  })

  $(document).click(function(e) {
    let $target = $(e.target);
    if ($target.is(".plus-btn-icon")){
      let $parent = $target.parent();
      let $grandParent = $parent.parent();
      let $menuItem = $grandParent.parent().parent().children(".menu-item");
      let $table = $menuItem.children("tbody");
      let $foodItems = $table.children();
      let $nameContainer = $foodItems.children(".item-name");
      let nameOfItem = $grandParent.children("h4").text();
      let $quantityCounterContainer = $grandParent.children(".item-count");
      let $quantityCounter = $quantityCounterContainer.children(".menu-item-counter");

      $quantityCounter.val(+$quantityCounter.val() + 1);

      $nameContainer.each(e => {
        if($($nameContainer[e]).text() === nameOfItem){
          let foundName = $nameContainer[e];
          let $foundParent = $(foundName).parent();
          let $foundCounter = $foundParent.children(".counter");
          let $foundInput = $foundCounter.children(".menu-item-counter");
          $foundInput.val($quantityCounter.val())
        }
      });

    }
    if ($target.is(".minus-btn-icon")){
      let $parent = $target.parent();
      let $grandParent = $parent.parent();
      let $greatGrandParent = $grandParent.parent()
      let $menuItem = $grandParent.parent().parent().children(".menu-item");
      let $table = $menuItem.children("tbody");
      let $foodItems = $table.children();
      let $nameContainer = $foodItems.children(".item-name");
      let nameOfItem = $grandParent.children("h4").text();
      let $quantityCounterContainer = $grandParent.children(".item-count");
      let $quantityCounter = $quantityCounterContainer.children(".menu-item-counter");
      let id = nameOfItem.replace(/\s+/g, '');

      if ($quantityCounter.val() > 1){
        $quantityCounter.val(+$quantityCounter.val() - 1);
      } else if (Number($quantityCounter.val()) === 1) {
        console.log("clicked");
        $quantityCounter.val(+$quantityCounter.val() - 1);
        let newArray = includedItems.filter(item => item !== id);
        includedItems = newArray;
        $grandParent.remove();
      }
      $nameContainer.each(e => {
        if($($nameContainer[e]).text() === nameOfItem){
          let foundName = $nameContainer[e];
          let $foundParent = $(foundName).parent();
          let $foundCounter = $foundParent.children(".counter");
          let $foundInput = $foundCounter.children(".menu-item-counter");
          $foundInput.val($quantityCounter.val())
        }
      });

    }
  })
});
