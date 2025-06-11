// checkout.js
// Assumes main.js is loaded first and provides products and getProductPrice

document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutCart();
  initializeCheckoutForm();
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
        <div class="checkout-item-quantity">
          <button class="quantity-btn" data-action="decrease">-</button>
          <span class="quantity">${item.qty}</span>
          <button class="quantity-btn" data-action="increase">+</button>
        </div>
        <div class="checkout-item-price">$${price} each</div>
      </div>
      <button class="checkout-item-remove" title="Remove">&times;</button>
    `;

    // Add quantity control handlers
    row.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const newQty = action === "increase" ? item.qty + 1 : item.qty - 1;
        if (newQty > 0) {
          updateCheckoutItemQuantity(item.id, item.size, newQty);
        } else if (newQty === 0) {
          removeFromCheckoutCart(item.id, item.size);
        }
      };
    });

    row.querySelector(".checkout-item-remove").onclick = function () {
      removeFromCheckoutCart(item.id, item.size);
    };
    cartItemsDiv.appendChild(row);
  });

  // Calculate shipping
  const shippingCost = subtotal >= 50 ? 0 : 8.99;
  const tax = subtotal * 0.15;
  const total = subtotal + shippingCost + tax;

  // Order summary
  summaryDiv.innerHTML = `
    <div>Subtotal: <b>$${subtotal.toFixed(2)}</b></div>
    <div>Shipping: <b>$${shippingCost.toFixed(2)}</b> ${subtotal >= 50 ? '(Free shipping!)' : ''}</div>
    <div style="color:#888; font-size:0.97rem;">Est. Taxes: <b>$${tax.toFixed(2)}</b></div>
    <hr style="margin:1rem 0;">
    <div style="font-size:1.13rem; font-weight:700;">Estimated Total: $${total.toFixed(2)}</div>
    <div style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
      <p>Shipping Options:</p>
      <ul style="list-style: none; padding: 0; margin: 0.5rem 0;">
        <li>• Standard (3-5 business days): ${subtotal >= 50 ? 'Free' : '$8.99'}</li>
        <li>• Express (1-2 business days): $15.99</li>
      </ul>
    </div>
  `;

  // Add shipping method selection
  const shippingMethodDiv = document.createElement('div');
  shippingMethodDiv.className = 'shipping-method';
  shippingMethodDiv.innerHTML = `
    <label for="shipping-method">Shipping Method:</label>
    <select id="shipping-method" onchange="updateShippingMethod(this.value)">
      <option value="standard">Standard Shipping (3-5 business days)</option>
      <option value="express">Express Shipping (1-2 business days)</option>
    </select>
  `;
  summaryDiv.appendChild(shippingMethodDiv);
}

function updateCheckoutItemQuantity(productId, size, newQty) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (item) {
    item.qty = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCheckoutCart();
  }
}

function removeFromCheckoutCart(productId, size) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCheckoutCart();
}

function initializeCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const proceedBtn = document.getElementById("proceed-to-checkout");
  const submitBtn = document.getElementById("submit-order");

  // Show form when proceeding to checkout
  if (proceedBtn) {
    proceedBtn.addEventListener("click", function () {
      form.style.display = "block";
      proceedBtn.style.display = "none";
      // Scroll to form
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Real-time validation
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    // Clear any existing error messages on focus
    input.addEventListener("focus", function () {
      const errorElement = document.getElementById(`${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = "";
      }
      input.classList.remove("invalid");
    });

    input.addEventListener("input", function () {
      validateInput(input);
    });

    input.addEventListener("blur", function () {
      validateInput(input);
    });
  });

  // Special handling for card number
  const cardInput = document.getElementById("card");
  if (cardInput) {
    cardInput.addEventListener("input", function (e) {
      // Remove non-numeric characters
      let value = e.target.value.replace(/\D/g, "");
      // Limit to 16 digits
      value = value.slice(0, 16);
      e.target.value = value;
    });
  }

  // Special handling for expiry date
  const expiryInput = document.getElementById("expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }

  // Special handling for CVC
  const cvcInput = document.getElementById("cvc");
  if (cvcInput) {
    cvcInput.addEventListener("input", function (e) {
      // Remove non-numeric characters
      let value = e.target.value.replace(/\D/g, "");
      // Limit to 4 digits
      value = value.slice(0, 4);
      e.target.value = value;
    });
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validate all inputs
      let isValid = true;
      inputs.forEach((input) => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        // Scroll to first error
        const firstError = form.querySelector(".invalid");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
          firstError.focus();
        }
        return;
      }

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        zip: document.getElementById("zip").value,
        card: document.getElementById("card").value,
        expiry: document.getElementById("expiry").value,
        cvc: document.getElementById("cvc").value,
        order: getCart(),
      };

      // Disable submit button
      submitBtn.disabled = true;
      submitBtn.textContent = "Processing...";

      try {
        // Send order confirmation email
        await sendOrderConfirmation(formData);

        // Clear cart
        localStorage.removeItem("cart");

        // Show success message
        alert("Order placed successfully! A confirmation email has been sent.");

        // Redirect to home page
        window.location.href = "index.html";
      } catch (error) {
        console.error("Error processing order:", error);
        alert("There was an error processing your order. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Place Order";
      }
    });
  }
}

