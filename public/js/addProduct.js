let ratingsInput = [...document.querySelectorAll(".starRating")];

ratingsInput.map((star, index) => {
    star.addEventListener("click", () => {
        for(let i = 0; i < 5; i++){
            if(i <= index){
                ratingsInput[i].src = `/public/img/star-filled.png`
            }else{
                ratingsInput[i].src = `/public/img/star.png`
            }
        }
    })
})

let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
    if(user == null){
        location.replace("../../login.html")
    }
}

let editables = [...document.querySelectorAll("*[contenteditable='true']")];

editables.map((element) => {
    let placeholder = element.getAttribute("data-placeholder");
    element.innerHTML = placeholder;
    element.addEventListener("focus", () => {
        if(element.innerHTML === placeholder){
            element.innerHTML = "";
        }
    })
    element.addEventListener("focusout", () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder
        }
    })
})