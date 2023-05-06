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

let url = "/mainProducts.json";
let productsArea = document.getElementsByClassName("mainProArea")[0];

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item, index) => {
      const { title, price, description, category, briefing } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      // const image1 = item.fields.image.fields.file1.url;
      // const image2 = item.fields.image.fields.file2.url;
      // const image3 = item.fields.image.fields.file3.url;

      let card = document.createElement("a");
      card.classList.add("itemCard");
      card.innerHTML = `
        <img src=${image} alt="">
        <h5 class="cardTitle" title="African Print Dress">${title}</h5>
        <p>${description}</p>
        <div class="itemPrice">
          <h5>$${price}</h5>
        </div>
        <div class="colorTag">
          <div class="stars">
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </div>
          <button class="proCart" data-id=${id}>Buy</button>
        </div>
      `;
      productsArea.appendChild(card);

      const modalContainer = document.getElementById("modal");
      const closeModalBtn = document.querySelector("#close-modal-btn");

      card.addEventListener("click", () => {
        modalContainer.classList.add("show-modal");

        closeModalBtn.addEventListener("click", () => {
          modalContainer.classList.remove("show-modal");
          itemPage.remove();
        });
        // create a new page to display the product details
        let itemPage = document.createElement("div");
        itemPage.classList.add("productInfo");

        itemPage.innerHTML = `
        
          <div class="imageSlider">
          <h4 class="selectImage">Select image file below to view</h4>
            <div class="productImages">
                <img src=${image} alt="">
                <img src=${image} alt="">
                <img src=${image} alt="">
                <img src=${image} alt="">
            </div>
        </div>
        <div class="ItemDetails">
            <h2 class="productBrand">${title}</h2>
            <h4 class="itemDescription"><b>${description}</b></h4>
            <p class="itemDescription">${briefing}</p>
            <span class="itemPrice">$${price}</span>
           
            <span class="itemDiscount">( 50% Off )</span>

           
              <div class="rating">
                <img src="./public/img/star-filled.png" class="star" alt="">
                <img src="./public/img/star-filled.png" class="star" alt="">
                <img src="./public/img/star-filled.png" class="star" alt="">
                <img src="./public/img/star-filled.png" class="star" alt="">
                <img src="./public/img/star.png" class="star" alt="">
             </div>

            <p class="subHeading">Select Size</p>
            <input type="radio" name="size" value="xs" checked hidden id="sSize">
            <label for="sSize" class="sizeRadioBtn check">xs</label>
            <input type="radio" name="size" value="s" checked hidden id="sSize">
            <label for="sSize" class="sizeRadioBtn check">s</label>
            <input type="radio" name="size" value="m" hidden id="mSize">
            <label for="mSize" class="sizeRadioBtn">m</label>
            <input type="radio" name="size" value="l" hidden id="lSize">
            <label for="lSize" class="sizeRadioBtn">l</label>
            <input type="radio" name="size" value="xl" hidden id="xlSize">
            <label for="xlSize" class="sizeRadioBtn">xl</label>
            <input type="radio" name="size" value="xxl" hidden id="xxlSize">
            <label for="xxlSize" class="sizeRadioBtn">xxl</label>
            <button class="btn cartButton proCart" data-id=${id}>Add to Cart</button>
        </div>
    
        `;

        // Append the itemPage element to the container element
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
      });
    });
  });

//   let durationButton = document.getElementById("durationSortBtn");
// let durationOptions = document.getElementsByClassName("sortOptions")[0];

// durationButton.addEventListener("click", ()=>{
//     durationOptions.classList.toggle("sortOptions_active")
// })

// let newUploads = document.getElementById("newest");
// let allProducts = document.getElementById("allProducts");
// let lowestPrice = document.getElementById("lowPrice");
// let highestPrice = document.getElementById("trendy");

// let url = "mainProducts.json";
// let productsArea = document.getElementsByClassName("mainProArea")[0];

