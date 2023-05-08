const mobileMenu = document.getElementById("mobileMenu");
const navMenuItems = document.getElementById("navItems");
const navMenuClose = document.getElementById("mobileMenuClose");
const shopICon = document.querySelector(".mobileNav");
const shopBagde = document.querySelector(".cartBox");
const secondNav = document.querySelector(".secondHeader");
const logo = document.querySelector(".mobileLogo");

// Mobile and Tablet NAvbar implementation//
if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navMenuItems.classList.add("active");
    logo.classList.remove("hide");
    navMenuClose.style.display = "flex";
    mobileMenu.style.display = "none";
    shopICon.style.display = "none";
    shopBagde.style.display = "none";
  });
}

if (navMenuClose) {
  navMenuClose.addEventListener("click", () => {
    navMenuItems.classList.remove("active");
    mobileMenu.style.display = "flex";
    shopICon.style.display = "flex";
    logo.classList.add("hide");
  });
}

const userPlace = document.querySelector("#loginArea");
// const userPlaceMobile = document.querySelector("#userMobile");
const showOptions = document.querySelector(".loginPopUp");
const popUpText = document.querySelector(".accountInfo");
const loginActionBtn = document.querySelector("#userBtn");

userPlace.addEventListener("click", () => {
  showOptions.classList.toggle("hide");
});

window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    //already logged in
    popUpText.innerHTML = `User, <b><i>${user.name}!</i></b>`;
    loginActionBtn.innerHTML = "log out";
    loginActionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    //user logged out
    popUpText.innerHTML = "Log in to place order";
    loginActionBtn.innerHTML = "Log in";
    loginActionBtn.addEventListener("click", () => {
      location.href = "/login";
    });
  }
};

//search box
// let searchButton = document.querySelector(".searchBtn");
// let searchBox = document.querySelector(".searchInput");

// searchButton.addEventListener("click", () =>{
//     if(searchBox.ariaValueMax.length){
//         location.href = `../../search/${searchBox.value}`;
//     }
// })
