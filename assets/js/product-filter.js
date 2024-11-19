const products = {
  data: [
    {
      productName: "Regular White T-Shirt",
      category: "Topwear",
      currentPrice: 30,
      oldPrice: 60,
      image: "./assets/images/product-filter/white-tshirt.webp",
    },
    {
      productName: "Beige Short Skirt",
      category: "Bottomwear",
      currentPrice: 49,
      oldPrice: 69,
      image: "./assets/images/product-filter/short-skirt.webp",
    },
    {
      productName: "Sporty SmartWatch",
      category: "Watch",
      currentPrice: 99,
      oldPrice: 110,
      image: "./assets/images/product-filter/sporty-smartwatch.webp",
    },
    {
      productName: "Basic Knitted Top",
      category: "Topwear",
      currentPrice: 29,
      oldPrice: 59,
      image: "./assets/images/product-filter/knitted-top.webp",
    },
    {
      productName: "Black Leather Jacket",
      category: "Jacket",
      currentPrice: 129,
      oldPrice: 180,
      image: "./assets/images/product-filter/black-leather-jacket.webp",
    },
    {
      productName: "Stylish Pink Trousers",
      category: "Bottomwear",
      currentPrice: 89,
      oldPrice: 120,
      image: "./assets/images/product-filter/pink-trousers.webp",
    },
    {
      productName: "Brown Men's Jacket",
      category: "Jacket",
      currentPrice: 189,
      oldPrice: 220,
      image: "./assets/images/product-filter/brown-jacket.webp",
    },
    {
      productName: "Comfy Gray Pants",
      category: "Bottomwear",
      currentPrice: 49,
      oldPrice: 79,
      image: "./assets/images/product-filter/comfy-gray-pants.webp",
    },
  ],
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  let filterMenu = document.querySelectorAll(
    "#filter-dropdown .select-dropdown__menu > li"
  );
  let headerSearchBtn = document.getElementById("header-search-btn");

  // Check if products are available
  if (!products.data || products.data.length === 0) {
    const productContainer = document.querySelector("#product-list");
    const errorHTML = `<li class="w-100 text-center pt-4"><i class="fa-brands fa-opencart fa-5x border p-3 rounded-0 mb-3" ></i><h3 class="fst-italic fw-lighter">There is no product available.</h3></li>`;
    productContainer.innerHTML = errorHTML;
  } else {
    filterMenu.forEach((filterList) => {
      filterList.addEventListener("click", filterItems);
    });
    headerSearchBtn.addEventListener("click", serachProduct);
    displayProduct(products.data);
  }
}

// Generate Product HTML
function productItemHTML(productItem) {
  return productItem
    .map((product) => {
      let discountPrice = Math.floor(
        ((product.oldPrice - product.currentPrice) / product.oldPrice) * 100
      );
      return `<li class="col product-item">
          <figure>
            <div class="product-item__img"><img src="${product?.image}" alt="${product?.productName}" class="img-fluid"></div>
            <figcaption>
                <h4 class="mb-1">${product?.productName}</h4>
                <p class="text-black-50 mb-2">${product?.category}</p>
                <div class="d-flex gap-2 align-items-md-center"> 
                  <b><i>₹</i>${product.currentPrice}</b>
                  <s class="text-black-50"><i>₹</i>${product.oldPrice}</s>
                  <span class="ms-2 text-success off-percentage fw-medium">${discountPrice}% off</span>
                  </div>
            </figcaption>
          </figure>
        </li>`;
    })
    .join("");
}

// Display Products

function displayProduct(data) {
  const productContainer = document.querySelector("#product-list");
  const productItemsHTML = productItemHTML(data);
  productContainer.innerHTML = productItemsHTML;
}

// Filter Products
function filterItems(event) {
  let filteredText = event.target.textContent.toLowerCase();
  console.log(filteredText);
  if (filteredText == "all") {
    displayProduct(products.data);
  } else {
    const filteredData = products.data.filter(
      (item) => item.category.toLowerCase() == filteredText
    );
    displayProduct(filteredData);
  }
}

// Searched Products
function serachProduct(event) {
  event.preventDefault();
  const headerSearchedText = document
    .getElementById("header-search-input")
    .value.toLowerCase();

  console.log(headerSearchedText);

  const filteredData = products.data.filter((item) =>
    item.productName.toLowerCase().includes(headerSearchedText)
  );
  displayProduct(filteredData);
}
