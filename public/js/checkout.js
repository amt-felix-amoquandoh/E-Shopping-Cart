window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  }
};

const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
  let popsy = document.querySelector("#popsy");
  //send to backend
  if (address) {
    alert("moda");
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
  } else {
    let popsy = document.querySelector("#popsy");
    popsy.classList.add("open");
    function closePopsy() {
      popsy.classList.remove("open");
    }
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};
