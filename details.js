let dishes = null;

fetch('dishes.json')
  .then(response => response.json())
  .then(data => {
    dishes = data;
    showDetail();
  });

// Find this particular dish
function showDetail() {
  let detail = document.querySelector('.detail');
  let dishId = new URLSearchParams(window.location.search).get('id');
  let thisDish = dishes.filter(value => {
    return value.id == dishId;
  })[0];

  if (!thisDish) {
    window.location.href = '/';
  }

  // Set page title to product name
  document.title = thisDish.name;

  detail.querySelector('.image img').src = thisDish.image;
  detail.querySelector('.name').innerText = thisDish.name;
  detail.querySelector('.price').innerText = '₦' + thisDish.price;
  detail.querySelector('.description').innerText = thisDish.description;
  detail.querySelector('.rating').innerHTML = thisDish.rating.join('');

  // Get similar dishes randomly
  let similarDishes = document.querySelector('.listDishes');
  let randomDishes = getRandomDishes(6, dishId);
  randomDishes.forEach(dish => {
    let newDish = document.createElement('div');
    newDish.classList.add('dish');
    newDish.innerHTML = `
      <a href="#" class="fas fa-heart"></a>
      <a href="#" class="fas fa-eye"></a>
      <div class="text-center">
        <a href="/details.html?id=${dish.id}">
          <img src="${dish.image}" alt="${dish['alt text']}" class="img-fluid rounded">
        </a>
      </div>
      <h3>${dish.name}</h3>
      <div class="rating text-center">${dish.rating.join('')}</div>
      <div class="order text-center mt-3">
        <span>&#x20A6;${dish.price}</span>
        <a href="#" class="btn">Add To Cart</a>
      </div>
    `;
    similarDishes.appendChild(newDish);
  });
}

// Helper function to get random dishes excluding the current dish
function getRandomDishes(count, excludedId) {
  let randomDishes = [];
  let availableDishes = dishes.filter(dish => dish.id != excludedId);
  let maxIndex = availableDishes.length - 1;

  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * maxIndex);
    randomDishes.push(availableDishes[randomIndex]);
    availableDishes.splice(randomIndex, 1);
    maxIndex--;
  }

  return randomDishes;
}