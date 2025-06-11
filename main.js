// Sample products
const products = [
  {
    id: "cookie-monster",
    name: "cookie monster",
    image: "images/cookie monster.png",
    description: "A playful blue pot for your favorite plant.",
    tags: ["fun", "blue", "character"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
  },
  {
    id: "shy-guy",
    name: "shy guy",
    image: "images/shy guy.png",
    description: "A bashful pot for a subtle statement.",
    tags: ["shy", "red", "character"],
    sizes: ["Small", "Medium"],
    inStock: true,
  },
  {
    id: "aquamarine",
    name: "aquamarine",
    image: "images/aquamarine.png",
    description: "Cool tones for a calming vibe.",
    tags: ["blue", "aqua", "modern"],
    sizes: ["Medium", "Large"],
    inStock: false,
  },
  {
    id: "picnic-in-the-park",
    name: "picnic in the park",
    image: "images/picnic in the park.png",
    description: "Perfect for a sunny windowsill.",
    tags: ["picnic", "yellow", "outdoor"],
    sizes: ["Small", "Large"],
    inStock: true,
  },
  {
    id: "flower-power",
    name: "flower power",
    image: "images/flower power.png",
    description: "Groovy floral vibes.",
    tags: ["flower", "groovy", "colorful"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
  },
  {
    id: "garden-party",
    name: "garden party",
    image: "images/garden party.png",
    description: "For your next plant soirée.",
    tags: ["garden", "party", "green"],
    sizes: ["Medium", "Large"],
    inStock: false,
  },
  {
    id: "intergalactic",
    name: "intergalactic",
    image: "images/intergalactic.png",
    description: "Out of this world style.",
    tags: ["space", "galaxy", "purple"],
    sizes: ["Small", "Medium"],
    inStock: true,
  },
  {
    id: "lovestruck",
    name: "lovestruck",
    image: "images/lovestruck.png",
    description: "For the plant you love most.",
    tags: ["love", "pink", "heart"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
  },
  {
    id: "moon-river",
    name: "moon river",
    image: "images/moon river.png",
    description: "Dreamy and serene.",
    tags: ["moon", "river", "blue"],
    sizes: ["Large"],
    inStock: true,
  },
  {
    id: "spidey-senses",
    name: "spidey senses",
    image: "images/spidey senses.png",
    description: "A web of style for your shelf.",
    tags: ["spider", "red", "fun"],
    sizes: ["Small", "Medium"],
    inStock: true,
  },
  {
    id: "funny-bunny",
    name: "funny bunny",
    image: "images/funny bunny.png",
    description: "Hop into spring with this pot.",
    tags: ["bunny", "spring", "cute"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
  },
  {
    id: "rainbow-sherbet",
    name: "rainbow sherbet",
    image: "images/rainbow sherbet.png",
    description: "A swirl of color for your plant.",
    tags: ["rainbow", "colorful", "sweet"],
    sizes: ["Small", "Medium"],
    inStock: true,
  },
  {
    id: "secret-garden",
    name: "secret garden",
    image: "images/secret garden.png",
    description: "A magical home for your plant.",
    tags: ["secret", "garden", "mystery"],
    sizes: ["Medium", "Large"],
    inStock: true,
  },
  {
    id: "ocean-eyes",
    name: "ocean eyes",
    image: "images/ocean eyes.png",
    description: "Deep blue for ocean lovers.",
    tags: ["ocean", "blue", "calm"],
    sizes: ["Small", "Large"],
    inStock: true,
  },
  {
    id: "under-the-sea",
    name: "under the sea",
    image: "images/under the sea.png",
    description: "Dive into style.",
    tags: ["sea", "aqua", "marine"],
    sizes: ["Small", "Medium", "Large"],
    inStock: true,
  },
  {
    id: "queen-of-hearts",
    name: "queen of hearts",
    image: "images/queen of hearts.png",
    description: "Rule your plant kingdom.",
    tags: ["queen", "hearts", "red"],
    sizes: ["Medium", "Large"],
    inStock: true,
  },
  {
    id: "violet-visions",
    name: "violet visions",
    image: "images/violet visions.png",
    description: "Purple dreams for your plant.",
    tags: ["violet", "purple", "dreamy"],
    sizes: ["Small", "Medium"],
    inStock: true,
  },
].map((p) => ({ ...p, sizes: ["Small", "Medium", "Large"] }));

// Add inStock property to all products
products.forEach((p) => {
  if (p.inStock === undefined) {
    p.inStock = Math.random() > 0.2; // 80% chance of being in stock
  }
});

let selectedProduct = null;
let selectedSize = null;
let searchTerm = "";
let selectedTag = "";
let sortDirection = 1; // 1: ascending, -1: descending

// Get all unique tags
const allTags = [...new Set(products.flatMap((p) => p.tags))].sort();

// Initialize tag filter dropdown
function initializeTagFilter() {
  const tagFilter = document.getElementById("tag-filter");
  allTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
    tagFilter.appendChild(option);
  });
}

function getProductPrice(size) {
  if (size === "Small") return 10;
  if (size === "Medium") return 20;
  if (size === "Large") return 30;
  return 0;
}

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  // Filter and sort products
  let filtered = products.filter((product) => {
    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (
        !(
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          (product.tags &&
            product.tags.some((tag) => tag.toLowerCase().includes(term)))
        )
      ) {
        return false;
      }
    }

    // Tag filter
    if (selectedTag && !product.tags.includes(selectedTag)) {
      return false;
    }

    return true;
  });

  // Sort by name (always sorted)
  filtered.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortDirection * nameA.localeCompare(nameB);
  });

  if (filtered.length === 0) {
    list.innerHTML =
      '<div style="grid-column: 1/-1; text-align: center; color: #888; font-size: 1.2rem; margin-top: 2rem;">No pots found.</div>';
    return;
  }

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    if (!product.inStock) {
      card.classList.add("out-of-stock");
    }
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        ${
          !product.inStock
            ? '<div class="out-of-stock-label">Out of Stock</div>'
            : ""
        }
      </div>
      <div class="product-name">${product.name}</div>
      <div class="product-card-price-row" style="display:none;text-align:center;font-weight:600;color:var(--primary-dark);margin-top:0.2rem;margin-bottom:0.1rem;font-size:1.08rem;"></div>
      <div class="product-card-sizes">
        ${product.sizes
          .map(
            (size) => `
          <button class="size-btn" data-size="${size}" ${
              !product.inStock ? "disabled" : ""
            }>${size[0]}</button>
        `
          )
          .join("")}
      </div>
      <button class="add-btn" data-id="${product.id}" title="Add to Cart" ${
      !product.inStock ? "disabled" : ""
    }>
        ${product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    `;

    let selectedCardSize = product.sizes[0];
    const priceRow = card.querySelector(".product-card-price-row");
    priceRow.style.display = "block";

    const updateCardPrice = () => {
      priceRow.textContent = `$${getProductPrice(selectedCardSize)}`;
      card.querySelectorAll(".size-btn").forEach((btn) => {
        btn.classList.toggle("selected", btn.dataset.size === selectedCardSize);
      });
    };

    card.querySelectorAll(".size-btn").forEach((btn) => {
      if (!btn.disabled) {
        btn.onclick = (e) => {
          e.stopPropagation();
          selectedCardSize = btn.dataset.size;
          updateCardPrice();
        };
      }
    });

    updateCardPrice();

    const addBtn = card.querySelector(".add-btn");
    if (!addBtn.disabled) {
      addBtn.onclick = (e) => {
        e.stopPropagation();
        addToCart(product.id, selectedCardSize);
        showAddToCartFeedbackModal(product.name, selectedCardSize);
      };
    }

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
  const cart = getCart();
  const cartItem = cart.find((i) => i.id === productId);
  selectedSize = cartItem ? cartItem.size : product.sizes[0];
  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-image").alt = product.name;
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-product-description").textContent =
    product.description;
  // Price above sizes
  document.getElementById(
    "modal-product-price"
  ).textContent = `$${getProductPrice(selectedSize)}`;
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
    sizeBtn.textContent = size[0];
    sizeBtn.disabled = !product.inStock;
    sizeBtn.onclick = (e) => {
      e.stopPropagation();
      if (!product.inStock) return;
      selectedSize = size;
      // Update price and highlight only, do not re-call openProductModal
      document.getElementById(
        "modal-product-price"
      ).textContent = `$${getProductPrice(selectedSize)}`;
      sizesDiv.querySelectorAll(".size-btn").forEach((btn) => {
        btn.classList.toggle("selected", btn.textContent === size[0]);
      });
    };
    sizesDiv.appendChild(sizeBtn);
  });

  // Update add to cart button state
  const addToCartBtn = document.getElementById("modal-add-to-cart");
  addToCartBtn.disabled = !product.inStock;
  addToCartBtn.textContent = product.inStock ? "Add to Cart" : "Out of Stock";
  if (!product.inStock) {
    addToCartBtn.classList.add("disabled");
  } else {
    addToCartBtn.classList.remove("disabled");
  }

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
  if (!product || !product.inStock) return; // Prevent adding out of stock items
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
  if (selectedProduct && selectedSize && selectedProduct.inStock) {
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
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.innerHTML = "";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return "";
      const price = getProductPrice(item.size);
      total += price * item.qty;
      return `
      <div class="cart-item">
        <div>
          <strong>${product.name}</strong>
          <div style="font-size: 0.9rem; color: #666;">Size: ${item.size} × ${
        item.qty
      }</div>
        </div>
        <div style="display: flex; align-items: center;">
          <div class="cart-item-quantity">
            <button class="quantity-btn" data-action="decrease" data-id="${
              item.id
            }" data-size="${item.size}">-</button>
            <span class="quantity">${item.qty}</span>
            <button class="quantity-btn" data-action="increase" data-id="${
              item.id
            }" data-size="${item.size}">+</button>
          </div>
          <div style="margin: 0 1rem;">$${price * item.qty}</div>
          <button class="remove-btn" data-id="${item.id}" data-size="${
        item.size
      }" title="Remove">&times;</button>
        </div>
      </div>
    `;
    })
    .join("");

  cartTotal.innerHTML = `
    <div class="cart-total">
      <span>Total:</span>
      <span>$${total}</span>
    </div>
  `;

  // Add quantity control handlers
  cartItems.querySelectorAll(".quantity-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      const size = btn.dataset.size;
      const item = cart.find((i) => i.id === id && i.size === size);
      if (!item) return;

      const newQty = action === "increase" ? item.qty + 1 : item.qty - 1;
      if (newQty > 0) {
        updateCartItemQuantity(id, size, newQty);
      } else if (newQty === 0) {
        removeFromCart(id, size);
      }
    };
  });

  // Add remove button handlers
  cartItems.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.onclick = () => {
      removeFromCart(btn.dataset.id, btn.dataset.size);
    };
  });
}

function updateCartItemQuantity(productId, size, newQty) {
  let cart = getCart();
  const item = cart.find((i) => i.id === productId && i.size === size);
  if (item) {
    item.qty = newQty;
    setCart(cart);
    renderCart();
  }
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

// Listen for search input
window.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  if (searchBar) {
    searchBar.addEventListener("input", function (e) {
      searchTerm = e.target.value;
      renderProducts();
    });
  }

  // Tag filter
  const tagFilter = document.getElementById("tag-filter");
  if (tagFilter) {
    initializeTagFilter();
    tagFilter.addEventListener("change", function (e) {
      selectedTag = e.target.value;
      renderProducts();
    });
  }

  // Sort button
  const sortBtn = document.getElementById("sort-btn");
  if (sortBtn) {
    // Set initial sort icon
    const sortIcon = document.getElementById("sort-icon");
    sortIcon.textContent = "↑";

    sortBtn.addEventListener("click", function () {
      sortDirection = -sortDirection; // Toggle between 1 and -1
      const sortIcon = document.getElementById("sort-icon");
      sortIcon.textContent = sortDirection === 1 ? "↑" : "↓";
      renderProducts();
    });
  }
});

// Initial render
renderProducts();
updateCartCount();

// Update cart count when adding/removing items
function updateCart() {
  renderCart();
  updateCartCount();
}