// fetch(url).then((Response => Response.json())).then((data) => {
//     const allProductsArray = [...data];
//     const newProductsArray = [...data].splice(8, 12);
//     const lowestPriceProductsArray = [...data];
//     const highestPriceArray = [...data];

//     // data.forEach((item, index) => {
//     //     const {title, price, description, category} = item.fields;
//     //     const {id} = item.sys;
//     //     const image = item.fields.image.fields.file.url;

//     //     let card = document.createElement("a");
//     //     card.classList.add("itemCard")
//     //     card.innerHTML = `
//     //     <img src=${image} alt="">
//     //   <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//     //   <p>${description}</p>
//     //   <div class="itemPrice">
//     //       <h5>$${price}</h5>
//     //   </div>
//     //   <div class="colorTag">
//     //   <div class="stars">
//     //   <ion-icon name="star"></ion-icon>
//     //   <ion-icon name="star"></ion-icon>
//     //   <ion-icon name="star"></ion-icon>
//     //   <ion-icon name="star"></ion-icon>
//     //   <ion-icon name="star"></ion-icon>
//     // </div>
//     //       <button class="proCart" data-id = ${id}>Buy</button>
//     //   </div>
//     //     `;
//     //     productsArea.appendChild(card);
//     // });

//     newUploads.addEventListener("click", () => {
//         productsArea.innerHTML = "";
//         durationButton.innerHTML = `
//         <h5>Sort By: Newest</h5>
//         <ion-icon name="chevron-down-outline"></ion-icon>
//         `;
//         durationOptions.classList.toggle("sortOptions_active");

//         newProductsArray.forEach((item, index) => {
//             const {title, price, description, category} = item.fields;
//             const {id} = item.sys;
//             const image = item.fields.image.fields.file.url;

//             let card = document.createElement("a");
//             card.classList.add("itemCard")
//             card.innerHTML = `
//             <img src=${image} alt="">
//           <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//           <p>${description}</p>
//           <div class="itemPrice">
//               <h5>$${price}</h5>
//           </div>
//           <div class="colorTag">
//           <div class="stars">
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//         </div>
//               <button class="proCart" data-id = ${id}>Buy</button>
//           </div>
//             `;
//             productsArea.appendChild(card);
//         });

//     })

//     allProducts.addEventListener("click", () => {
//         productsArea.innerHTML = "";
//         durationButton.innerHTML = `
//         <h5>Sort By: All Products</h5>
//         <ion-icon name="chevron-down-outline"></ion-icon>
//         `;
//         durationOptions.classList.toggle("sortOptions_active");

//         allProductsArray.forEach((item, index) => {
//             const {title, price, description, category} = item.fields;
//             const {id} = item.sys;
//             const image = item.fields.image.fields.file.url;

//             let card = document.createElement("a");
//             card.classList.add("itemCard")
//             card.innerHTML = `
//             <img src=${image} alt="">
//           <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//           <p>${description}</p>
//           <div class="itemPrice">
//               <h5>$${price}</h5>
//           </div>
//           <div class="colorTag">
//           <div class="stars">
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//         </div>
//               <button class="proCart" data-id = ${id}>Buy</button>
//           </div>
//             `;
//             productsArea.appendChild(card);
//         });

//     });

//     lowestPrice.addEventListener("click", () => {
//         productsArea.innerHTML = "";
//         durationButton.innerHTML = `
//         <h5>Sort By: Lowest Prices</h5>
//         <ion-icon name="chevron-down-outline"></ion-icon>
//         `;
//         durationOptions.classList.toggle("sortOptions_active");

//         lowestPriceProductsArray.sort((a, b) => a.fields.price - b.fields.price);

//         lowestPriceProductsArray.forEach((item, index) => {
//             const {title, price, description, category} = item.fields;
//             const {id} = item.sys;
//             const image = item.fields.image.fields.file.url;

