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
const $finalMessage = $(".final-message");
const $searchInput = $(".search-input");
let includedItems = [];
let totalCost = 0;
const $noNameError = $(".no-name-in-submit-form");
const $noNumberError = $(".no-number-in-submit-form");

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

const createNoItemAlert = function() {
  let alert = $(`
  <div class="no-item-alert">
    You should add an item before you checkout!
  </div>
  `)
  $checkoutItemContainer.prepend(alert);
  return $checkoutItemContainer;
}

const dataSerializationImitator = function(foodItems, totalCost, name, phoneNumber) {
  //food_item name food_item quantity total cost
  let foodItemNameString = "";
  let foodItemQuantityString = "";
  let totalCostString = `&totalCost=${totalCost}`;
  let userNameString = `&name=${name}`;
  let userPhoneNumber = `&phoneNumber=${phoneNumber}`;
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

    dataString = foodItemNameString + foodItemQuantityString + totalCostString + userNameString + userPhoneNumber;
  });

  return dataString;
};

const restoreDefault = function () {
  let $foodItemContainers = $(".menu-item").children("tbody").children("tr");
  $foodItemContainers.each(e => {
    $($foodItemContainers[e]).children(".counter").children(".menu-item-counter").val(0);
  });
  let $checkoutItems = $checkoutItemContainer.children("tbody").children(".checkout-item");
  $checkoutItems.each(e => {
    let nameToCheck = $($checkoutItems[e]).children(".chkout-item-name").text();
    let id = nameToCheck.replace(/\s+/g, '');
    let newArray = includedItems.filter(item => item !== id);
    includedItems = newArray;
    $($checkoutItems[e]).remove();
  })
  totalCost = 0;
  $(".chk-out-total").text(`Total: $${totalCost}`);
};

const hideAllDisplays = function () {
  $pastry.hide();
  $cookie.hide();
  $cake.hide();
  $pie.hide();
  $macaron.hide();
};

const switchDisplay = function(category) {
  switch(category) {
    case "pastries":
      hideAllDisplays();
      $pastry.show();
      break;
    case "cookies":
      hideAllDisplays();
      $cookie.show();
      break;
    case "cakes":
      hideAllDisplays();
      $cake.show();
      break;
    case "pies":
      hideAllDisplays();
      $pie.show();
      break;
    case "macarons":
      hideAllDisplays();
      $macaron.show();
      break;
  }
};

$(() => {

  $(".reveal-when-credit").hide();
  $finalMessage.hide();
  $searchContainer.hide();
  switchDisplay("pastries");
  $paymentContainer.hide();
  $noNameError.hide();
  $noNumberError.hide();

  $.ajax({
    url: "/items",
    method: "GET"
  })
  .then(foodItems =>{
    for (let foodItem of foodItems) {
      let foodName = foodItem["item_name"];
      let option =$(`
        <option value="${foodName}">${foodName}</option>
      `);
      $("#food-names").append(option);
    }
    return foodItems;
  });

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
    switchDisplay("pastries");
  });

  $cookieButton.click(function(event) {
    event.preventDefault();
    switchDisplay("cookies");
  });

  $cakeButton.click(function(event) {
    event.preventDefault();
    switchDisplay("cakes");
  });

  $pieButton.click(function(event) {
    event.preventDefault();
    switchDisplay("pies");
  });

  $macaronButton.click(function(event) {
    event.preventDefault();
    switchDisplay("macarons");
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

    if($checkoutItemContainer.children("tbody").children(".checkout-item").length){
      $checkoutItemContainer.hide();
      $paymentContainer.show();
    } else {
      if (!($checkoutItemContainer.hasClass("no-item"))){
        $checkoutItemContainer.addClass("no-item");
        createNoItemAlert();
        setTimeout(function() {
          $checkoutItemContainer.removeClass("no-item");
          $(".no-item-alert").remove();
        }, 2000);
      }
    }
  });

  $orderButton.click(function(event) {
    event.preventDefault();

    let $tbody = $(this).parent().parent().children(".checkout-container").children("tbody");
    let $orderedItems = $tbody.children(".checkout-item");
    let $totalCost = $tbody.children("tr").children(".chk-out-total").text().replace("Total: $", "");
    let $name = $(this).parent().children(".form-rows").children("#input-name").val();
    let $number = $(this).parent().children(".form-rows").children("#input-number").val();
    
    if($name){
      if($number){
        $finalMessage.show();
        $paymentContainer.css("opacity", "0");
    
        setTimeout(function() {
          $finalMessage.hide();
          $paymentContainer.css("opacity", "1");
          $paymentContainer.hide();
          $checkoutItemContainer.slideToggle();
          // $("#input-name").val("");
          // $("#input-number").val("");
          restoreDefault();
        }, 2000)
    
        const url = "/pay";
        const method = "POST";
        const dataString = dataSerializationImitator($orderedItems, $totalCost, $name, $number);
    
        $.ajax({
          url: url,
          method: method,
          data: dataString,
        });
    
        // $.ajax({
        //   url: "/sms",
        //   method: method,
        //   data: dataString
        // });
      } else {
        $noNumberError.show();
        setTimeout(function() {
          $noNumberError.hide();
        }, 1000);
      }
    } else {
      $noNameError.show();
      setTimeout(function() {
        $noNameError.hide();
      }, 1000);
    }

  });

  $(".registration-button").submit(function(event){
    event.preventDefault();
    const data = $(this).parent().serialize();
    const url = "/registration";
    const method = "POST";

    $.ajax({
      url: url,
      method: method,
      data: data
    });

  });

  $(".registration-input").keyup(function() {
    if($(this).siblings(".error-message")) {
      $(this).removeClass("error");
      $(".error-message").remove();
    }
  });

  $(".back-to-checkout-btn").click(function() {
    event.preventDefault();
    $checkoutItemContainer.show();
    $paymentContainer.hide();
  });

  $(".search-button").click(function(event) {
    event.preventDefault();

    const data = $(this).parent().serialize();
    const url = "/search";
    const method = "POST";

    $.ajax({
      url: url,
      method: method,
      data: data
    })
    .then(data => {
      if(data.length){
        switchDisplay(data[0]["category"]);
        $searchContainer.hide();

        if($changingIcon[0].className === "fas fa-search"){
          $changingIcon.removeClass("fa-search");
          $changingIcon.addClass("fa-times");
        } else {
          $changingIcon.addClass("fa-search");
          $changingIcon.removeClass("fa-times");
        }

        $(".search-input").val("");
        return data
      } else {
        $searchInput.addClass("no-item");
        $searchInput.val("No such item!");
        setTimeout(function() {
          $searchInput.removeClass("no-item");
          $searchInput.val("");
        }, 1000);
      }
    });
  });

  $("#payment-method-credit").click(function() {

    document.getElementById("payment-method-credit").checked = true;
    if(document.getElementById("payment-method-credit").checked){
      $(".reveal-when-credit").show();
      console.log("in checked");
    }
  });

  $("#payment-method-person").click(function() {

    document.getElementById("payment-method-credit").checked = false;

    $(".reveal-when-credit").hide();

  });
});
