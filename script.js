// Lazy Loading für Bilder
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
});

// Einfaches Warenkorb-System
const cart = [];
const cartButton = document.querySelectorAll('.add-to-cart');
const cartDisplay = document.querySelector('#cart-items');

cartButton.forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.dataset.productId;
        addToCart(productId);
        updateCartDisplay();
    });
});

function addToCart(productId) {
    const productIndex = cart.findIndex(product => product.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
}

function updateCartDisplay() {
    if (cart.length > 0) {
        let cartHtml = '';
        cart.forEach(item => {
            cartHtml += `<p>Produkt ID: ${item.id} | Menge: ${item.quantity}</p>`;
        });
        cartDisplay.innerHTML = cartHtml;
    } else {
        cartDisplay.innerHTML = '<p class="text-lg">Ihr Warenkorb ist leer.</p>';
    }
}

// Checkout Button (nur ein Platzhalter für echte Zahlungsintegration)
const checkoutButton = document.querySelector('#checkout-button');
checkoutButton.addEventListener('click', function () {
    alert('Weiter zur Kasse - Zahlungsintegration erforderlich!');
});