//             let card = document.createElement("a");
//             card.classList.add("itemCard")
//             card.innerHTML = `
//             <img src=${image} alt="">
//           <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//           <p>${description}</p>
//           <div class="itemPrice">
//               <h5>$${price}</h5>
//           </div>
//           <div class="colorTag">
//           <div class="stars">
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//         </div>
//               <button class="proCart" data-id = ${id}>Buy</button>
//           </div>
//             `;
//             productsArea.appendChild(card);
//         });

//     })

//     highestPrice.addEventListener("click", () => {
//         productsArea.innerHTML = "";
//         durationButton.innerHTML = `
//         <h5>Sort By: Highest Prices</h5>
//         <ion-icon name="chevron-down-outline"></ion-icon>
//         `;
//         durationOptions.classList.toggle("sortOptions_active");

//         highestPriceArray.sort((a, b) => b.fields.price - a.fields.price);

//         highestPriceArray.forEach((item, index) => {
//             const {title, price, description, category} = item.fields;
//             const {id} = item.sys;
//             const image = item.fields.image.fields.file.url;

//             let card = document.createElement("a");
//             card.classList.add("itemCard")
//             card.innerHTML = `
//             <img src=${image} alt="">
//           <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//           <p>${description}</p>
//           <div class="itemPrice">
//               <h5>$${price}</h5>
//           </div>
//           <div class="colorTag">
//           <div class="stars">
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//           <ion-icon name="star"></ion-icon>
//         </div>
//               <button class="proCart" data-id = ${id}>Buy</button>
//           </div>
//             `;
//             productsArea.appendChild(card);
//         });

//     })

//     //clothing only
//     let clothingProducts = allProductsArray.filter((item)=>{
//         return item.sys.id === "clothes"
//     })

//     let AllFilteredProducts = [];
//     let clothesOnly = document.getElementById("clothes");

//     clothesOnly.addEventListener("click", () => {
//         if (clothesOnly.title === "clothesOn"){
//             productsArea.innerHTML = "";
//             clothesOnly.classList.toggle("i_active");
//             clothesOnly.classList.toggle("bi-toggle2-off");
//             clothesOnly.classList.toggle("bi-toggle2-on");
//             clothesOnly.title = "clothesOff";
//             AllFilteredProducts = AllFilteredProducts.concat(clothingProducts);

//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         } else{
//             productsArea.innerHTML = "";
//             clothesOnly.classList.toggle("i_active");
//             clothesOnly.classList.toggle("bi-toggle2-off");
//             clothesOnly.classList.toggle("bi-toggle2-on");
//             clothesOnly.title = "clothesOn";
//             AllFilteredProducts = AllFilteredProducts.filter((item) =>{
//                 return clothingProducts.indexOf(item) < 0;
//             })
//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         }
//     })

//     //accessories only
//     let accessoriesProducts = allProductsArray.filter((item)=>{
//         return item.sys.id === "accessories"
//     })

//     let accessoriesOnly = document.getElementById("accessories");

//     accessoriesOnly.addEventListener("click", () => {
//         if (accessoriesOnly.title === "accessoriesOn"){
//             productsArea.innerHTML = "";
//             accessoriesOnly.classList.toggle("i_active");
//             accessoriesOnly.classList.toggle("bi-toggle2-off");
//             accessoriesOnly.classList.toggle("bi-toggle2-on");
//             accessoriesOnly.title = "accessoriesOff";
//             AllFilteredProducts = AllFilteredProducts.concat(accessoriesProducts);

//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         } else{
//             productsArea.innerHTML = "";
//             accessoriesOnly.classList.toggle("i_active");
//             accessoriesOnly.classList.toggle("bi-toggle2-off");
//             accessoriesOnly.classList.toggle("bi-toggle2-on");
//             accessoriesOnly.title = "accessoriesOn";
//             AllFilteredProducts = AllFilteredProducts.filter((item) =>{
//                 return accessoriesProducts.indexOf(item) < 0;
//             })
//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         }
//     });

//     //sports only
//     let sportsProducts = allProductsArray.filter((item)=>{
//         return item.sys.id === "sportwear"
//     })

//     let sportsOnly = document.getElementById("sports");

