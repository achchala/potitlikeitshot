// Sample products
const products = [
  {
    id: "1",
    name: "Classic Pot",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "A beautiful classic pot for your plants",
  },
  {
    id: "2",
    name: "Modern Planter",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    description: "Contemporary design for modern homes",
  },
  {
    id: "3",
    name: "Minimalist Vase",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description: "Minimalist vase for a modern look",
  },
  {
    id: "4",
    name: "Hanging Planter",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Perfect for hanging plants indoors or outdoors",
  },
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">$${product.price.toFixed(2)}</div>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    card.querySelector("button").onclick = () => addToCart(product.id);
    list.appendChild(card);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  setCart(cart);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function renderCart() {
  const cart = getCart();
  const itemsDiv = document.getElementById("cart-items");
  itemsDiv.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    itemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;
      total += product.price * item.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${product.name} x ${item.qty}</span>
        <span>$${(product.price * item.qty).toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.id}">&times;</button>
      `;
      div.querySelector(".remove-btn").onclick = () => removeFromCart(item.id);
      itemsDiv.appendChild(div);
    });
  }
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  setCart(cart);
  renderCart();
}

document.getElementById("cart-btn").onclick = function () {
  renderCart();
  document.getElementById("cart-modal").classList.remove("hidden");
};
document.getElementById("close-cart").onclick = function () {
  document.getElementById("cart-modal").classList.add("hidden");
};

window.onclick = function (event) {
  const modal = document.getElementById("cart-modal");
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
};

// Initial render
renderProducts();
updateCartCount();
