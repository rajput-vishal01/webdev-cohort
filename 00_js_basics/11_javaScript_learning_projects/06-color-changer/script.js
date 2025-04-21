var rect = document.querySelector("#center");

rect.addEventListener("mousemove", function (mouseloc) {
  var rectanglelocation = rect.getBoundingClientRect();
  var location = mouseloc.clientX - rectanglelocation.left;

  if (location < rectanglelocation.width / 2) {
    var redColor = gsap.utils.mapRange(
      0,
      rectanglelocation.width / 2,
      255,
      0,
      location
    );
    gsap.to(rect, {
      backgroundColor: `rgb(${redColor},0,0)`,
      ease: "power4",
    });
  } else {
    var blueColor = gsap.utils.mapRange(
        rectanglelocation.width / 2,
        rectanglelocation.width,
        0,
        255,
        location
      );
      gsap.to(rect, {
        backgroundColor: `rgb(0,0,${blueColor})`,
        ease: "power4",
      });
  }
});

rect.addEventListener("mouseleave",function(){
    gsap.to(rect, {
        backgroundColor:'white',
        ease: "power4",})
    
})
