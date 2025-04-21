document.addEventListener("DOMContentLoaded", () => {
  fetch('cars.json')
    .then(response => response.json())
    .then(data => generateCards(data));
});

function generateCards(cars) {
  const collectionsGrid = document.querySelector('.collections-grid');
  cars.forEach(car => {
    const card = document.createElement('div');
    card.innerHTML = `
      <div class="collection-card" id="${car.id}">
        <img src="${car.img}" alt="${car.name}" class="collection-img">
        <div class="collection-content">
          <h3>${car.name}</h3>
          <p class="intro">${car.intro}</p>
          <div class="more-info">
            <p>${car.details}</p>
          </div>
          <div class="card-buttons">
            <button class="view-more" onclick="toggleMoreInfo('${car.id}')">View More</button>
            <button class="buy-now" >Buy</button>
          </div>
        </div>
      </div>
    `;
    collectionsGrid.appendChild(card);
  });
}

function toggleMoreInfo(cardId) {
  const card = document.getElementById(cardId);
  const moreInfo = card.querySelector('.more-info');
  moreInfo.classList.toggle('show');
}



document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signupButton");
  const signupModal = document.getElementById("signupModal");
  const loginToggle = document.getElementById("loginToggle");
  const signupToggle = document.getElementById("signupToggle");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const closeModal = document.querySelector(".auth-container");

  signupButton.addEventListener("click", () => {
    signupModal.classList.toggle("hidden");
    document.body.classList.toggle("blur-background");
  });

  loginToggle.addEventListener("click", () => {
    loginToggle.classList.add("active");
    signupToggle.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  });

  signupToggle.addEventListener("click", () => {
    signupToggle.classList.add("active");
    loginToggle.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  });

  signupModal.addEventListener("click", (e) => {
    if (e.target === signupModal) {
      signupModal.classList.add("hidden");
      document.body.classList.remove("blur-background");
    }
  });
});



//  blur if viewport is less than 500px
window.onload = function() {
  if (window.innerWidth < 500) {
      document.getElementById('message').style.display = 'block';
      document.getElementsByClassName('container').classList.add('blur');
  }
};





