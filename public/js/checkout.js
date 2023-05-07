window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  }
};

const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
  //send to backend
  fetch("/stripe-checkout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer sk_test_51N4unvGDx25m1ticL5A4uE712tDAl50bgT2SGRywqJ3NDWqEuRjPNG3gTUff0vmoJc71dfDEGTHBxBE7OsYKHWyI00jW05Ft5k", // Replace with your actual API key
    },
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartBasket")),
      address: address,
      email: JSON.parse(sessionStorage.user).email,
    }),
  })
    .then((res) => res.json())
    .then((url) => {
      console.log(url);
    });
});

const getAddress = () => {
  //validate
  let address = document.querySelector("#address").value;
  let street = document.querySelector("#street").value;
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  let zipcode = document.querySelector("#zipcode").value;
  let landmark = document.querySelector("#landmark").value;

  if (
    !address.length ||
    !street.length ||
    !city.length ||
    !state.length ||
    !zipcode.length ||
    !landmark.length
  ) {
    return showFormError("fill all inputs first");
  } else {
    console.log("yeah fuckerssssssssss");
    return { address, street, city, state, zipcode, landmark };
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};
