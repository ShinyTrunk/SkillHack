// изменение форму регистрации и авторизации


let registerSpan = document.querySelector(".authorization-toggler>span:first-child");
let logintSpan = document.querySelector(".authorization-toggler>span:last-child");
let registerForm = document.querySelector(".register-form");
let loginForm = document.querySelector(".login-form");

let formToggle = document.querySelector(".switch>input");


formToggle.addEventListener("change", function () {
    logintSpan.classList.toggle("active-span");
    registerSpan.classList.toggle("active-span");
    registerForm.classList.toggle("hidden");
    loginForm.classList.toggle("hidden");
})


// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>

let personalDataP = document.querySelectorAll(".personal-data p");
let editButton = document.querySelector(".personal-data .edit-button");







