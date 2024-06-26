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