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

const updateShopItemStyles = (styleClass) => {
  const shopItems = document.querySelectorAll("#shop-list .shop-item");
  shopItems.forEach((item) => {
    item.className = "shop-item";
    item.classList.add(styleClass);
  });
  shopList.className = "";
  if (styleClass === "shop-item-style-four") {
    shopList.classList.add("shop-list-four");
  } else {
    shopList.classList.add("shop-list");
    shopList.classList.remove("shop-list-four");
  }
};

const sortIcons = document.querySelectorAll(".sort-grid");
sortIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    sortIcons.forEach((item) => item.classList.remove("active-grid"));
    icon.classList.add("active-grid");
    switch (icon.id) {
      case "sorting-one":
        updateShopItemStyles("shop-item-style-one");
        break;
      case "sorting-two":
        updateShopItemStyles("shop-item-style-two");
        break;
      case "sorting-four":
        updateShopItemStyles("shop-item-style-four");
        break;
    }
  });
});

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
  const isSorting =
    lastCalledFunction === "asc" || lastCalledFunction === "desc";

  const limitKey = isSorting
    ? `sort${
        lastCalledFunction.charAt(0).toUpperCase() + lastCalledFunction.slice(1)
      }`
    : "all";
  if (limit[limitKey] >= 16) {
    showMore.style.display = "none";
  } else {
    limit[limitKey] += 4;
    showMore.style.display = limit[limitKey] >= 16 ? "none" : "block";
    if (isSorting) {
      sorting(
        `https://fakestoreapi.com/products?sort=${lastCalledFunction}&limit=${limit[limitKey]}`
      );
    } else {
      getData();
    }
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

selectCategories.addEventListener("change", () => {
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
  limit[lastCalledFunction] = 4;
  showMore.style.display = "block";
  sorting(
    `https://fakestoreapi.com/products?sort=${sort.value}&limit=${limit[lastCalledFunction]}`
  );
});
