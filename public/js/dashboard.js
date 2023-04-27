let user = JSON.parse(sessionStorage.user || null)

if (user == null) {
    location.replace("../../login.html")   
}else if (!user.seller) {
    location.replace("../../seller.html")    
}

let greeting = document.querySelector("#sellerGreeting");
greeting.innerHTML += user.name