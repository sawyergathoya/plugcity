// Initialize cart in localStorage if not already present
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add item to cart
function addItemToCart(productName, price, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemFound = false;

    cart = cart.map(item => {
        if (item.name === productName) {
            item.quantity += quantity;
            itemFound = true;
        }
        return item;
    });

    if (!itemFound) {
        let item = {
            name: productName,
            price: price,
            quantity: quantity
        };
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    if (document.body.classList.contains('cart-page')) {
        loadCartItems();
    }
}

// Function to load cart items into the cart page
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    let total = 0;

    cartItems.innerHTML = '';

    cart.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>KES ${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-name="${item.name}">
            </td>
            <td>KES ${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-button" data-name="${item.name}">Remove</button></td>
        `;
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = `KES ${total.toFixed(2)}`;
    attachEventListeners();
}

// Function to update the total price in the cart
function updateCartTotal() {
    const cartItems = document.querySelectorAll('#cart-items tr');
    let total = 0;

    cartItems.forEach(item => {
        const priceElement = item.querySelector('td:nth-child(2)');
        const quantityElement = item.querySelector('.quantity-input');
        const totalElement = item.querySelector('td:nth-child(4)');

        const price = parseFloat(priceElement.textContent.replace('KES ', ''));
        const quantity = parseInt(quantityElement.value);
        const itemTotal = price * quantity;

        totalElement.textContent = `KES ${itemTotal.toFixed(2)}`;
        total += itemTotal;
    });

    document.getElementById('cart-total').textContent = `KES ${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeItem(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Function to update item quantity in the cart
function updateQuantity(name, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        if (item.name === name) {
            item.quantity = parseInt(quantity);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Attach event listeners to dynamically added elements
function attachEventListeners() {
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            if (input.value < 1) {
                input.value = 1;
            }
            updateQuantity(input.dataset.name, input.value);
            updateCartTotal();
        });
    });

    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', () => {
            removeItem(button.dataset.name);
        });
    });
}

// Load cart items when cart page is loaded
if (document.body.classList.contains('cart-page')) {
    loadCartItems();
}

// Event listener to add item to cart from product details page
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const productName = button.getAttribute('data-product-name');
            const price = parseFloat(button.getAttribute('data-product-price'));
            const quantity = parseInt(button.getAttribute('data-product-quantity')) || 1;
            addItemToCart(productName, price, quantity);
        });
    });
});
