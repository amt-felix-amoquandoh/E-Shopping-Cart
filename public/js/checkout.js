// window.onload = () => {
//   if (!sessionStorage.user) {
//     location.replace("/login");
//   }
// };

const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
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
    !street.state ||
    !city.length ||
    !state.length ||
    !zipcode.length ||
    !landmark.length
  ) {
    return showFormError("fill all inputs first");
  } else {
    return { address, street, city, state, zipcode, landmark };
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};

const sendData = (path, data) => {
  console.log(data);
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => processData(data));
};

const processData = (data) => {
  loading.style.display = "none";
  if (data.alert) {
    showFormError(data.alert);
  } else if (data.email) {
    sessionStorage.user = JSON.stringify(data);
    if (location.search.includes("after")) {
      let pageId = location.search.split("=")[1];
      location.replace(`./products/${pageId}`);
    } else {
      location.replace("/");
    }
  }
};
