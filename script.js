// Sample product data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://via.placeholder.com/300x200",
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://via.placeholder.com/300x200",
        category: "electronics",
        description: "Feature-rich smartwatch with health tracking capabilities."
    },
    {
        id: 3,
        name: "Classic T-Shirt",
        price: 24.99,
        image: "https://via.placeholder.com/300x200",
        category: "fashion",
        description: "Comfortable cotton t-shirt in various colors."
    },
    // Add more products as needed
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        showNotification('Product added to cart!');
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showNotification('Product removed from cart!');
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load featured products
function loadFeaturedProducts() {
    const featuredProductsContainer = document.querySelector('.featured-products .row');
    if (featuredProductsContainer) {
        const featuredProducts = products.slice(0, 4); // Show first 4 products
        featuredProducts.forEach(product => {
            const productCard = `
                <div class="col-md-3 col-sm-6">
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            featuredProductsContainer.innerHTML += productCard;
        });
    }
}

// Newsletter form submission
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!');
                this.reset();
            }
        });
    }
    
    // Initialize cart badge
    updateCartBadge();
    
    // Load featured products
    loadFeaturedProducts();
}); 