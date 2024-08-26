// Header Closing

const closeHeader = document.querySelector("#close-header");
const header = document.querySelector("#header");
closeHeader.addEventListener("click", function () {
  header.style.display = "none";
});

// Burger Menu

const burgerMenuIcon = document.querySelector("#burger-menu-icon");
const burgerMenu = document.querySelector("#burger-menu");
burgerMenuIcon.addEventListener("click", () => {
  if (
    burgerMenuIcon.src ===
    "https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/close-512.png"
  ) {
    burgerMenu.style.display = "none";
    burgerMenuIcon.src =
      "https://cdn4.iconfinder.com/data/icons/interface-essential-vol-1/24/navigation-menu-1--button-parallel-vertical-lines-menu-navigation-three-hamburger-512.png";
  } else {
    burgerMenu.style.display = "block";
    burgerMenuIcon.src =
      "https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/close-512.png";
    document.body.style.overflow = "hidden";
  }
});

function checkWidthAndAddFunctionality() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    burgerMenu.style.display = "none";
    burgerMenuIcon.src =
      "https://cdn4.iconfinder.com/data/icons/interface-essential-vol-1/24/navigation-menu-1--button-parallel-vertical-lines-menu-navigation-three-hamburger-512.png";
  }
}

window.addEventListener("resize", checkWidthAndAddFunctionality);

//////////////////////////////////

//Show Data

function showData(data) {
  shopList.innerHTML = "";
  data.forEach((item) => {
    let shopItem = document.createElement("div");
    shopItem.classList.add("shop-item");
    let shopImgDiv = document.createElement("div");
    shopImgDiv.classList.add("shop-img-div");
    let shopImg = document.createElement("img");
    shopImg.classList.add("shop-img");
    shopImg.src = item.image;
    let shopContent = document.createElement("div");
    shopContent.classList.add("shop-content");
    let category = document.createElement("p");
    category.innerText = item.category;
    let title = document.createElement("p");
    title.classList.add("item-title");
    title.innerText = item.title;
    let price = document.createElement("p");
    price.innerText = `$${item.price}`;
    price.classList.add("item-price");
    let description = document.createElement("p");
    description.innerText = item.description;
    description.classList.add("item-desc");
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("item-button-div");
    let cartButton = document.createElement("button");
    cartButton.classList.add("card-btn");
    cartButton.innerText = "Add to cart";
    let wishButton = document.createElement("div");
    wishButton.classList.add("wishlist");
    let loveIcon = document.createElement("img");
    loveIcon.src = "./src/img/love-icon.png";
    let wishlistText = document.createElement("p");
    wishlistText.innerText = "wishlist";
    wishButton.append(loveIcon);
    wishButton.append(wishlistText);

    shopList.append(shopItem);
    shopItem.append(shopImgDiv);
    shopImgDiv.append(shopImg);
    shopItem.append(shopContent);
    shopContent.append(category);
    shopContent.append(title);
    shopContent.append(price);
    shopContent.append(description);
    shopContent.append(buttonDiv);
    buttonDiv.append(cartButton);
    buttonDiv.append(wishButton);
  });
}

// Categories, Prices
const selectCategories = document.querySelector("#categories");
async function getCategories() {
  let categories = [];
  let prices = [];
  const response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  data.forEach((item) => {
    prices.push(item.price);
    categories.push(item.category);
  });
  prices = [...new Set(prices.sort((a, b) => a - b))];
  categories = [...new Set(categories)];
  categories.forEach((item) => {
    const option = document.createElement("option");
    option.innerText = item;
    selectCategories.appendChild(option);
  });
}
getCategories();

// getData

const shopList = document.querySelector("#shop-list");
const showMore = document.querySelector("#show-more");

