document.addEventListener("DOMContentLoaded", function () {
  const searchOptions = document.querySelectorAll(".search-options li");
  const bookButtons = document.querySelectorAll(".book, #available-flights a");
  const cartItems = document.getElementById("cart-items");
  const checkoutButton = document.getElementById("checkout");
  const checkoutForm = document.getElementById("checkout-form");
  const form = document.getElementById("form");

  searchOptions.forEach((option) => {
    option.addEventListener("click", function () {
      searchOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  bookButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const parentElement = this.closest("article, tr");
      const itemName = parentElement.querySelector(
        ".offer, td:nth-of-type(3)"
      ).textContent;
      const itemPrice = parentElement.querySelector(
        "p:nth-of-type(2), td:nth-of-type(4)"
      ).textContent;
      addToCart(itemName, itemPrice);
    });
  });

  function addToCart(itemName, itemPrice) {
    let cartItem = document.querySelector(`li[data-item="${itemName}"]`);
    if (cartItem) {
      const quantityElement = cartItem.querySelector(".quantity");
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
      cartItem = document.createElement("li");
      cartItem.setAttribute("data-item", itemName);
      cartItem.innerHTML = `
        ${itemName} - ${itemPrice} 
        <button class="decrease">-</button>
        <span class="quantity">1</span>
        <button class="increase">+</button>
      `;
      cartItems.appendChild(cartItem);

      cartItem
        .querySelector(".increase")
        .addEventListener("click", function () {
          const quantityElement = cartItem.querySelector(".quantity");
          quantityElement.textContent =
            parseInt(quantityElement.textContent) + 1;
        });

      cartItem
        .querySelector(".decrease")
        .addEventListener("click", function () {
          const quantityElement = cartItem.querySelector(".quantity");
          const newQuantity = parseInt(quantityElement.textContent) - 1;
          if (newQuantity > 0) {
            quantityElement.textContent = newQuantity;
          } else {
            cartItems.removeChild(cartItem);
          }
        });
    }
  }

  checkoutButton.addEventListener("click", function () {
    checkoutForm.style.display = "block";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    alert(
      `Checkout successfully to:\n---------------------------\nName: ${name}\nEmail: ${email}\nAddress: ${address}`
    );
    checkoutForm.style.display = "none";
  });
});
