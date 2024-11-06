document.addEventListener("DOMContentLoaded", init);

// initialize the code
let currantPage = 1;
let showPerPage = 8;
let pageNavDiv;

async function init() {
  // Assign pageNavDiv after the DOM is fully loaded
  pageNavDiv = document.getElementById("products-nav");

  const result = await getProducts("https://dummyjson.com/products?limit=0");
  if (result?.products?.length > 0) {
    displayPagination(currantPage, showPerPage, result);

    displayProducts(result, showPerPage, currantPage);
  }
}

async function getProducts(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `${response.statusText} ${response.status}, Something went wrong`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function displayProducts(data, showPerPage, currantPage) {
  const { products } = data;

  renderProducts(products, showPerPage, currantPage);
}

function renderProducts(productsData, showPerPage, currantPage) {
  const productsDiv = document.getElementById("product-list");
  let startTrim = showPerPage * (currantPage - 1);
  let endTrim = currantPage * showPerPage;

  const showPerPageProducts = productsData.slice(startTrim, endTrim);

  const productsItems = showPerPageProducts
    .map(
      ({ thumbnail, title }) => `
      <div class="col-6 col-md-3">  
        <figure class="product-list__item card mb-0 h-100">
          <img src="${thumbnail}" alt="${title}">
          <figcaption>
              <h5 class="mb-0 p-3">${title}</h5>
          </figcaption>
        </figure>
        </div>
    `
    )
    .join("");
  productsDiv.innerHTML = productsItems;
}

function displayPagination(currantPage, showPerPage, data) {
  const { products } = data;
  const totalLength = products.length;

  const totalPage = Math.ceil(totalLength / showPerPage);

  const preButton = `<li class="page-item prev-btn">
      <a href="javascript:void(0)" class="page-link" onclick="prevPage()">Prev</a>
      </li>`;
  const nextButton = `<li class="page-item next-btn">
      <a href="javascript:void(0)" class="page-link" onclick="nextPage()">Next</a>
      </li>`;

  function createPageButton(selectedPageNo = currantPage) {
    let paginationList = "";
    for (let i = 1; i <= totalPage; i++) {
      if ((i == 6 && totalPage > 6) || i == totalPage) {
        paginationList += `<li class="page-item ${
          selectedPageNo === i ? "active" : ""
        }">
       <a href="javascript:void(0)" class="page-link">...</a>
       </li>`;
      } else {
        paginationList += `<li class="page-item ${
          selectedPageNo === i ? "active" : ""
        }">
       <a href="javascript:void(0)" class="page-link" onclick="handleDisplayProducts(${i})">${i}</a>
       </li>`;
      }
    }
    pageNavDiv.innerHTML = preButton + paginationList + nextButton;
  }
  createPageButton();
}

function handleDisplayProducts(selectedPageNo) {
  currantPage = selectedPageNo;
  toggleActive(currantPage);
  // Update the product display based on the selected page
  getProducts("https://dummyjson.com/products?limit=0").then((result) => {
    if (result?.products?.length > 0) {
      displayProducts(result, showPerPage, currantPage);
      // displayPagination(currantPage, showPerPage, result);
    }
  });
}

// Toggle active class
function toggleActive(currantPage) {
  const pageNavList = document.querySelectorAll("#products-nav .page-item");
  const pageNavActive = document.querySelector(
    "#products-nav .page-item.active"
  );

  if (currantPage < 0 || currantPage >= pageNavList.length) {
    console.error("Invalid page index");
    return;
  }

  // If there's an active item, remove its 'active' class
  if (pageNavActive) {
    pageNavActive.classList.remove("active");
  }

  // Add 'active' class to the new current page item
  pageNavList[currantPage].classList.add("active");
}

function prevPage() {
  if (currantPage <= 1) return;
  else if (currantPage > 1) {
    currantPage--;
    handleDisplayProducts(currantPage);
  }
}

function nextPage() {
  getProducts("https://dummyjson.com/products?limit=0").then((result) => {
    const totalPages = Math.ceil(result.products.length / showPerPage);
    if (currantPage < totalPages) {
      currantPage++;
      handleDisplayProducts(currantPage);
    }
  });
}

//
