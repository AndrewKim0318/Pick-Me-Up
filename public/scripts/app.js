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

  const name = $(data).children("h3").text();
  const price = $(data).children(".item-price").text();
  let counter = $(data).children(".counter").children("input").val();
  
  const $item = $(`
  <div class="checkout-item">
  <h4>${name}</h4>
  <span id="${id}" class="item-count">
    x ${counter}
  </span>
  <div class="plus-minus-btns">
    <i class="far fa-minus-square"></i>
    <i class="far fa-plus-square"></i>
  </div>
  <span class="item-price">$${price}</span>
  </div>`);

  $checkoutItemContainer.prepend($item);
  return $checkoutItemContainer;

};

const changeCounterInCheckoutContainer = function(data, id) {
  const $value = $checkoutItemContainer.children(".checkout-item").children(`#${id}`);
  const $counter = $(data).children(".counter").children("input").val();
  $value.text(`x ${$counter}`);

};

const removeItemFromCheckoutContainer = function(id) {
  const $counter = $checkoutItemContainer.children(".checkout-item").children(`#${id}`);
  console.log($counter);
  const $parent = $counter.parent();
  console.log($parent);
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
    const nameToCheck = $(grandparent).children("h3").text();
    let $quantityCounter = $(this.parentElement).children("input");
    const id = nameToCheck;

    if (!includedItems.includes(nameToCheck)) {
      $quantityCounter.val(+$quantityCounter.val() + 1);
      includedItems.push(nameToCheck);
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
    const nameToCheck = $(grandparent).children("h3").text();
    let $quantityCounter = $(this.parentElement).children("input");
    const id = nameToCheck;

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
});
