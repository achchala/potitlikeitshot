// Sample products
const products = [
  {
    id: "cookie-monster",
    name: "cookie monster",
    image: "images/cookie monster.png",
    description: "A playful blue pot for your favorite plant.",
    tags: ["fun", "blue", "character"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "shy-guy",
    name: "shy guy",
    image: "images/shy guy.png",
    description: "A bashful pot for a subtle statement.",
    tags: ["shy", "red", "character"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "aquamarine",
    name: "aquamarine",
    image: "images/aquamarine.png",
    description: "Cool tones for a calming vibe.",
    tags: ["blue", "aqua", "modern"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "picnic-in-the-park",
    name: "picnic in the park",
    image: "images/picnic in the park.png",
    description: "Perfect for a sunny windowsill.",
    tags: ["picnic", "yellow", "outdoor"],
    sizes: ["Small", "Large"],
  },
  {
    id: "flower-power",
    name: "flower power",
    image: "images/flower power.png",
    description: "Groovy floral vibes.",
    tags: ["flower", "groovy", "colorful"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "garden-party",
    name: "garden party",
    image: "images/garden party.png",
    description: "For your next plant soirée.",
    tags: ["garden", "party", "green"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "intergalactic",
    name: "intergalactic",
    image: "images/intergalactic.png",
    description: "Out of this world style.",
    tags: ["space", "galaxy", "purple"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "lovestruck",
    name: "lovestruck",
    image: "images/lovestruck.png",
    description: "For the plant you love most.",
    tags: ["love", "pink", "heart"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "moon-river",
    name: "moon river",
    image: "images/moon river.png",
    description: "Dreamy and serene.",
    tags: ["moon", "river", "blue"],
    sizes: ["Large"],
  },
  {
    id: "spidey-senses",
    name: "spidey senses",
    image: "images/spidey senses.png",
    description: "A web of style for your shelf.",
    tags: ["spider", "red", "fun"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "funny-bunny",
    name: "funny bunny",
    image: "images/funny bunny.png",
    description: "Hop into spring with this pot.",
    tags: ["bunny", "spring", "cute"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "rainbow-sherbet",
    name: "rainbow sherbet",
    image: "images/rainbow sherbet.png",
    description: "A swirl of color for your plant.",
    tags: ["rainbow", "colorful", "sweet"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "secret-garden",
    name: "secret garden",
    image: "images/secret garden.png",
    description: "A magical home for your plant.",
    tags: ["secret", "garden", "mystery"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "ocean-eyes",
    name: "ocean eyes",
    image: "images/ocean eyes.png",
    description: "Deep blue for ocean lovers.",
    tags: ["ocean", "blue", "calm"],
    sizes: ["Small", "Large"],
  },
  {
    id: "under-the-sea",
    name: "under the sea",
    image: "images/under the sea.png",
    description: "Dive into style.",
    tags: ["sea", "aqua", "marine"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "queen-of-hearts",
    name: "queen of hearts",
    image: "images/queen of hearts.png",
    description: "Rule your plant kingdom.",
    tags: ["queen", "hearts", "red"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "violet-visions",
    name: "violet visions",
    image: "images/violet visions.png",
    description: "Purple dreams for your plant.",
    tags: ["violet", "purple", "dreamy"],
    sizes: ["Small", "Medium"],
  },
];

let selectedProduct = null;
let selectedSize = null;

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <button class="add-btn" data-id="${product.id}" title="Add to Cart">+</button>
      </div>
      <div class="product-name">${product.name}</div>
    `;
    card.querySelector(".add-btn").onclick = (e) => {
      e.stopPropagation();
      addToCart(product.id, product.sizes[0]);
      showAddToCartFeedbackModal(product.name, product.sizes[0]);
    };
    card.querySelector(".product-image-container").onclick = () =>
      openProductModal(product.id);
    list.appendChild(card);
  });
}

function showAddToCartFeedbackModal(name, size) {
  let modal = document.createElement("div");
  modal.className = "feedback-modal";
  modal.innerHTML = `<div class="feedback-modal-content"><b>${name}</b> (${size}) added to cart!</div>`;
  document.body.appendChild(modal);
  setTimeout(() => {
    modal.remove();
  }, 1200);
}

function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  selectedProduct = product;
  // If previously selected size for this product, use it; else default to first
  const cart = getCart();
  const cartItem = cart.find((i) => i.id === productId);
  selectedSize = cartItem ? cartItem.size : product.sizes[0];
  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-image").alt = product.name;
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-description").textContent =
    product.description;
  document.getElementById("modal-product-price").textContent = `$${
    product.price ? product.price.toFixed(2) : ""
  }`;
  // Tags
  const tagsDiv = document.getElementById("modal-product-tags");
  tagsDiv.innerHTML = "";
  product.tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.className = "tag";
    tagEl.textContent = tag;
    tagsDiv.appendChild(tagEl);
  });
  // Sizes
  const sizesDiv = document.getElementById("modal-product-sizes");
  sizesDiv.innerHTML = "";
  product.sizes.forEach((size) => {
    const sizeBtn = document.createElement("button");
    sizeBtn.className = "size-btn" + (size === selectedSize ? " selected" : "");
    sizeBtn.textContent = size;
    sizeBtn.onclick = (e) => {
      e.stopPropagation();
      selectedSize = size;
      openProductModal(productId); // re-render to update selected
    };
    sizesDiv.appendChild(sizeBtn);
  });
  document.getElementById("product-modal").classList.remove("hidden");
}

document.getElementById("close-product-modal").onclick = function () {
  document.getElementById("product-modal").classList.add("hidden");
};

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  const cartSize = size || (product.sizes ? product.sizes[0] : "");
  const item = cart.find((i) => i.id === productId && i.size === cartSize);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: productId, size: cartSize, qty: 1 });
  }
  setCart(cart);
  renderCart();
}

document.getElementById("modal-add-to-cart").onclick = function () {
  if (selectedProduct && selectedSize) {
    addToCart(selectedProduct.id, selectedSize);
    showAddToCartFeedbackModal(selectedProduct.name, selectedSize);
    document.getElementById("product-modal").classList.add("hidden");
  }
};

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
      total += (product.price || 0) * item.qty;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${product.name} (${item.size}) x ${item.qty}</span>
        <span>$${((product.price || 0) * item.qty).toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.id}" data-size="${
        item.size
      }">&times;</button>
      `;
      div.querySelector(".remove-btn").onclick = () =>
        removeFromCart(item.id, item.size);
      itemsDiv.appendChild(div);
    });
  }
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter((item) => !(item.id === productId && item.size === size));
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
  const cartModal = document.getElementById("cart-modal");
  const productModal = document.getElementById("product-modal");
  if (event.target === cartModal) {
    cartModal.classList.add("hidden");
  }
  if (event.target === productModal) {
    productModal.classList.add("hidden");
  }
};

// Initial render
renderProducts();
updateCartCount();
