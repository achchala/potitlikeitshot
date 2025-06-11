// checkout.js
// Assumes main.js is loaded first and provides products and getProductPrice

document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutCart();
});

function renderCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartItemsDiv = document.getElementById("checkout-cart-items");
  const summaryDiv = document.getElementById("checkout-summary-details");
  cartItemsDiv.innerHTML = "";
  let subtotal = 0;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    summaryDiv.innerHTML = "";
    return;
  }
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    const price = getProductPrice(item.size);
    subtotal += price * item.qty;
    const row = document.createElement("div");
    row.className = "checkout-item-row";
    row.innerHTML = `
      <img src="${product.image}" class="checkout-item-img" alt="${product.name}">
      <div class="checkout-item-details">
        <div class="checkout-item-title">${product.name}</div>
        <div class="checkout-item-meta">Size: ${item.size}</div>
        <div class="checkout-item-price">$${price} x ${item.qty}</div>
      </div>
      <button class="checkout-item-remove" title="Remove">&times;</button>
    `;
    row.querySelector(".checkout-item-remove").onclick = function () {
      removeFromCheckoutCart(item.id, item.size);
    };
    cartItemsDiv.appendChild(row);
  });
  // Order summary
  summaryDiv.innerHTML = `
    <div>Subtotal: <b>$${subtotal.toFixed(2)}</b></div>
    <div style="color:#888; font-size:0.97rem;">Est. Taxes: <b>$${(
      subtotal * 0.15
    ).toFixed(2)}</b></div>
    <hr style="margin:1rem 0;">
    <div style="font-size:1.13rem; font-weight:700;">Estimated Total: $${(
      subtotal * 1.15
    ).toFixed(2)}</div>
  `;
}

function removeFromCheckoutCart(productId, size) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCheckoutCart();
}

document.getElementById("final-checkout-btn").onclick = function () {
  alert("Order placed! (Demo)");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
};
