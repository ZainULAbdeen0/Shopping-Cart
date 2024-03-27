let shop = document.getElementById("main");


let items = JSON.parse(localStorage.getItem("data")) || [];
let setData = () => {
  return (shop.innerHTML = shopData
    .map((e) => {
      let { id, name, price, desc, image } = e;
      let value = items.find((x) => x.id === id);
      return `
    <div class="cards" id="product-id-${id}">
    <img src="${image}" alt="" />
    <div class="detail">
      <h2>${name}</h2>
      <p>${desc}
      </p>
      <div class="price-quant flex">
        <h2>$${price}</h2>
        <div class="quant flex">
            <i onclick=increment(${id}) class="bi bi-plus-lg"></i>
        <div id=${id} class="quantity">
            ${value === undefined ? 0 : value.item}
        </div>
        <i onclick=decrement(${id}) class="bi bi-dash-lg"></i>
        </div>
    </div>
    
    </div>
  </div>
    
    `;
    })
    .join(""));
};

setData();

let increment = (id) => {
  let product = id;

  let search = items.find((x) => x.id === product.id);

  if (search === undefined) {
    items.push({
      id: product.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(items));

  update(product.id);
};

let decrement = (id) => {
  let product = id;
  let search = items.find((x) => x.id === product.id);
    if (search === undefined) {
      return;
  } else {
    if (search.item != 0) {
      search.item -= 1;
    }
  }
  update(product.id);

  items= items.filter((e)=> e.item!=0);
  localStorage.setItem("data", JSON.stringify(items));

};

let update = (id) => {
  let currentValue = document.getElementById(id);
  let search = items.find((x) => x.id === id);
  currentValue.innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let total = 0;
  items.map((x) => {
    total += x.item;
  });
  let icon = document.getElementById(amount);
  amount.innerHTML = total;
};
calculation();
