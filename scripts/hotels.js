document.addEventListener("DOMContentLoaded", function () {
  const searchOptions = document.querySelectorAll(".search-options li");
  const bookButtons = document.querySelectorAll(".book");
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
    button.addEventListener("click", function () {
      const hotelName = this.parentElement.querySelector(".offer").textContent;
      const hotelPrice =
        this.parentElement.querySelector("p:nth-of-type(2)").textContent;
      addToCart(hotelName, hotelPrice);
    });
  });

  function addToCart(hotelName, hotelPrice) {
    let cartItem = document.querySelector(`li[data-hotel="${hotelName}"]`);
    if (cartItem) {
      const quantityElement = cartItem.querySelector(".quantity");
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
      cartItem = document.createElement("li");
      cartItem.setAttribute("data-hotel", hotelName);
      cartItem.innerHTML = `
        ${hotelName} - ${hotelPrice} 
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
    alert(`Name: ${name}\nEmail: ${email}\nAddress: ${address}`);
    checkoutForm.style.display = "none";
  });
});
