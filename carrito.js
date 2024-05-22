document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.querySelector('.minicart-inner');
    const cartTotal = document.querySelector('.m-total span');
    const cartAmount = document.querySelector('.js-amount-produc');
    let total = 0;
    let amount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            const cartItem = document.createElement('div');
            cartItem.classList.add('minicart-item');
            cartItem.innerHTML = `
                <span>${name}</span>
                <span>S/ ${price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += price;
            cartTotal.textContent = total.toFixed(2);

            amount++;
            cartAmount.textContent = amount;

            // Mostrar el carrito después de agregar un producto
            cartContainer.style.display = 'block';
        });
    });

    // Toggle para mostrar/ocultar el carrito
    const cartToggle = document.getElementById('cart-toggle');

    cartToggle.addEventListener('click', () => {
        if (cartContainer.style.display === 'none') {
            cartContainer.style.display = 'block';
        } else {
            cartContainer.style.display = 'none';
        }
    });

    // Cerrar el carrito al hacer clic en el botón de cerrar
    const cartClose = document.getElementById('cart-close');

    cartClose.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });
});