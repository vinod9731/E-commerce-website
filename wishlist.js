// Add item to wishlist
function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert('Item added to wishlist');
    } else {
        alert('Item is already in wishlist');
    }
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    const item = document.querySelector(`.wishlist-item img[src*="${productId}"]`).closest('.wishlist-item');
    if (item) {
        item.remove();
    }

    // Show empty message if wishlist is empty
    const emptyMessage = document.getElementById('empty-message');
    if (document.getElementById('wishlist-items').children.length === 0) {
        emptyMessage.style.display = 'block';
    }
}

// Load wishlist items
document.addEventListener('DOMContentLoaded', () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistContainer = document.getElementById('wishlist-items');
    const emptyMessage = document.getElementById('empty-message');

    const products = {
        'product-1': { name: 'Red Printed Tshirt', price: '$50.00', img: 'images/product-1.jpg', page: 'product1.html' },
        'product-4': { name: 'Blue Printed Tshirt', price: '$65.00', img: 'images/product-4.jpg', page: 'product4.html' },
        'black-hoddie': { name: 'Black Hoodie', price: '$90.00', img: 'images/black-hoddie.jpg', page: 'product5.html' },
        'product-6': { name: 'Black Tshirt', price: '$40.00', img: 'images/product-6.jpg', page: 'product6.html' },
        'p-2': { name: 'Men Relaxed Fit T-Shirt', price: '$55.00', img: 'images/p-2.jpg', page: 'product2.html' },
        'p-5': { name: 'Men Print Oversized Fit T-Shirt', price: '$69.00', img: 'images/p-5.jpg', page: 'product5.html' },
        'p-3': { name: 'Colourblock Polo T-Shirt', price: '$59.00', img: 'images/p-3.jpg', page: 'product3.html' },
        'p-4': { name: 'Men Floral Polo T-Shirt', price: '$75.00', img: 'images/p-4.jpg', page: 'product4.html' },
        'p-6': { name: 'Men Graphic Print T-Shirt', price: '$85.00', img: 'images/p-6.jpg', page: 'product6.html' }
    };

    if (wishlist.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        wishlist.forEach(productId => {
            const product = products[productId];
            if (product) {
                const item = document.createElement('div');
                item.className = 'wishlist-item';
                item.innerHTML = `
                    <a href="${product.page}">
                        <img src="${product.img}" alt="${product.name}">
                        <div>
                            <h4>${product.name}</h4>
                            <p>${product.price}</p>
                        </div>
                    </a>
                    <i class="fa fa-trash remove-wishlist" onclick="removeFromWishlist('${productId}')"></i>
                `;
                wishlistContainer.appendChild(item);
            }
        });
    }
});

// Redirect to search
function redirectToSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href =`store.html?search=${encodeURIComponent(query)}`;
    }
}
