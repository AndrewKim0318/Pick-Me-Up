$(() => {
  $(".log-in-submit-button").submit(function (event) {
    event.preventDefault();
    const data = $(this).parent().serialize();
    $.ajax({
      url: "/login",
      method: "POST",
      data: data
    })
    .then(error => {
      console.log("in .then after ajex", error);
      return error;
    });
  })
});
