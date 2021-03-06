const ticketWeekend = {
  name: "The weeknd - Stadium N",
  description:
    "Starboy es el título del tercer álbum de estudio del cantante y compositor canadiense The Weeknd.​",
  price: 49.9,
  tax: 0.05,
  shipping: 0,
};

const extraItems = [
  {
    id: 1,
    name: "Food Voucher",
    price: 15,
  },
  {
    id: 2,
    name: "Event T-Shirt",
    price: 30,
  },
  {
    id: 3,
    name: "Gift Box",
    price: 5,
  },
];

const ticketName = document.getElementById("ticket-name");
const ticketDescription = document.getElementById("ticket-description");
const ticketPrice = document.getElementById("ticket-price");
const ticketSum = document.getElementById("sum-ticket");
const ticketRest = document.getElementById("rest-ticket");
const ticketAmount = document.getElementById("ticket-amount");
const ticketCheckout = document.getElementById("ticket-checkout");
const btnClose = document.querySelector(".btn-close");
const messageEmptyCart = document.getElementById("message-empty-cart");
const subtotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const shipping = document.getElementById("shipping");
const total = document.getElementById("total");
const extraItemsContainer = document.querySelector(".list-group");
localStorage.setItem("Cart", JSON.stringify([]));

let tickets = 1;
let subTotal = 0;
let totalTax = 0;
let totalShipping = 0;
let totalPrice = 0;

const displayTicket = (ticket) => {
  ticketName.textContent = ticket.name;
  ticketDescription.textContent = ticket.description;
  ticketPrice.textContent = `${ticket.price} USD`;
};

const updatePrice = (ticket) => ticket.price * tickets;

const displayInfoPrices = () => {
  subTotal = updatePrice(ticketWeekend);
  totalTax = Math.round(ticketWeekend.tax * subTotal * 100) / 100;
  totalPrice = Math.round((subTotal + totalTax) * 100) / 100;
  subtotal.textContent = `$${subTotal}`;
  tax.textContent = `$${totalTax}`;
  total.textContent = `$${totalPrice}`;
};

const resetInfoPrices = () => {
  subtotal.textContent = "$0.00";
  tax.textContent = "$0.00";
  total.textContent = "$0.00";
};

function displayPrice(ticket) {
  ticketPrice.textContent = `${updatePrice(ticket)} USD`;
}

ticketSum.addEventListener("click", () => {
  tickets++;
  ticketAmount.textContent = tickets;
  if (tickets > 1) {
    ticketRest.classList.remove("class", "disabled");
  } else {
    ticketRest.classList.add("class", "disabled");
  }
  displayPrice(ticketWeekend);
  displayInfoPrices(ticketWeekend);
});

ticketRest.addEventListener("click", () => {
  if (tickets <= 2) {
    tickets--;
    ticketRest.classList.add("class", "disabled");
  } else {
    tickets--;
    ticketRest.classList.remove("class", "disabled");
  }
  ticketAmount.textContent = tickets;
  displayPrice(ticketWeekend);
  displayInfoPrices(ticketWeekend);
});

const removeTicket = () => {
  ticketCheckout.style.display = "none";
  messageEmptyCart.classList.remove("class", "d-none");
  resetInfoPrices();
};

const displayExtraItems = (items) => {
  extraItemsContainer.innerHTML = "";
  items.forEach((item) => {
    const html = `
    <label class="list-group-item d-flex gap-3">
      <input class="form-check-input flex-shrink-0 check-extra_item" type="checkbox" name="extra-items" value="${item["id"]}" style="font-size: 1.375em;">
      <span class="pt-1 form-checked-content">
        <strong>${item["price"]}</strong>
        <small class="d-block text-muted">
          $${item["price"]}
        </small>
      </span>
    </label>
    `;
    extraItemsContainer.insertAdjacentHTML("afterbegin", html);
  });
  const extraItemsTotalH = `
  <label class="list-group-item d-flex gap-3">
      <strong id="extra-items-quantity">Total de items extra: $0.00</strong>
  </label>
  `;
  extraItemsContainer.insertAdjacentHTML("afterend", extraItemsTotalH);
};

btnClose.addEventListener("click", removeTicket);

displayTicket(ticketWeekend);
displayInfoPrices(ticketWeekend);
displayExtraItems(extraItems);

const checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=extra-items]"
);

/* 
let sumExtraItems = [];
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    sumExtraItems = Array.from(checkboxes)
      .filter((i) => i.checked)
      .map((i) => i.value);
    console.log(sumExtraItems);
  });
});
 */

const extraItemsQuantity = document.getElementById("extra-items-quantity");
let sumExtraItems = 0;

checkboxes.forEach(function (checkbox) {
  let filtered;
  let product;
  checkbox.addEventListener("change", function () {
    const cart = JSON.parse(localStorage.getItem("Cart"));
    if (checkbox.checked) {
      product = extraItems.find((item) => item.id === Number(checkbox.value));
      sumExtraItems += product.price;
      cart.push(product);
      localStorage.setItem("Cart", JSON.stringify(cart));
    } else {
      if (cart.length > 1) {
        filtered = cart.filter((item) => item.id !== Number(checkbox.value));
        localStorage.setItem("Cart", JSON.stringify(filtered));
      } else {
        localStorage.setItem("Cart", JSON.stringify([]));
      }
      sumExtraItems -= product.price;
    }
    console.log(sumExtraItems);
    extraItemsQuantity.textContent = `Total de items extra: $${sumExtraItems}`;
  });
});
