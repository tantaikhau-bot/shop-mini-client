const products = [
  { name: "Silk Relaxed Shirt", price: "890.000đ", badge: "Mới", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=85" },
  { name: "Tailored Blazer", price: "1.890.000đ", badge: "Best Seller", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" },
  { name: "Merino Knit Polo", price: "1.290.000đ", badge: "Mới", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=85" },
  { name: "Ribbed Knit Sweater", price: "1.190.000đ", badge: "", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=85" },
  { name: "Wool Overcoat", price: "2.990.000đ", badge: "Best Seller", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85" }
];
let cartCount = 0;
document.querySelector('#product-grid').innerHTML = products.map((product) => `<article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" />${product.badge ? `<span class="badge">${product.badge}</span>` : ''}<button class="heart" aria-label="Thêm ${product.name} vào yêu thích">♡</button></div><h3>${product.name}</h3><p>${product.price}</p></article>`).join('');
document.addEventListener('click', (event) => { if (!event.target.matches('[data-add], .heart')) return; cartCount += 1; document.querySelector('#cart-count').textContent = cartCount; event.target.textContent = event.target.matches('.heart') ? '♥' : '✓'; });
document.querySelector('#year').textContent = new Date().getFullYear();
