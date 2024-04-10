// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>

let personalDataP = document.querySelectorAll(".personal-data p");
let editButton = document.querySelector(".personal-data .edit-button");



// прогресс 
let inners = document.querySelectorAll(".progress-inner");

inners.forEach((inner) => {
    let percent = inner.dataset.percent;
    let p = parseFloat(percent);
    let start = 0;
    let diff = p / 100;
    let timerId = setInterval(() => {
        start = start + diff;
        inner.style.width = start + "%";
    }, 10);


    setTimeout(() => { clearInterval(timerId); }, 1000);
})
