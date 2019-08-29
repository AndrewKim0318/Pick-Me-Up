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
const $checkoutButton = $(".checkout-btn");
const $paymentContainer = $(".checkout-container-submit-form");
const $orderButton = $(".order-btn");
let includedItems = [];
let totalCost = 0;

const insertIntoCheckoutContainer = function(data, id) {

  const name = $(data).children(".item-name").text();
  const price = $(data).children(".item-price").text();
  let counter = $(data).children(".counter").children("input").val();

  const $item = $(`
  <tr class="checkout-item">
  <td class="chkout-item-name">${name}</td>
  <td id="${id}" class="item-count">
    x<input class="menu-item-counter" type="text" value="${counter}" readonly>
  </td>
  <td class="plus-minus-btns">
    <i class="far fa-minus-square minus-btn-icon"></i>
    <i class="far fa-plus-square plus-btn-icon"></i>
  </td>
  <td class="item-price">$<input class="menu-item-counter" type="text" value="${price}" readonly></td>
  </tr>`);

  $checkoutItemContainer.prepend($item);
  return $checkoutItemContainer;
};

const changeCounterInCheckoutContainer = function(data, id) {
  const $value = $checkoutItemContainer.children("tbody").children("tr").children(`#${id}`).children(".menu-item-counter");
  const $counter = $(data).children(".counter").children("input").val();
  $value.val(`${$counter}`);

};

const removeItemFromCheckoutContainer = function(id) {
  const $counter = $checkoutItemContainer.children("tbody").children("tr").children(`#${id}`).children(".menu-item-counter");
  const $table = $counter.parent().parent();
  $table.remove();

};

const calculateTotalCost = function (price, operator) {

  if (operator === "add") {
    totalCost += price;
  } else {
    totalCost -= price;
  }

  let $tableToEvaluate = $checkoutItemContainer;
  let $totalPriceContainer = $tableToEvaluate.children("tbody").children("tr").children(".chk-out-total");
  let totalCostDisplay = totalCost.toFixed(2); // Changes the type to a string, useful for displaying, not useful for computing
  $totalPriceContainer.text(`Total: $${totalCostDisplay}`);

  return totalCost;

};

const dataSerializationImitator = function(foodItems, totalCost) {
  //food_item name food_item quantity total cost
  let foodItemNameString = "";
  let foodItemQuantityString = "";
  let totalCostString = `&totalCost=${totalCost}`
  let dataString = "";

  foodItems.each(e=> {
    let foodItemName = $(foodItems[e]).children(".chkout-item-name").text().replace(/\s+/g, "+");
    let foodItemQuantity = $(foodItems[e]).children(".item-count").children(".menu-item-counter").val();

    if (!foodItemNameString) {
      foodItemNameString += `foodItems="${foodItemName}"`;
    } else {
      foodItemNameString += `+"${foodItemName}"`;
    }

    if (!foodItemQuantityString) {
      foodItemQuantityString += `&foodItemQuantity=${foodItemQuantity}`;
    } else {
      foodItemQuantityString += `+${foodItemQuantity}`;
    }

    dataString = foodItemNameString + foodItemQuantityString + totalCostString;
  });

  console.log(dataString);
  return dataString;
}

$(() => {

  $searchContainer.hide();
  $pastry.show();
  $cookie.hide();
  $cake.hide();
  $pie.hide();
  $macaron.hide();
  $paymentContainer.hide();


  $searchIcon.click(function(event) {
    event.preventDefault();

    $searchContainer.animate({width: "toggle"});

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
    const price = Number($(grandparent).children(".item-price").text());

    if (!includedItems.includes(id)) {
      $quantityCounter.val(+$quantityCounter.val() + 1);
      includedItems.push(id);
      insertIntoCheckoutContainer(grandparent, id);
    } else {
      $quantityCounter.val(+$quantityCounter.val() + 1);
      changeCounterInCheckoutContainer(grandparent, id);
    }
    calculateTotalCost(price, "add");

  });

  $minusButton.click(function(event){
    event.preventDefault();

    const parent = this.parentElement;
    const grandparent = parent.parentElement;
    const nameToCheck = $(grandparent).children(".item-name").text();
    let $quantityCounter = $(parent).children(".menu-item-counter");
    const id = nameToCheck.replace(/\s+/g, '');
    const price = Number($(grandparent).children(".item-price").text());

    if(Number($quantityCounter.val()) > 1) {
      calculateTotalCost(price, "subtract");
      $quantityCounter.val(+$quantityCounter.val() - 1);
      changeCounterInCheckoutContainer(grandparent, id);
    } else if (Number($quantityCounter.val()) === 1) {
      calculateTotalCost(price, "subtract");
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
      let $menuItem = $grandParent.parent().parent().parent().children(".menu-item");
      let $table = $menuItem.children("tbody");
      let $foodItems = $table.children();
      let $nameContainer = $foodItems.children(".item-name");
      let nameOfItem = $grandParent.children(".chkout-item-name").text();
      let $quantityCounterContainer = $grandParent.children(".item-count");
      let $quantityCounter = $quantityCounterContainer.children(".menu-item-counter");

      $quantityCounter.val(+$quantityCounter.val() + 1);
      const price = $grandParent.children(".item-price").children(".menu-item-counter").val();

      $nameContainer.each(e => {
        if($($nameContainer[e]).text() === nameOfItem){
          let foundName = $nameContainer[e];
          let $foundParent = $(foundName).parent();
          let $foundCounter = $foundParent.children(".counter");
          let $foundInput = $foundCounter.children(".menu-item-counter");
          $foundInput.val($quantityCounter.val())
        }
      });
      calculateTotalCost(Number(price), "add");

    }
    if ($target.is(".minus-btn-icon")){
      let $parent = $target.parent();
      let $grandParent = $parent.parent();
      let $menuItem = $grandParent.parent().parent().parent().children(".menu-item");
      let $table = $menuItem.children("tbody");
      let $foodItems = $table.children();
      let $nameContainer = $foodItems.children(".item-name");
      let nameOfItem = $grandParent.children(".chkout-item-name").text();
      let $quantityCounterContainer = $grandParent.children(".item-count");
      let $quantityCounter = $quantityCounterContainer.children(".menu-item-counter");
      let id = nameOfItem.replace(/\s+/g, '');
      const price = $grandParent.children(".item-price").children(".menu-item-counter").val();

      if ($quantityCounter.val() > 1){
        calculateTotalCost(Number(price), "subtract");
        $quantityCounter.val(+$quantityCounter.val() - 1);
      } else if (Number($quantityCounter.val()) === 1) {
        calculateTotalCost(Number(price), "subtract");
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
          $foundInput.val($quantityCounter.val());
        }
      });

    }
  })

  $checkoutButton.click(function(event) {
    event.preventDefault();
    $checkoutItemContainer.animate({height: "toggle"});
    $paymentContainer.animate({height: "toggle"});
  });

  $orderButton.click(function(event) {
    event.preventDefault();

    console.log(this);
    let $tbody = $(this).parent().parent().children(".checkout-container").children("tbody");
    let $orderedItems = $tbody.children(".checkout-item");
    let $totalCost = $tbody.children("tr").children(".chk-out-total").text().replace("Total: $", "");

    //For ajax request;
    const url = "/pay";
    const method = "POST";
    const dataString = dataSerializationImitator($orderedItems, $totalCost);

    $.ajax({
      url: url,
      method: method,
      data: dataString,
    });

    $.ajax({
      url: "/sms",
      method: "POST",
      data: "data"
    })

    $.ajaxSettings({
      url: "/restaurant",
      method: "POST",
      data: "data"
    })
  });
});
