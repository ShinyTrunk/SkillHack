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

// message 
let messageDiv = document.querySelector(".message");
messageDiv.addEventListener('click', function (event){
    let target = event.target;
    console.log(target);
    target.classList.add("deleted");
});

let test = document.querySelector("#username");
console.log(test.message)










