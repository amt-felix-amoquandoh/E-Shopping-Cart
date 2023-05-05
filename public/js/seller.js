let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", () => {
  durationOptions.classList.toggle("sortOptions_active");
});

let newUploads = document.getElementById("newest");
let allProducts = document.getElementById("allProducts");
let lowestPrice = document.getElementById("lowPrice");
let highestPrice = document.getElementById("highest");

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
  }
}
