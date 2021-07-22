
let loading = document.querySelector("#loading");



const loadingToItems = (items) => {
  loading.textContent = `${items} items.`;
  loading.style.backgroundColor = "rgb(194, 243, 194)";
}

const fetchAPI = (pageCategory) => {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(json => showData(json, pageCategory))
    .catch(err => console.log("Something went wrong:", err))
}

const showData = (jsonObj, pageCategory) => {
  
  targetContainer.innerHTML = "";
  let totalItems = 0;

  jsonObj.forEach(jsonItem => {
    let { id, title, price, description, category, image } = jsonItem;

    let listItem = document.createElement("div");
    listItem.setAttribute("class", "listItem");
    if (pageCategory === category) {
      listItem.innerHTML = `
      <div>
        <h4>${title}</h4>
        <p>${description}</p>
        <h5>Price: $${price}</h5>
      </div>
      <div id="listItem--img">
        <img src="${image}">
      </div>
      `;

      targetContainer.appendChild(listItem);
      totalItems += 1;
    }
  });

  loadingToItems(totalItems);
  console.log(`There are ${totalItems} items in the list`);
}

let targetContainer = document.querySelector("#targetContainer");

let pageCategory = document.querySelector("#page-value").textContent;
window.addEventListener("load", fetchAPI(pageCategory.toLowerCase()));

let fetchBtn = document.querySelector("#fetchBtn");
fetchBtn.addEventListener("click", fetchAPI("jewelery"))