// Input validation functions
function validateInput(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  let isValid = true;
  let errorMessage = "";

  switch (input.id) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address";
      }
      break;

    case "card":
      const cardRegex = /^[0-9]{16}$/;
      if (!cardRegex.test(input.value)) {
        isValid = false;
        errorMessage = "Please enter a valid 16-digit card number";
      }
      break;

    case "cvc":
      const cvcRegex = /^[0-9]{3,4}$/;
      if (!cvcRegex.test(input.value)) {
        isValid = false;
        errorMessage = "Please enter a valid 3 or 4 digit CVC";
      }
      break;

    case "expiry":
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!expiryRegex.test(input.value)) {
        isValid = false;
        errorMessage = "Please enter a valid expiry date (MM/YY)";
      } else {
        const [month, year] = input.value.split("/");
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (
          parseInt(year) < currentYear ||
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)
        ) {
          isValid = false;
          errorMessage = "Card has expired";
        }
      }
      break;

    case "zip":
      // Canadian postal code regex: A1A 1A1 or A1A1A1
      const postalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      if (!postalRegex.test(input.value.trim())) {
        isValid = false;
        errorMessage = "Please enter a valid Canadian postal code (A1A 1A1)";
      }
      break;

    default:
      if (!input.value.trim()) {
        isValid = false;
        errorMessage = "This field is required";
      }
  }

  // Update error message
  errorElement.textContent = errorMessage;

  // Update input styling
  input.classList.toggle("invalid", !isValid);

  return isValid;
}

// Email sending function (using EmailJS)
async function sendOrderConfirmation(orderData) {
  // You'll need to sign up for EmailJS and add your service ID and template ID
  const serviceID = "YOUR_SERVICE_ID";
  const templateID = "YOUR_TEMPLATE_ID";
  const userID = "YOUR_USER_ID";

  const templateParams = {
    to_email: orderData.email,
    to_name: orderData.name,
    order_details: formatOrderDetails(orderData.order),
    total: calculateTotal(orderData.order),
  };

  // If you want to use EmailJS, uncomment this code and add your credentials
  /*
  try {
    await emailjs.send(serviceID, templateID, templateParams, userID);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
  */

  // For now, just log the email data
  console.log(
    "Order confirmation email would be sent with data:",
    templateParams
  );
}

// Helper function to format order details for email
function formatOrderDetails(order) {
  return order
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return `${product.name} (${item.size}) × ${item.qty} - $${
        getProductPrice(item.size) * item.qty
      }`;
    })
    .join("\n");
}

// Helper function to calculate total
function calculateTotal(order) {
  return order.reduce((total, item) => {
    return total + getProductPrice(item.size) * item.qty;
  }, 0);
}

// Add shipping method update function
function updateShippingMethod(method) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let subtotal = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) return;
    const price = getProductPrice(item.size);
    subtotal += price * item.qty;
  });

  const shippingCost = method === 'express' ? 15.99 : (subtotal >= 50 ? 0 : 8.99);
  const tax = subtotal * 0.15;
  const total = subtotal + shippingCost + tax;

  const summaryDiv = document.getElementById("checkout-summary-details");
  const shippingLine = summaryDiv.querySelector('div:nth-child(2)');
  const totalLine = summaryDiv.querySelector('div:nth-child(5)');

  shippingLine.innerHTML = `Shipping: <b>$${shippingCost.toFixed(2)}</b> ${subtotal >= 50 && method === 'standard' ? '(Free shipping!)' : ''}`;
  totalLine.innerHTML = `Estimated Total: $${total.toFixed(2)}`;
}
