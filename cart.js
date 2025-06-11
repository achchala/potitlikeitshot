// Shared cart functionality
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (e) {
    return [];
  }
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    if (badge) badge.textContent = count;
  });
}

// Update cart count when the page loads
document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
});

// Update cart count when storage changes (for multiple tabs/windows)
window.addEventListener("storage", function(e) {
  if (e.key === "cart") {
    updateCartCount();
  }
}); 