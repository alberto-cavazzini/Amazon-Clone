export const cart = [];

export function addToCart(productId) {
    let matchingItem;

          cart.forEach((cartItem) => {
            if (productId === casrtItem.productId) {
               matchingItem = cartItem; 
            }
            });

            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            const quantity = Number(quantitySelector.value);

            const added = document.querySelector(`.js-added-to-cart-${productId}`);
            added.classList.add('added-to-cart-visible');
            
            const previousTimeoutId = addedTimeouts[productId];
            if (previousTimeoutId) {
              clearTimeout(previousTimeoutId);
            }
            const timeoutId = setTimeout(() => {
              added.classList.remove('added-to-cart-visible');
            }, 2000);

            addedTimeouts[productId] = timeoutId;

            if(matchingItem) {
              matchingItem.quantity += quantity;
            } else {
              cart.push({
                productId,
                quantity
               });
            }
  }