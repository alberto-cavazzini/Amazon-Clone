import { renderOrderSummary } from "../../scripts/checkout.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import {renderCheckoutHeader} from "../../scripts/checkout/checkoutHeader.js"
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
    const producId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const producId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: producId1,
                quantity: 2,
                deliveryOptionId: '1'
              }, {
                productId: producId2,
                quantity: 1,
                deliveryOptionId: '2'
              }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    it('displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${producId1}`).innerText
            ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${producId2}`).innerText
            ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = '';
});

    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${producId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${producId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${producId2}`)
        ).not.toEqual(null);
        expect(
            cart.length
        ).toEqual(1);
        expect(cart[0].productId).toEqual(producId2);

        document.querySelector('.js-test-container').innerHTML = '';
    });
})