// shop variables
const productArea = document.getElementById("mainProArea");
const cartButton = document.querySelector(".cartTransBtn");
const closeCartBtn = document.querySelector(".closeCart");
const ClearCartBtn = document.querySelector(".cartFooterButton");
const cartArea = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cartOverlay");
const cartItemsQuantity = document.getElementById("itemsUpdate");
const mobileItemsQuantity = document.getElementById("mobileItemsUpdate");
const cartTotal = document.querySelector(".ItemsTotal");
const overlayCartContent = document.querySelector(".overlayCartContent");

//cart
let cartBasket = [];

//add Buttons
let addButtons = [];

function displayCartOverlay() {
  cartOverlay.classList.toggle("transparentBack");
  cartArea.classList.toggle("showCart");
}

let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", () => {
  durationOptions.classList.toggle("sortOptions_active");
});

//...
let newUploads = document.getElementById("newest");
let lowestPrice = document.getElementById("lowPrice");
let highestPrice = document.getElementById("highest");
let clothesOnly = document.getElementById("clothes");
let accessOnly = document.getElementById("accessories");
let sportsOnly = document.getElementById("sportwear");
let lingerie = document.getElementById("lingerie");
let pillowOnly = document.getElementById("pillow");
let womenOnly = document.getElementById("women");
let menOnly = document.getElementById("men");
let allKids = document.getElementById("allKids");

clothesOnly.addEventListener("click", async () => {
  clothesOnly.classList.toggle("i_active");
  clothesOnly.classList.toggle("bi-toggle2-off");
  clothesOnly.classList.toggle("bi-toggle2-on");
  // clothesOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "clothes");
});

accessOnly.addEventListener("click", async () => {
  accessOnly.classList.toggle("i_active");
  accessOnly.classList.toggle("bi-toggle2-off");
  accessOnly.classList.toggle("bi-toggle2-on");
  // accessOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "accessories");
});

sportsOnly.addEventListener("click", async () => {
  sportsOnly.classList.toggle("i_active");
  sportsOnly.classList.toggle("bi-toggle2-off");
  sportsOnly.classList.toggle("bi-toggle2-on");
  // sportsOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "sportswear");
});

lingerie.addEventListener("click", async () => {
  lingerie.classList.toggle("i_active");
  lingerie.classList.toggle("bi-toggle2-off");
  lingerie.classList.toggle("bi-toggle2-on");
  // lingerie.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "lingerie");
});

pillowOnly.addEventListener("click", async () => {
  pillowOnly.classList.toggle("i_active");
  pillowOnly.classList.toggle("bi-toggle2-off");
  pillowOnly.classList.toggle("bi-toggle2-on");
  // pillowOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "pillow");
});

womenOnly.addEventListener("click", async () => {
  womenOnly.classList.toggle("i_active");
  womenOnly.classList.toggle("bi-toggle2-off");
  womenOnly.classList.toggle("bi-toggle2-on");
  // womenOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "women");
});

menOnly.addEventListener("click", async () => {
  menOnly.classList.toggle("i_active");
  menOnly.classList.toggle("bi-toggle2-off");
  menOnly.classList.toggle("bi-toggle2-on");
  // menOnly.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "men");
});

allKids.addEventListener("click", async () => {
  allKids.classList.toggle("i_active");
  allKids.classList.toggle("bi-toggle2-off");
  allKids.classList.toggle("bi-toggle2-on");
  // allKids.title = "clothesOff";

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "kids");
});

newUploads.addEventListener("click", async () => {
  durationButton.innerHTML = `
        <h5>Sort By: Newest</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
       `;
  durationOptions.classList.toggle("sortOptions_active");

  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "newest");
});

lowestPrice.addEventListener("click", async () => {
  durationButton.innerHTML = `
        <h5>Sort By: Lowest</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
       `;
  durationOptions.classList.toggle("sortOptions_active");
  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "lowest");
});

highestPrice.addEventListener("click", async () => {
  durationButton.innerHTML = `
        <h5>Sort By: Highest</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
       `;
  durationOptions.classList.toggle("sortOptions_active");
  const products = await new Products().getProducts();
  const ui = new UI();
  ui.filterProducts(products, "highest");
});

