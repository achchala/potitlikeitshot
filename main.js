// Sample products
const products = [
  {
    id: "3",
    name: "Classic Pot",
    image: "images/3.png",
    description:
      "A beautiful classic pot for your plants. Made from high-quality ceramic, perfect for indoor and outdoor use.",
    tags: ["ceramic", "indoor", "classic"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "4",
    name: "Modern Planter",
    image: "images/4.png",
    description:
      "Contemporary design for modern homes. Lightweight and durable.",
    tags: ["modern", "lightweight", "indoor"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "5",
    name: "Minimalist Vase",
    image: "images/5.png",
    description:
      "Minimalist vase for a modern look. Perfect for single stems or small bouquets.",
    tags: ["minimalist", "vase", "decor"],
    sizes: ["One Size"],
  },
  {
    id: "6",
    name: "Hanging Planter",
    image: "images/6.png",
    description:
      "Perfect for hanging plants indoors or outdoors. Includes rope for easy hanging.",
    tags: ["hanging", "outdoor", "rope"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "7",
    name: "Geometric Pot",
    image: "images/7.png",
    description: "Geometric design for a modern touch.",
    tags: ["geometric", "modern", "decor"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "8",
    name: "Rustic Pot",
    image: "images/8.png",
    description: "Rustic charm for your garden.",
    tags: ["rustic", "outdoor", "garden"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "9",
    name: "Patterned Planter",
    image: "images/9.png",
    description: "Patterned for a unique look.",
    tags: ["patterned", "unique", "indoor"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "10",
    name: "Large Floor Pot",
    image: "images/10.png",
    description: "Perfect for large plants.",
    tags: ["large", "floor", "statement"],
    sizes: ["Large"],
  },
  {
    id: "11",
    name: "Textured Pot",
    image: "images/11.png",
    description: "Textured finish for added style.",
    tags: ["textured", "style", "decor"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "12",
    name: "Oval Planter",
    image: "images/12.png",
    description: "Oval shape for a modern look.",
    tags: ["oval", "modern", "indoor"],
    sizes: ["Medium", "Large"],
  },
  {
    id: "13",
    name: "Colorful Pot",
    image: "images/13.png",
    description: "Brighten up your space.",
    tags: ["colorful", "bright", "decor"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "14",
    name: "Classic White Pot",
    image: "images/14.png",
    description: "Classic white for any decor.",
    tags: ["classic", "white", "indoor"],
    sizes: ["Small", "Medium", "Large"],
  },
  {
    id: "15",
    name: "Tiny Succulent Pot",
    image: "images/15.png",
    description: "Perfect for succulents.",
    tags: ["succulent", "tiny", "indoor"],
    sizes: ["Tiny"],
  },
  {
    id: "16",
    name: "Woven Basket Pot",
    image: "images/16.png",
    description: "Woven basket style.",
    tags: ["woven", "basket", "boho"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "17",
    name: "Tall Planter",
    image: "images/17.png",
    description: "Tall for statement plants.",
    tags: ["tall", "statement", "modern"],
    sizes: ["Large"],
  },
  {
    id: "18",
    name: "Speckled Pot",
    image: "images/18.png",
    description: "Speckled finish for a unique look.",
    tags: ["speckled", "unique", "decor"],
    sizes: ["Small", "Medium"],
  },
  {
    id: "19",
    name: "Boho Pot",
    image: "images/19.png",
    description: "Boho style for a relaxed vibe.",
    tags: ["boho", "relaxed", "indoor"],
    sizes: ["Medium", "Large"],
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
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <button class="add-btn" data-id="${product.id}" title="Add to Cart">+</button>
    `;
    card.querySelector(".add-btn").onclick = (e) => {
      e.stopPropagation();
      addToCart(product.id, product.sizes[0]);
      showAddToCartFeedbackModal(product.name, product.sizes[0]);
    };
    card.onclick = () => openProductModal(product.id);
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
