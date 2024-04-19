// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>

// let personalDataP = document.querySelectorAll(".personal-data p");
let editButton = document.querySelector(".personal-data .edit-button");
let personalDataDiv = document.querySelectorAll(".personal-form div");
editButton.addEventListener("click", function () {
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let conPassword = document.querySelector("#confirm-passwor");

    let form = document.querySelector(".personal-form");
    let json = JSON.stringify({
        username: username.value,
        password: password.value,
        confirm_password: conPassword.value
    });

    console.log(formData)
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/validate_profile", false);
    xhr.send(json);
    // xhr.onload = function () {
    //     if (xhr.status == "error") {
            
    //     }
    // }



    let personalName = document.querySelector(".personal-form  div:nth-child(1)");
    let personalPas = document.querySelectorAll(".personal-form div:nth-child(n + 3)");
    if (this.classList.contains("save-button")) {
        // console.log(personalName.querySelector("input"))
        let pName = personalName.querySelector("p");
        let inputName = personalName.querySelector("input");
        pName.textContent = inputName.value;
        pName.classList.toggle("hidden");
        inputName.classList.toggle("hidden");
        personalPas.forEach((div) => {
            pasInput = div.querySelector("input");
            pasSpan = div.querySelector("span");
            pasInput.classList.toggle("hidden");
            pasSpan.classList.toggle("hidden");

        });
        editButton.textContent = "РЕДАКТИРОВАТЬ";
    }
    else {


        let personalName = document.querySelector(".personal-form div:nth-child(1)");
        let personalPas = document.querySelectorAll(".personal-form div:nth-child(n + 3)");

        let pName = personalName.querySelector("p");
        let inputName = personalName.querySelector("input");
        inputName.value = pName.textContent;
        pName.classList.toggle("hidden");
        inputName.classList.toggle("hidden");
        personalPas.forEach((div) => {
            pasInput = div.querySelector("input");
            pasSpan = div.querySelector("span");
            pasInput.classList.toggle("hidden");
            pasSpan.classList.toggle("hidden");

        });

        editButton.textContent = "СОХРАНИТЬ ИЗМЕНЕНИЯ";
        editButton.classList.toggle("save-button");
    }
}
);






// прогресс 

let inners = document.querySelectorAll(".progress-inner");

inners.forEach((inner) => {
    let percent = parseFloat(inner.dataset.percent);
    // inner.removeChild("p");
    // let p = parseFloat(percent);
    let start = 0;
    let diff = percent / 100;
    let progressText = document.createElement("p");
    let timerId = setInterval(() => {
        start = start + diff;
        inner.style.width = start + "%";


        progressText.textContent = start.toFixed(1) + "%";
        inner.appendChild(progressText);

    }, 10);



    setTimeout(() => { clearInterval(timerId); }, 1000);

})
