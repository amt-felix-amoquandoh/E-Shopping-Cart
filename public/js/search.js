let searchButton = document.querySelector("#searchbutton");
let searchBox = document.querySelector("#searchinput");

searchButton.addEventListener("click", () =>{
    if(searchBox.value.length){
        location.href = `../../search/${searchBox.value}`;
    }
})

const searchKey = decodeURI(location.pathname.split("./").pop());