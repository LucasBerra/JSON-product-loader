
/* MAIN LIST FETCHING */

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
    listItem.setAttribute("id", `${id}`);
    listItem.setAttribute("onclick", `displayItem(${id})`);
    
    if (pageCategory === category) {
      listItem.innerHTML = `
      <div>
        <h4>${title}</h4>
        <p>${description}</p>
        <h5>Price: US$${price}</h5>
      </div>
      <div id="listItem--img">
        <img src="${image}">
      </div>
      `;

      targetContainer.appendChild(listItem);
      document.querySelector("#title").removeAttribute("class", "hidden");
      document.querySelector("#list-btn").style.display = "none";
      totalItems += 1;
    }
  });

  loadingToItems(totalItems);
}

let targetContainer = document.querySelector("#targetContainer");

let pageCategory = document.querySelector("#page-value").textContent;
window.addEventListener("load", fetchAPI(pageCategory.toLowerCase()));



const displayItem = (itemId) => {

  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(json => {
      json.forEach(jsonItem => {
        let { id, title, price, description, category, image } = jsonItem;

        if (itemId === id) {
          let itemBody = document.createElement("div");
          itemBody.setAttribute("class", "itemBody");

          itemBody.innerHTML = `
          <img src="${image}">

          <div>
            <h4>${title}</h4>
            <h5>-${category}-</h5>
            <hr>
            <h6>Description:</h6>
            <p>${description}</p>
            <hr>
            <h5>Price: US$${price}</h5>
          </div>
          `;

          targetContainer.innerHTML = "";
          targetContainer.appendChild(itemBody);

          document.querySelector("#title").className += "hidden";
          document.querySelector("#list-btn").style.display = "initial";
        }
      })
    })
    .catch(err => console.log("Something went wrong:", err))
}

const backToList = () => {
  fetchAPI(pageCategory.toLowerCase());
}