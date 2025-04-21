// document.querySelector("#center")
// .addEventListener("mousemove",function(dets){
//   console.log(dets.clientX,dets.clientY)
// })

const throttleFunc = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

document.querySelector("#center").addEventListener(
  "mousemove",
  throttleFunc((dets) => {
    var div = document.createElement("div");
    div.classList.add("imagediv");
    div.style.left = dets.clientX + "px";
    div.style.top = dets.clientY + "px";
    document.body.appendChild(div);

    var img = document.createElement("img");
    img.setAttribute("src", "./assets/1.jpeg");
    div.appendChild(img);

    gsap.to(img, {
      y: "0",
      ease: Power1,
      duration: 0.6,
    });

    gsap.to(img, {
      y: "100%",
      delay: 0.6,
      ease: Power2,
    });

    setTimeout(function () {
      div.remove();
    }, 1000);
  }, 500)
);