let limit = 5;
async function getData() {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}`
  );
  let data = await response.json();
  showData(data);
}

getData();

//showMore

showMore.addEventListener("click", () => {
  limit += 5;
  if (limit === 20) {
    showMore.style.display = "none";
  }
  getData();
});

// mens clothing

async function mensClothing() {
  showMore.style.display = "none";
  const response = await fetch(
    "https://fakestoreapi.com/products/category/men's clothing"
  );
  const data = await response.json();
  showData(data);
}

// jewelery

async function jewelery() {
  showMore.style.display = "none";
  const response = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const data = await response.json();
  showData(data);
}

// electronics

async function electronics() {
  showMore.style.display = "none";
  const response = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const data = await response.json();
  showData(data);
}

// women's clothing

async function womensClothing() {
  showMore.style.display = "none";
  const response = await fetch(
    "https://fakestoreapi.com/products/category/women's clothing"
  );
  const data = await response.json();
  showData(data);
}

// category select

selectCategories.addEventListener("click", () => {
  switch (selectCategories.value) {
    case "men's clothing":
      mensClothing();
      break;
    case "jewelery":
      jewelery();
      break;
    case "electronics":
      electronics();
      break;
    case "women's clothing":
      womensClothing();
      break;
  }
});

// prices select

function allPrices() {
  getData();
}
async function under50() {
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  data = data.filter((item) => item.price <= 50);
  showMore.style.display = "none";
  showData(data);
}

async function under100() {
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  data = data.filter((item) => item.price <= 100);
  showMore.style.display = "none";
  showData(data);
}

async function under500() {
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  data = data.filter((item) => item.price <= 500);
  showMore.style.display = "none";
  showData(data);
}

async function under1000() {
  let response = await fetch("https://fakestoreapi.com/products");
  let data = await response.json();
  data = data.filter((item) => item.price <= 1000);
  showMore.style.display = "none";
  showData(data);
}

const price = document.querySelector("#price");
price.addEventListener("click", () => {
  switch (price.value) {
    case "All":
      allPrices();
      break;
    case "50":
      under50();
      break;
    case "100":
      under100();
      break;
    case "500":
      under500();
      break;
    case "1000":
      under1000();
      break;
  }
});

//sort

const sort = document.querySelector("#sort");

async function sortByAsc() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  data.sort((a, b) => a.price - b.price);
  showData(data);
  showMore.style.display = "none";
}

async function sortByDesc() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  data.sort((a, b) => b.price - a.price);
  showData(data);
  showMore.style.display = "none";
}

sort.addEventListener("click", () => {
  switch (sort.value) {
    case "asc":
      sortByAsc();
      break;
    case "desc":
      sortByDesc();
      break;
  }
});

// sort one

const sortOne = document.querySelector("#sort-one");

sortOne.addEventListener("click", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  shopList.innerHTML = "";
  showMore.style.display = "none";
  data.forEach((item) => {
    let shopItem = document.createElement("div");
    shopItem.classList.add("item-one");
    let shopImgDiv = document.createElement("div");
    shopImgDiv.classList.add("shop-img-div");
    let shopImg = document.createElement("img");
    shopImg.classList.add("shop-img-one");
    shopImg.src = item.image;
    let shopContent = document.createElement("div");
    shopContent.classList.add("shop-content");
    let title = document.createElement("p");
    title.classList.add("item-title");
    title.innerText = item.title;
    let price = document.createElement("p");
    price.innerText = `$${item.price}`;
    price.classList.add("item-price");
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("item-button-div");
    let wishButton = document.createElement("div");
    wishButton.classList.add("wishlist");
    let loveIcon = document.createElement("img");
    loveIcon.src = "./src/img/love-icon.png";
    let wishlistText = document.createElement("p");
    wishlistText.innerText = "wishlist";
    wishButton.append(loveIcon);
    wishButton.append(wishlistText);

    shopList.append(shopItem);
    shopItem.append(shopImgDiv);
    shopImgDiv.append(shopImg);
    shopItem.append(shopContent);
    shopContent.append(title);
    shopContent.append(price);
  });
});

const sortTwo = document.querySelector("#sort-two");

sortTwo.addEventListener("click", async () => {
  getData();
});
