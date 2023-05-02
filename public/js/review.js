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