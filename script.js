// Header Closing

const closeHeader = document.querySelector("#close-header");
const header = document.querySelector("#header");
closeHeader.addEventListener("click", function () {
  header.style.display = "none";
});

// Burger Menu

const burgerOpenIcon = document.querySelector("#burger-open-icon");
const burgerCloseIcon = document.querySelector("#burger-close-icon");
const burgerMenu = document.querySelector("#burger-menu");

burgerOpenIcon.addEventListener("click", () => {
  burgerMenu.style.display = "block";
  document.body.style.overflow = "hidden";
  burgerOpenIcon.classList.add("hidden");
  burgerCloseIcon.classList.remove("hidden");
});

burgerCloseIcon.addEventListener("click", () => {
  burgerMenu.style.display = "none";
  document.body.style.overflow = "auto";
  burgerOpenIcon.classList.remove("hidden");
  burgerCloseIcon.classList.add("hidden");
});

function checkWidthAndAddFunctionality() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    burgerMenu.style.display = "none";
    document.body.style.overflow = "auto";
    burgerOpenIcon.classList.remove("hidden");
    burgerCloseIcon.classList.add("hidden");
  }
}

window.addEventListener("resize", checkWidthAndAddFunctionality);

const shopList = document.querySelector("#shop-list");
const showMore = document.querySelector("#show-more");
const selectCategories = document.querySelector("#categories");
let limit = {
  all: 4,
  sortAsc: 4,
  sortDesc: 4,
};
let lastCalledFunction = null;

//grid

const sortIcons = document.querySelectorAll(".sort-grid");
sortIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    sortIcons.forEach((item) => item.classList.remove("active-grid"));
    icon.classList.add("active-grid");
  });
});
// let sortStyle = "";
// const sortingOne = document.querySelector("#sorting-one");
// const sortingTwo = document.querySelector("#sorting-two");
// const sortingThree = document.querySelector("#sorting-three");
// const sortingFour = document.querySelector("#sorting-four");

function showData(data) {
  shopList.innerHTML = "";
  data.forEach((item) => {
    let shopItem = document.createElement("div");
    shopItem.classList.add("shop-item");
    shopItem.innerHTML = `
    <div class="shop-img-div">
        <img class="shop-img" src="${item.image}" alt="${item.title}">
    </div>
    <div class="shop-content">
        <p>${item.category}</p>
        <p class="item-title">${item.title}</p>
        <p class="item-price">$${item.price}</p>
        <p class="item-desc">${item.description}</p>
        <div class="item-button-div">
            <button class="card-btn">Add to cart</button>
            <div class="wishlist">
                <img src="./assets/img/love-icon.png" alt="wishlist">
                <p>wishlist</p>
            </div>
        </div>
    </div>
`;
    shopList.append(shopItem);
  });
}

async function getData() {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit.all}`
  );
  const data = await response.json();
  showData(data);
  lastCalledFunction = "getData";
}

getData();

showMore.addEventListener("click", () => {
  if (lastCalledFunction === "getData") {
    if (limit.all >= 16) {
      showMore.style.display = "none";
    } else {
      showMore.style.display = "block";
    }
    limit.all += 4;
    getData();
  } else if (lastCalledFunction === "asc") {
    if (limit.sortAsc >= 16) {
      showMore.style.display = "none";
    } else {
      showMore.style.display = "block";
    }
    limit.sortAsc += 4;
    sorting(
      `https://fakestoreapi.com/products?sort=asc&limit=${limit.sortAsc}`
    );
  } else if (lastCalledFunction === "desc") {
    if (limit.sortDesc >= 16) {
      showMore.style.display = "none";
    } else {
      showMore.style.display = "block";
    }
    limit.sortDesc += 4;
    sorting(
      `https://fakestoreapi.com/products?sort=desc&limit=${limit.sortDesc}`
    );
  }
});

async function getCategories() {
  const response = await fetch(" https://fakestoreapi.com/products/categories");
  const data = await response.json();
  data.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    selectCategories.appendChild(opt);
  });
}
getCategories();

async function getCategory(category) {
  showMore.style.display = "none";
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await response.json();
  showData(data);
}

// category select

selectCategories.addEventListener("click", () => {
  getCategory(selectCategories.value);
});

// //sort

const sort = document.querySelector("#sort");

async function sorting(url) {
  const response = await fetch(url);
  const data = await response.json();
  showData(data);
}

sort.addEventListener("click", () => {
  lastCalledFunction = sort.value;
  switch (sort.value) {
    case "asc":
      limit.sortAsc = 4;
      showMore.style.display = "block";
      sorting(
        `https://fakestoreapi.com/products?sort=asc&limit=${limit.sortAsc}`
      );
      break;
    case "desc":
      limit.sortDesc = 4;
      showMore.style.display = "block";
      sorting(
        `https://fakestoreapi.com/products?sort=desc&limit=${limit.sortDesc}`
      );
      break;
  }
});
