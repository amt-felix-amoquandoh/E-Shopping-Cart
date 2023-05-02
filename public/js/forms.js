let submitForm = document.querySelector(".submitButton");
let loading = document.querySelector(".loader");

window.onload = () => {
    
    if (sessionStorage.user) {
        let user = JSON.parse(sessionStorage.user);
        if (user.email) {
            location.replace("/../index.html");              
        }        
    }
}


submitForm.addEventListener("click", () => {
    let fullName = document.querySelector("#name") || null;
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let number = document.querySelector("#number") || null;
    let termsAndConditions = document.querySelector("#termsAndConditions") || null;
     
    if(fullName != null){
         //form validation
    if (fullName.value.length < 3) {
        showFormError("name must be 3 letters")     
    } else if (!email.value.length) {
        showFormError("enter your email");        
    } else if (password.value.length < 8) {
        showFormError("password must be 8 letters long")        
    } else if (Number(number) || number.value.length < 10) {
        showFormError("invalid number, please enter valid one")        
    }else if (!termsAndConditions.checked) {
        showFormError("you must agree to our terms and conditions")        
    }else{
        //submit form
        loading.style.display = "block";
        sendData("/signup", {
            name: fullName.value,
            email: email.value,
            password: password.value,
            number: number.value,
            termsAndConditions: termsAndConditions.checked
        })
    }
    }  else{
        if(!email.value.length || !password.value.length){
            showFormError("fill in all inputs");
        } else{
             //submit form
        loading.style.display = "block";
        sendData("/login", {
            email: email.value,
            password: password.value,
        })
        }
    }
})



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
    } else if (data.email) {
        sessionStorage.user = JSON.stringify(data);
        if(location.search.includes("after")){
            let pageId = location.search.split("=")[1];
            location.replace(`./products/${pageId}`)
        }   else{
            location.replace("/")
        }
    }
}