//...
// display products implementation
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const {
          title,
          price,
          description,
          category,
          brief,
          image1,
          image2,
          image3,
        } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          price,
          description,
          id,
          image,
          brief,
          image1,
          image2,
          image3,
        };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products implementation
class UI {
  loadAllproducts(products) {
    let itemResult = "";
    products.forEach((product) => {
      itemResult += `
        <!-- single Product -->
        <a class="itemCard" data-id="${product.id}">
          <img src=${product.image} alt="">
          <h5 class="cardTitle" title="African Print Dress">${product.title}</h5>
          <p>${product.description}</p>
          <div class="itemPrice">
              <h5>$${product.price}</h5>
          </div>
          <div class="colorTag">
          <div class="stars">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
        </div>
              <button class="proCart" data-id="${product.id}">Buy</button>
          </div>
        </a>
        <!-- single product ends here -->
        `;
      productArea.innerHTML = itemResult;
    });

    // add event listener to each product item
    const productCards = document.querySelectorAll(".itemCard");
    productCards.forEach((card) => {
      card.addEventListener("click", () => {
        const productId = card.dataset.id;
        // retrieve the product object using the ID
        const product = products.find((p) => p.id === productId);
        this.displayProductDetails(product);
      });
    });
  }

  filterProducts(products, sortBy, category) {
    let sortedProducts = [];
    if (category) {
      sortedProducts = products.filter((product) =>
        product.id.includes(category)
      );
    } else {
      sortedProducts = [...products];
    }
    if (sortBy === "newest") {
      // sort by date added (most recent first)
      sortedProducts = sortedProducts.sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      });
    } else if (sortBy === "lowest") {
      // sort by price (lowest first)
      sortedProducts = sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortBy === "highest") {
      // sort by price (highest first)
      sortedProducts = sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortBy === "clothes") {
      // filter products by category (clothes only)
      sortedProducts = products.filter((item) => item.id === "clothes");
    } else if (sortBy === "accessories") {
      // filter products by category (accessories only)
      sortedProducts = products.filter((item) => item.id === "accessories");
    } else if (sortBy === "sportwear") {
      // filter products by category (sportwear only)
      sortedProducts = products.filter((item) => item.id === "sportwear");
    } else if (sortBy === "lingerie") {
      // filter products by category (lingerie only)
      sortedProducts = products.filter((item) => item.id === "lingerie");
    } else if (sortBy === "pillow") {
      // filter products by category (pillow only)
      sortedProducts = products.filter((item) => item.id === "pillow");
    } else if (sortBy === "women") {
      // filter products by category (women only)
      sortedProducts = products.filter((item) => item.category === "women");
    }
    this.loadAllproducts(sortedProducts);
  }

  displayProductDetails(product) {
    console.log(`Product ${product.image} details displayed`);
    const modalContainer = document.querySelector(".modal-container");
    const closeModalBtn = document.querySelector("#close-modal-btn");

    modalContainer.classList.add("show-modal");

    closeModalBtn.addEventListener("click", () => {
      modalContainer.classList.remove("show-modal");
      modalContainer.removeChild(itemPage);
    });

    console.log(product);
    const { id, title, description, price, image, brief } = product;

    let itemPage = document.createElement("div");
    itemPage.classList.add("productInfo");

    itemPage.innerHTML = `
      <div class="imageSlider">
        <h4 class="selectImage">Select image file below to view</h4>
        <div class="productImages">
          <img src=${product.image} alt="">
          <img src=${product.image} alt="">         
          <img src=${product.image} alt="">
          <img src=${product.image} alt="">
        </div>
      </div>
      <div class="ItemDetails">
        <h2 class="productBrand">${product.title}</h2>
        <h4 class="itemDescription"><b>${product.description}</b></h4>
        <p class="itemDescription">${product.brief}</p>
        <span class="itemPrice">$${product.price}</span>
        <span class="itemDiscount">(50% Off)</span>
        <div class="rating">
          <img src="./public/img/star-filled.png" class="star" alt="">
          <img src="./public/img/star-filled.png" class="star" alt="">
          <img src="./public/img/star-filled.png" class="star" alt="">
          <img src="./public/img/star-filled.png" class="star" alt="">
          <img src="./public/img/star.png" class="star" alt="">
        </div>
        <p class="subHeading">Select Size</p>
        <input type="radio" name="size" value="s" hidden id="sSize">
        <label for="sSize" class="sizeRadioBtn check">s</label>
        <input type="radio" name="size" value="m" hidden id="mSize">
        <label for="mSize" class="sizeRadioBtn">m</label>
        <input type="radio" name="size" value="l" hidden id="lSize">
        <label for="lSize" class="sizeRadioBtn">l</label>
        <input type="radio" name="size" value="xl" hidden id="xlSize">
        <label for="xlSize" class="sizeRadioBtn">xl</label>
        <input type="radio" name="size" value="xxl" hidden id="xxlSize">
        <label for="xxlSize" class="sizeRadioBtn">xxl</label>
        <button class="btn cartButton" data-id=${product.id}>Add to Cart</button>
      </div>
    `;

    modalContainer.appendChild(itemPage);

    // Append the product page to the new window
    const imagesOfItems = document.querySelectorAll(".productImages img");
    const itemsSlider = document.querySelector(".imageSlider");

    let activeSliderImage = 0;

    imagesOfItems.forEach((item, i) => {
      item.addEventListener("click", () => {
        imagesOfItems[activeSliderImage].classList.remove("active");
        item.classList.add("active");
        itemsSlider.style.backgroundImage = `url("${item.src}")`;
        activeSliderImage = i;
      });
    });

    // Selecting sizes

    const sizeButtons = document.querySelectorAll(".sizeRadioBtn");
    let checkedButton = 0;

    sizeButtons.forEach((item, i) => {
      item.addEventListener("click", () => {
        sizeButtons[checkedButton].classList.remove("check");
        item.classList.add("check");
        checkedButton = i;
      });
    });

    let ratingsInput = [...document.querySelectorAll(".star")];

    ratingsInput.map((star, index) => {
      star.addEventListener("click", () => {
        for (let i = 0; i < 5; i++) {
          if (i <= index) {
            ratingsInput[i].src = `/public/img/star-filled.png`;
          } else {
            ratingsInput[i].src = `/public/img/star.png`;
          }
        }
      });
    });

    const addToCartButtons = itemPage.querySelectorAll(".btn");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        let id = button.dataset.id;
        let alreadySelectedItem = cartBasket.find((item) => item.id === id);
        if (alreadySelectedItem) {
          button.innerText = "Added";
          button.disabled = true;
          // button.parentElement.parentElement.firstElementChild.innerText = "Added";
        }
        button.addEventListener("click", (event) => {
          event.target.innerText = "Added";
          event.target.disabled = true;
          // event.target.parentElement.parentElement.firstElementChild.innerText = "In Cart"
          //get item from products
          let selectedItem = { ...Storage.getProduct(id), amount: 1 };

          //add item to cart
          cartBasket = [...cartBasket, selectedItem];

          //save in local storage
          Storage.saveCart(cartBasket);

          //set cart values
          this.setCartItemValues(cartBasket);

          //display cart item
          this.addCartItemToCart(selectedItem);

          //show the cart overlay
          // this.displayCartOverlay();
        });
      });
    });
  }
  getAddToCartBtns() {
    const addToCartButtons = [...document.querySelectorAll(".proCart")];
    addButtons = addToCartButtons;
    addToCartButtons.forEach((button) => {
      let id = button.dataset.id;
      let alreadySelectedItem = cartBasket.find((item) => item.id === id);
      if (alreadySelectedItem) {
        button.innerText = "Added";
        button.disabled = true;
        // button.parentElement.parentElement.firstElementChild.innerText = "Added";
      }
      button.addEventListener("click", (event) => {
        event.target.innerText = "Added";
        event.target.disabled = true;
        // event.target.parentElement.parentElement.firstElementChild.innerText = "In Cart"
        //get item from products
        let selectedItem = { ...Storage.getProduct(id), amount: 1 };

        //add item to cart
        cartBasket = [...cartBasket, selectedItem];

        //save in local storage
        Storage.saveCart(cartBasket);

        //set cart values
        this.setCartItemValues(cartBasket);

        //display cart item
        this.addCartItemToCart(selectedItem);

        //show the cart overlay
        // this.displayCartOverlay();
      });
    });
  }

  setCartItemValues(cartBasket) {
    let itemTotal = 0;
    let itemsTotal = 0;
    cartBasket.map((item) => {
      itemTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(itemTotal.toFixed(2));
    cartItemsQuantity.innerText = itemsTotal;
    mobileItemsQuantity.innerText = itemsTotal;
  }
  addCartItemToCart(item) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cartItem");
    itemDiv.innerHTML = `
     <img src=${item.image} alt="">          
     <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
        <ion-icon class="removeItem" data-id = ${item.id} name="trash-outline"></ion-icon>
        <div class="stars">
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
            </div>
     </div>
     <div>
      <ion-icon class="upBtn" name="caret-up-outline" data-id = ${item.id}></ion-icon>
      <p class="itemAmount">${item.amount}</p>
      <ion-icon class="downBtn" name="caret-down-outline" data-id = ${item.id}></ion-icon>
     </div>
     `;
    overlayCartContent.appendChild(itemDiv);
  }

  displayCartOverlay() {
    cartOverlay.classList.add("transparentBack");
    cartArea.classList.add("showCart");
  }
  setApplication() {
    cartBasket = Storage.getItemsFromCart();
    this.setCartItemValues(cartBasket);
    this.populateCart(cartBasket);
    closeCartBtn.addEventListener("click", this.hideCart);
  }
  populateCart(cartBasket) {
    cartBasket.forEach((item) => this.addCartItemToCart(item));
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBack");
    cartArea.classList.remove("showCart");
  }
  cartLogic() {
    ClearCartBtn.addEventListener("click", () => {
      this.clearCartBasket();
    });
    // cart functionality
    overlayCartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("removeItem")) {
        let removeFromBasket = event.target;
        let id = removeFromBasket.dataset.id;
        overlayCartContent.removeChild(
          removeFromBasket.parentElement.parentElement
        );
        this.removeItem(id);
      } else if (event.target.classList.contains("upBtn")) {
        let addUpToBasket = event.target;
        let id = addUpToBasket.dataset.id;
        let itemTotal = cartBasket.find((item) => item.id === id);
        itemTotal.amount = itemTotal.amount + 1;
        Storage.saveCart(cartBasket);
        this.setCartItemValues(cartBasket);
        addUpToBasket.nextElementSibling.innerText = itemTotal.amount;
      } else if (event.target.classList.contains("downBtn")) {
        let takeOutOfBasket = event.target;
        let id = takeOutOfBasket.dataset.id;
        let itemTotal = cartBasket.find((item) => item.id === id);
        itemTotal.amount = itemTotal.amount - 1;
        if (itemTotal.amount > 0) {
          Storage.saveCart(cartBasket);
          this.setCartItemValues(cartBasket);
          takeOutOfBasket.previousElementSibling.innerText = itemTotal.amount;
        } else {
          overlayCartContent.removeChild(
            takeOutOfBasket.parentElement.parentElement
          );
          this.removeItem(id);
        }
      }
    });
  }

  clearCartBasket() {
    let selectedItems = cartBasket.map((item) => item.id);
    selectedItems.forEach((id) => this.removeItem(id));

    while (overlayCartContent.children.length > 0) {
      overlayCartContent.removeChild(overlayCartContent.children[0]);
    }
    this.hideCart();
  }
  removeItem(id) {
    cartBasket = cartBasket.filter((item) => item.id !== id);
    this.setCartItemValues(cartBasket);
    Storage.saveCart(cartBasket);
    let button = this.getOneButton(id);
    // button.disabled = false;
    button.innerHTML = `Buy`;
  }
  getOneButton(id) {
    return addButtons.find((button) => button.dataset.id === id);
  }
}

//saving cart items to local storage
class Storage {
  static saveCartItems(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cartBasket) {
    localStorage.setItem("cartBasket", JSON.stringify(cartBasket));
  }

  static getItemsFromCart() {
    return localStorage.getItem("cartBasket")
      ? JSON.parse(localStorage.getItem("cartBasket"))
      : [];
  }
}

// DOM load event
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // application setup
  ui.setApplication();
  //get product items
  products
    .getProducts()
    .then((products) => {
      ui.loadAllproducts(products);
      Storage.saveCartItems(products);
    })
    .then(() => {
      ui.getAddToCartBtns();
      ui.cartLogic();
    });
});
