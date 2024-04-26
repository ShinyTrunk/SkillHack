
element = document.querySelector(".road-section");
function horizontalScroll(element) {
    
    element.addEventListener('wheel', function (event) {
        if (event.deltaY > 0){
            element.scrollLeft += event.deltaY + 200;
            event.preventDefault();
        }
        else if (event.deltaY < 0) {
            element.scrollLeft += event.deltaY - 200;
            event.preventDefault();
        }
      
    });
  }
  horizontalScroll(element);

let topics = document.querySelectorAll(".topic");
let infWindow = document.querySelectorAll(".links-information")
topics.forEach((topic) => {
    topic.onclick = function () {
        let text = topic.querySelector("span:nth-child(2)").textContent;
        infWindow.forEach((window) => {
            let h2 = window.querySelector("h2");
            if (!window.classList.contains("hidden")) {
                window.classList.add("hidden");
            }
            if (text == h2.textContent) {
                window.classList.toggle("hidden");
            }
        })
    }
})