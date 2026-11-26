const { filterProducts, formatPrice } = window.ShopUtils;

const products = [
  { id: 1, name: "Silk Relaxed Shirt", price: 890000, category: "Nữ", stock: 12, badge: "Mới", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=85" },
  { id: 2, name: "Tailored Blazer", price: 1890000, category: "Nữ", stock: 3, badge: "Best Seller", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=85" },
  { id: 3, name: "Merino Knit Polo", price: 1290000, category: "Nam", stock: 0, badge: "Mới", image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=85" },
  { id: 4, name: "Ribbed Knit Sweater", price: 1190000, category: "Nữ", stock: 5, badge: "", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=85" },
  { id: 5, name: "Wool Overcoat", price: 2990000, category: "Nam", stock: 8, badge: "Best Seller", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=85" },
  { id: 6, name: "Signature Leather Bag", price: 1590000, category: "Phụ kiện", stock: 2, badge: "Mới", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85" }
];

const lowStockProducts = products.filter((product) => product.stock >= 1 && product.stock <= 5);
const storedCart = JSON.parse(localStorage.getItem("lunora-cart") || "[]");
let cartCount = storedCart.reduce((total, item) => total + item.quantity, 0);
let activeCategory = "";

function productCard(product) {
  const outOfStock = product.stock === 0;
  return `<article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy" />${product.badge ? `<span class="badge">${product.badge}</span>` : ""}${outOfStock ? '<span class="stock-badge sold-out">Hết hàng</span>' : product.stock <= 5 ? `<span class="stock-badge">Còn ${product.stock} sản phẩm</span>` : ""}<button class="heart" data-favorite="${product.id}" aria-label="Thêm ${product.name} vào yêu thích">♡</button></div><h3>${product.name}</h3><p>${formatPrice(product.price)}</p>${outOfStock ? '<button class="buy-button" disabled>Hết hàng</button>' : `<button class="buy-button" data-add="${product.id}">Thêm vào giỏ</button>`}</article>`;
}

function renderProducts() {
  const keyword = document.querySelector("#home-search")?.value || "";
  const maxPriceValue = document.querySelector("#home-price")?.value || "";
  const sort = document.querySelector("#home-sort")?.value || "";
  const visible = filterProducts(products, { keyword, category: activeCategory || undefined, maxPrice: maxPriceValue ? Number(maxPriceValue) : undefined, sort: sort || undefined });
  document.querySelector("#product-grid").innerHTML = visible.map(productCard).join("");
  document.querySelector("#home-product-count").textContent = `${visible.length} sản phẩm`;
}
renderProducts();
document.querySelector("#low-stock-grid").innerHTML = lowStockProducts.map(productCard).join("");
document.querySelectorAll("[data-home-filter]").forEach((button) => button.addEventListener("click", () => { document.querySelector("[data-home-filter].active").classList.remove("active"); button.classList.add("active"); activeCategory = button.dataset.homeFilter === "all" ? "" : button.dataset.homeFilter; renderProducts(); }));
document.querySelector("#home-search").addEventListener("input", renderProducts);
document.querySelector("#home-price").addEventListener("change", renderProducts);
document.querySelector("#home-sort").addEventListener("change", renderProducts);
document.addEventListener("click", (event) => {
  if (event.target.matches("[data-add]")) {
    const productId = Number(event.target.dataset.add);
    const savedCart = JSON.parse(localStorage.getItem("lunora-cart") || "[]");
    const current = savedCart.find((item) => item.id === productId);
    current ? current.quantity += 1 : savedCart.push({ id: productId, quantity: 1 });
    localStorage.setItem("lunora-cart", JSON.stringify(savedCart));
    cartCount += 1;
    document.querySelector("#cart-count").textContent = cartCount;
    event.target.textContent = "Đã thêm ✓";
    setTimeout(() => { event.target.textContent = "Thêm vào giỏ"; }, 800);
  }
  if (event.target.matches(".heart")) {
    const productId = Number(event.target.dataset.favorite);
    const savedFavorites = JSON.parse(localStorage.getItem("lunora-favorites") || "[]");
    const index = savedFavorites.indexOf(productId);
    index >= 0 ? savedFavorites.splice(index, 1) : savedFavorites.push(productId);
    localStorage.setItem("lunora-favorites", JSON.stringify(savedFavorites));
    event.target.textContent = event.target.textContent === "♡" ? "♥" : "♡";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
