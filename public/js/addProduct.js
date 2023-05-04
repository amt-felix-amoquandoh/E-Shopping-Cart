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
