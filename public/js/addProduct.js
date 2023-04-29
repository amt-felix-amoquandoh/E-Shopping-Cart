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


let uploadImages = [...document.querySelectorAll(".fileUpload")];
let imagePaths = [];

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener("change", () => {
        const file = fileupload.files[0];
        let imageUrl;

        if(file.type.includes("image")){
            fetch("/s3url").then(res => res.json())
            .then(url => {
                fetch(url, {
                    method: "PUT",
                    headers: new Headers({"Content-Type": "multipart/form-data"}),
                    body: file
                }).then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] = imageUrl;
                    let label = document.querySelector(`label[for=${fileupload.id}]`);
                    label.style.backroundImage = `url(${imageUrl})`;
                    let productImage = document.querySelector(".productImage");
                    productImage.style.backroundImage = `url(${imageUrl})`
                })
            })
        }
    })
})