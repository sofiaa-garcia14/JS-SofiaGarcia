const ticketWeekend = {
  name: "The weeknd - Stadium N",
  description:
    "Starboy es el título del tercer álbum de estudio del cantante y compositor canadiense The Weeknd.​",
  price: 49.9,
  tax: 0.05,
  shipping: 0,
};

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

let tickets = 1;

const displayTicket = (ticket) => {
  ticketName.textContent = ticket.name;
  ticketDescription.textContent = ticket.description;
  ticketPrice.textContent = `${ticket.price} USD`;
};

const updatePrice = (ticket) => ticket.price * tickets;

const displayInfoPrices = () => {
  let sub = updatePrice(ticketWeekend);
  let taxPrice = Math.round(ticketWeekend.tax * sub * 100) / 100;
  let totalPrice = Math.round((sub + taxPrice) * 100) / 100;
  subtotal.textContent = `$${sub}`;
  tax.textContent = `$${taxPrice}`;
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

btnClose.addEventListener("click", removeTicket);

displayTicket(ticketWeekend);
displayInfoPrices(ticketWeekend);
