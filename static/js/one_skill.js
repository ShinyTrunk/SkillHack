
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

// let topics = document.querySelectorAll(".topic"); 
// let infWindow = document.querySelector(".links-information")
// topics.forEach((topic) => {
//     topic.onclick = function () {
//         text = topic.querySelector("span:nth-child(2)").textContent;
//         json.forEach((inf) => function () {
//             if (text == inf.title) {
//                 infWindow.querySelector("h2").textContent = inf.title;
//                 let infUl = infWindow.querySelector("ul");
//                 links = inf.links;
//                 links.forEach((link) => {
//                     let a = document.createElement("a");
//                     a.textContent = link;
//                     a.href = link;
//                     let li = document.createElement("li");
//                     li.appendChild(a);


//                 })
//             }
//         })
//     }
// })