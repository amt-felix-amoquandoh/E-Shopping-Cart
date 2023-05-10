window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  }
};

const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
  //send to backend
  if (address) {
    let cartItems = document.querySelectorAll("#cartItems .cartItem");
    let cartContent = "";

    cartItems.forEach((item) => {
      let title = item.querySelector("h4").textContent;
      let price = item.querySelector("h5").textContent;
      cartContent += `${title} - ${price}\n`;
    });

    alert("Order successful!\n\nItems:\n" + cartContent);
  }
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
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};
