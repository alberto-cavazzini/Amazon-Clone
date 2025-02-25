export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const addedTimeouts = {};

export function addToCart(productId) {
    let matchingItem;

          cart.forEach((cartItem) => {
            if (productId === cartItem.productId) {
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
                quantity,
                deliveryOptionId: '1'
              });
            }

            saveToStorage();
  }

  export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    saveToStorage();
  }

  export function calculateCartQuantity() {
    let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;

  };

  export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    
    matchingItem.quantity = newQuantity;

    saveToStorage();
  }

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
         matchingItem = cartItem; 
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
  }

  export function getProduct(productId) {
    let matchingProduct;
    
      products.forEach((product) => {
        if(product.id === productId) {
          matchingProduct = product;            
        }
      });
    return matchingProduct;
  }
  
  class Product {
    id;
    image;
    name;
    rating;
    priceCents;
  
    constructor(productDetails) {
      this.id = productDetails.id;
      this.image = productDetails.image;
      this.name = productDetails.name;
      this.rating = productDetails.rating;
      this.priceCents = productDetails.priceCents;
    }
  
    getStarsUrl() {
      return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }
  
    getPrice() {
      return `$${formatCurrency(this.priceCents)}`;
    }
  
    extraInfoHTML() {
      return '';
    }
  }
  
  class Clothing extends Product {
    sizeChartLink;
  
    constructor(productDetails) {
      super(productDetails);
      this.sizeChartLink = productDetails.sizeChartLink;
    }
  
    extraInfoHTML() {
      //super.extraInfoHTML();
      return `
      <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
      `
    }
  }
  
  class Appliance extends Product {
    instructionsLink;
    warrantyLink;
  
    constructor(productDetails) {
      super(productDetails);
  
      this.instructionsLink = productDetails.instructionsLink;
      this.warrantyLink = productDetails.warrantyLink;
    }
  
    extraInfoHTML() {
      return `
      <a href="${this.instructionsLink}" target="_blank">Instructions</a>
      <a href="${this.warrantyLink}" target="_blank">Warranty</a>
      `
    }
  }
  
  /*
  const date = new Date();
  console.log(date);
  console.log(date.toLocaleTimeString());
  */
  /*
  console.log(this);
  
  const object2 = {
    a: 2,
    b: this.a
  };
  */
  /*
  function logThis() {
    console.log(this);
  }
  logThis();
  logThis.call('hello');
  
  this
  const object3 = {
    method: () => {
      console.log(this);
    }
  }
  object3.method();
  */
  
  export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
      console.log(xhr.response)  
      fun();
    })
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }