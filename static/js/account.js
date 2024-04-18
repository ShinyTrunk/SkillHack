// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>

// let personalDataP = document.querySelectorAll(".personal-data p");
let editButton = document.querySelector(".personal-data .edit-button");
let personalDataDiv = document.querySelectorAll(".personal-data>div");
editButton.addEventListener("click", function () {
    
    let personalName = document.querySelector(".personal-data div:nth-child(2)");
    let personalPas = document.querySelectorAll(".personal-data div:nth-child(n + 4)");
    if (this.classList.contains("edit-button")) {
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
        // let personalDataDiv = document.querySelectorAll(".personal-data>div ");
        let personalName = document.querySelector(".personal-data div:nth-child(2)");
        let personalPas = document.querySelectorAll(".personal-data div:nth-child(n + 4)");
        if (this.classList.contains("save-button")) {
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
        }
    }
});



    


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
