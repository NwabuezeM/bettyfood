const searchBar = document.querySelector(".fa-search");
const closeForm = document.getElementById("close-form");
const searchForm = document.getElementById("search-form");
const hamburger = document.querySelector('.icons .fa-bars');
const navBar = document.querySelector('header .navbar');

hamburger.addEventListener("click", () =>{
  hamburger.classList.toggle('fa-times');
  navBar.classList.toggle('show-menu');
})

document.addEventListener('click', (e) => {
  if (e.target !== hamburger && e.target !== navBar) {
    navBar.classList.remove('show-menu');
    navBar.classList.add('hide-menu');
    hamburger.classList.remove('fa-times');
    hamburger.classList.add('fa-bars');
  }
});

searchBar.addEventListener("click", () => {
    searchForm.classList.toggle("show-form")
});

closeForm.addEventListener("click", () => {
    searchForm.classList.remove("show-form");
});

var swiper = new Swiper(".container", {
    spaceBetween: 30,
    slidesOffsetBefore: 50,
    centeredSlides: true,
    autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    },
    pauseOnMouseEnter: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
  });

// Dishes list starts
let dishes = null;
fetch('dishes.json')
  .then(response => response.json())
  .then(data => {
    dishes = data;
    addDataToHTML();
  });

let dishContainer = document.querySelector('.dishes-container');
function addDataToHTML() {
  dishes.forEach(dish => {
    let newDish = document.createElement('div');
    newDish.classList.add('dish');

    // Modify the description if it exceeds 80 characters
    let description = dish.description;
    if (description.length > 80) {
      description = description.substring(0, 80) + '...';
    }

    newDish.innerHTML = `
      <a href="#" class="fas fa-heart"></a>
      <a href="#" class="fas fa-eye"></a>
      <div class="text-center">
        <a href="${'/details.html?id=' + dish.id}">
          <img src="${dish.image}" alt="${dish['alt text']}" class="img-fluid rounded">
      </div>
      <h3>${dish.name}</h3>
      </a>
      <p class="description">${description}</p>
      <div class="rating text-center">${dish.rating.join('')}</div>
      <div class="order text-center mt-3">
        <span>&#x20A6;${dish.price}</span>
        <a href="#" class="btn">Add To Cart</a>
      </div>
    `;
    dishContainer.appendChild(newDish);
  });
}