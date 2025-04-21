window.addEventListener("mousemove", function (details) {
  let rect = document.querySelector("#rectangle");
  let xval = gsap.utils.mapRange(
    0,
    window.innerWidth,
    100 + rect.getBoundingClientRect().width / 2,
    window.innerWidth - (100 + rect.getBoundingClientRect().width / 2),
    details.clientX
  );
  gsap.to("#rectangle", {
    left: xval + "px",

    ease: Power3,
  });
});
