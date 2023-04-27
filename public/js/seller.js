window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);

    if (user == null) {
        location.replace("../../login.html")        
    } else if(user.seller){
        location.replace("../../dashboard.html")
    }
}

let loading = document.querySelector(".loader");
let applyBtn = document.querySelector(".submitButton")

const showFormError = (err) => {
    let errorElement = document.querySelector(".error");
    errorElement.innerHTML = err;
    errorElement.classList.add("show")
}

const sendData = (path, data) => {
    console.log(data);
    fetch(path, {
        method:"post",
        headers: new Headers({"Content-Type": "application/json"}),
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => processData(data))
}

const processData = (data) => {
    loading.style.display = "none";
    if (data.alert) {
        showFormError(data.alert);            
    } else if (data.name) {
        sessionStorage.user = JSON.stringify(data);
        location.replace("/../index.html");     
    }else if (data.seller) {
       let user = JSON.parse(sessionStorage.user);
       user.seller = true;
       sessionStorage.user = JSON.stringify(user);
       location.replace("/../dashboard.html");
    }
}

applyBtn.addEventListener("click", () => {
let businessName = document.querySelector("#businessName").value;
let address = document.querySelector("#addBusiness").value;
let about = document.querySelector("#about").value;
let number = document.querySelector("#number").value; 

if(!businessName.length || !address.length || !about.length || number.length < 10 || !Number(number) ){
    showFormError("some information(s) is/are incorrect")
}else{
    loading.style.display = "block";
    sendData("/seller", {
        name: businessName,
        address: address,
        about: about,
        number: number,
        email: JSON.parse(sessionStorage.user).email
    })
}
})
 