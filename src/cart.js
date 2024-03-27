let backHome = document.getElementById("back-home");
let cartItems = document.getElementById("cart-items");
let bill = document.getElementById("totalBill");
let items = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let total = 0;
  items.map((x) => {
    total += x.item;
  });
  let icon = document.getElementById(amount);
  amount.innerHTML = total;
};
calculation();

let generateCart = () => {
  if (items.length > 0) {
    return (cartItems.innerHTML = items
      .map((x) => {
        let { id, item } = x;
        let search = shopData.find((x) => x.id === id);
        let { name, price, image } = search;
        return `        
       <div class="cart-item">
       <img src="${image}" alt="Image">
       <div class="data">
         <div class="data1">
           <h2>${name}</h2>
           <span>$${price}</span>
           <i onclick="clearItem('${id}')" class="bi bi-x-lg" id="cross"></i>
         </div>
         <div class="data2">
           <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
           <span id="${id}">${item}</span>
           <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
         </div>
         <div class="data3 ${id}">
           
         </div>
       </div>
     </div>
       `;
      })
      .join(" "));
  } else {
    return (backHome.innerHTML = `
        <h2>Cart is Empty</h2>
        <h4>
        <a href="./index.html">
        Back To Home
        </a>
        </h4>
        `);
  }
};
generateCart();
let generateBill = () => {
  if (items.length > 0) {
    return (bill.innerHTML = `
     <div class="bill">
    <h2 id="receipt">Total Bill : $ 4240</h2>
    </div>
    <div class="button">
    <button onclick="clearCart()">Clear Cart</button>
    </div>
   `);
  } else return;
};
generateBill();
let increment = (id) => {
  let target = id;
  let search = items.find((x) => x.id === target);
  search.item += 1;
  localStorage.setItem("data", JSON.stringify(items));
  update(id);
  calculateBill();
  individualBill();
};

let decrement = (id) => {
  let target = id;
  let search = items.find((x) => x.id === target);
  if (search.item > 0) {
    search.item -= 1;
  } else return;
  update(id);
  items = items.filter((x) => x.item != 0);
  localStorage.setItem("data", JSON.stringify(items));
  calculateBill();
  individualBill();
  if (search.item > 0) {
    return;
  } else {
    location.reload(true);
  }
  

};

let update = (id) => {
  let currentValue = document.getElementById(id);
  let search = items.find((x) => x.id === id);
  currentValue.innerHTML = search.item;
  calculation();
};

let clearItem = (id) => {
  let search = items.find((x) => x.id === id);
  search.item = 0;
  items = items.filter((x) => x.item != 0);
  localStorage.setItem("data", JSON.stringify(items));
  location.reload(true);
};

let clearCart = () => {
  localStorage.removeItem("data");
  location.reload(true);
};

let calculateBill = () => {
  let bill = 0;
  items.map((e) => {
    let search = shopData.find((x) => x.id === e.id);
    let dummy = 0;
    dummy = e.item * search.price;
    bill = bill + dummy;
  });
  document.getElementById("receipt").innerHTML = `Total Bill: $${bill}`;
};
calculateBill();

let individualBill = () => {
  items.forEach((e) => {
    let search = shopData.find((x) => x.id === e.id);
    console.log(e.id);
    let target = document.querySelector(`.${e.id}`);
    target.innerHTML = `${e.item * search.price}`;
    console.log(target);
  });
};

individualBill();
