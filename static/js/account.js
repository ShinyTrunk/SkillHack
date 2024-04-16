// редактирование личных данных в аккаунте, надо <p> заменять на <input>, <a> на <submit>

let personalDataP = document.querySelectorAll(".personal-data p");
let editButton = document.querySelector(".personal-data .edit-button");
let personalDataDiv = document.querySelectorAll(".personal-data>div");
let personalDataInput = document.querySelectorAll('.personal-data input');
editButton.addEventListener("click", function () {
    if (this.classList.contains("save-button")) {
        this.classList.toggle("save-button");
        let validBoolean = true;
        personalDataDiv.forEach((div) => {

            dataP = div.querySelector('p');
            dataInput = div.querySelector('input');
            // console.log(dataP.textContent);
            if (!dataInput.checkValidity()) {
                validBoolean = dataInput.checkValidity();
            }

            console.log(validBoolean);
            // if (dataInput.type == )
            // console.log(dataInput.type);
            dataP.textContent = dataInput.value;
            dataInput.value = dataP.textContent;
            dataP.classList.toggle('hidden');
            dataInput.classList.toggle('hidden');
            // console.log(dataInput, dataP);
        })
        let inputPas = document.querySelector("input #pas");
        let inputTwicePas = document.querySelector("input #twice-pas");
        inputPas.classList.toggle('hidden');
        inputTwicePas.classList.toggle('hidden');
        // editButton.disabled = !validBoolean;
        // console.log(editButton.disabled);
        // if (!validBoolean) {
        //     editButton.setAttribute('disabled');
        // }
        // else {
        //     editButton.toggleAttribute('disabled');
        // }
        editButton.textContent = "РЕДАКТИРОВАТЬ";
    }
    else {
        this.classList.toggle("save-button");
        personalDataDiv.forEach((div) => {

            dataP = div.querySelector('p');
            dataInput = div.querySelector('input');
            // console.log(dataP.textContent);
            dataInput.value = dataP.textContent;
            dataP.classList.toggle('hidden');
            dataInput.classList.toggle('hidden');
            // console.log(dataInput, dataP);
        })
        let inputPas = document.querySelector("input #pas");
        let inputTwicePas = document.querySelector("input #twice-pas");
        inputPas.classList.toggle('hidden');
        inputTwicePas.classList.toggle('hidden');
        editButton.textContent = "СОХРАНИТЬ ИЗМЕНЕНИЯ";
    }

})


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