//     sportsOnly.addEventListener("click", () => {
//         if (sportsOnly.title === "sportsOn"){
//             productsArea.innerHTML = "";
//             sportsOnly.classList.toggle("i_active");
//             sportsOnly.classList.toggle("bi-toggle2-off");
//             sportsOnly.classList.toggle("bi-toggle2-on");
//             sportsOnly.title = "sportsOff";
//             AllFilteredProducts = AllFilteredProducts.concat(sportsProducts);

//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         } else{
//             productsArea.innerHTML = "";
//             sportsOnly.classList.toggle("i_active");
//             sportsOnly.classList.toggle("bi-toggle2-off");
//             sportsOnly.classList.toggle("bi-toggle2-on");
//             sportsOnly.title = "sportsOn";
//             AllFilteredProducts = AllFilteredProducts.filter((item) =>{
//                 return sportsProducts.indexOf(item) < 0;
//             })
//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         }
//     });

//     //lingerie only
//     let lingerieProducts = allProductsArray.filter((item)=>{
//         return item.sys.id === "lingerie"
//     })

//     let lingerieOnly = document.getElementById("lingerie");

//     lingerieOnly.addEventListener("click", () => {
//         if (lingerieOnly.title === "lingerieOn"){
//             productsArea.innerHTML = "";
//             lingerieOnly.classList.toggle("i_active");
//             lingerieOnly.classList.toggle("bi-toggle2-off");
//             lingerieOnly.classList.toggle("bi-toggle2-on");
//             lingerieOnly.title = "lingerieOff";
//             AllFilteredProducts = AllFilteredProducts.concat(lingerieProducts);

//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         } else{
//             productsArea.innerHTML = "";
//             lingerieOnly.classList.toggle("i_active");
//             lingerieOnly.classList.toggle("bi-toggle2-off");
//             lingerieOnly.classList.toggle("bi-toggle2-on");
//             lingerieOnly.title = "lingerieOn";
//             AllFilteredProducts = AllFilteredProducts.filter((item) =>{
//                 return lingerieProducts.indexOf(item) < 0;
//             })
//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         }
//     });

//     //pillow cases only
//     let pillowProducts = allProductsArray.filter((item)=>{
//         return item.sys.id === "pillow"
//     })

//     let pillowOnly = document.getElementById("pillowcases");

//     pillowOnly.addEventListener("click", () => {
//         if (pillowOnly.title === "pillowOn"){
//             productsArea.innerHTML = "";
//             pillowOnly.classList.toggle("i_active");
//             pillowOnly.classList.toggle("bi-toggle2-off");
//             pillowOnly.classList.toggle("bi-toggle2-on");
//             pillowOnly.title = "pillowOff";
//             AllFilteredProducts = AllFilteredProducts.concat(pillowProducts);

//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         } else{
//             productsArea.innerHTML = "";
//             pillowOnly.classList.toggle("i_active");
//             pillowOnly.classList.toggle("bi-toggle2-off");
//             pillowOnly.classList.toggle("bi-toggle2-on");
//             pillowOnly.title = "pillowOn";
//             AllFilteredProducts = AllFilteredProducts.filter((item) =>{
//                 return pillowProducts.indexOf(item) < 0;
//             })
//             AllFilteredProducts.forEach((item, index) => {
//                 const {title, price, description, category} = item.fields;
//                 const {id} = item.sys;
//                 const image = item.fields.image.fields.file.url;

//                 let card = document.createElement("a");
//                 card.classList.add("itemCard")
//                 card.innerHTML = `
//                 <img src=${image} alt="">
//               <h5 class="cardTitle" title="African Print Dress">${title}</h5>
//               <p>${description}</p>
//               <div class="itemPrice">
//                   <h5>$${price}</h5>
//               </div>
//               <div class="colorTag">
//               <div class="stars">
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//               <ion-icon name="star"></ion-icon>
//             </div>
//                   <button class="proCart" data-id = ${id}>Buy</button>
//               </div>
//                 `;
//                 productsArea.appendChild(card);
//             });
//         }
//     });

// })
