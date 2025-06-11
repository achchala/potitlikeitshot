// Cart modal functionality
document.addEventListener("DOMContentLoaded", function() {
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");

  // Open cart modal
  if (cartBtn) {
    cartBtn.addEventListener("click", function() {
      renderCart();
      cartModal.classList.remove("hidden");
      cartModal.classList.add("visible");
    });
  }

  // Close cart modal
  if (closeCart) {
    closeCart.addEventListener("click", function() {
      cartModal.classList.remove("visible");
      cartModal.classList.add("hidden");
    });
  }

  // Close cart modal when clicking outside
  if (cartModal) {
    cartModal.addEventListener("click", function(e) {
      if (e.target === cartModal) {
        cartModal.classList.remove("visible");
        cartModal.classList.add("hidden");
      }
    });
  }
}); 