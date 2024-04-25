
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

  