// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>
// let personalDataP = document.querySelectorAll(".personal-data p");


let messageDiv = document.querySelector(".message");
messageDiv.addEventListener('click', function (event) {
    let target = event.target;
    // console.log(target);
    target.classList.add("deleted");
});

let editButton = document.querySelector(".personal-data .edit-button");

let personalDataDiv = document.querySelectorAll(".personal-form div");
editButton.addEventListener("click", function (event) {
    event.preventDefault();

    
    // xhr.onerror = function (e) {
    //     console.log(xhr.response);
    //     console.log('error');
    // }

    // console.log(formData)

    // xhr.onload = function () {
    //     if (xhr.status == "error") {

    //     }
    // }



    let personalName = document.querySelector(".personal-form  div:nth-child(1)");
    let personalPas = document.querySelectorAll(".personal-form div:nth-child(n + 3)");
    if (this.classList.contains("save-button")) {
        let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let conPassword = document.querySelector("#confirm-password");
    // let json = JSON.stringify({
    //     user
    // })
    let xhr = new XMLHttpRequest();
    let json = JSON.stringify({
        username: username.value,
        password: password.value,
        confirm_password: conPassword.value
    });
    xhr.open("POST", "/validate_profile");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.responseType = 'json';
    xhr.send(json);

    // xhr.onreadystatechange = (e) => {
    //     console.log(xhr.readyState)
    // }
    // let form = document.querySelector(".personal-form");
    console.log(xhr.statusText)
    xhr.onload = function (e) {
        // console.log(xhr.response);
        let resObj = xhr.response;
        // console.log(resObj);
        if (resObj.status == "error") {
            error_messages = resObj.messages
            console.log(error_messages);
            error_messages.forEach((mes) => {
                let p = document.createElement("p");
                p.textContent = mes;
                messageDiv.appendChild(p);

            })
        }
        else {
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
    }
        // console.log(personalName.querySelector("input"))
        
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






