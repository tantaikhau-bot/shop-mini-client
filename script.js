const products = [
  { id: 1, name: "Áo thun basic", price: 150000, category: "Thời trang", icon: "👕", color: "#d9eee4", stock: 12 },
  { id: 2, name: "Quần jean slim", price: 420000, category: "Thời trang", icon: "👖", color: "#dce6fb", stock: 5 },
  { id: 3, name: "Tai nghe Bluetooth", price: 690000, category: "Điện tử", icon: "🎧", color: "#f9dfd7", stock: 0 },
  { id: 4, name: "Bình giữ nhiệt 500ml", price: 185000, category: "Gia dụng", icon: "🧃", color: "#f8edcb", stock: 20 },
  { id: 5, name: "Balo laptop 15 inch", price: 550000, category: "Phụ kiện", icon: "🎒", color: "#ded9f4", stock: 8 },
  { id: 6, name: "Chuột không dây", price: 245000, category: "Điện tử", icon: "🖱️", color: "#dbecef", stock: 15 }
];

const grid = document.querySelector("#product-grid");
const total = document.querySelector("#product-total");
const formatPrice = (price) => `${price.toLocaleString("vi-VN")}đ`;

function renderProducts(category = "Tất cả") {
  const visible = category === "Tất cả" ? products : products.filter((product) => product.category === category);
  total.textContent = `${visible.length} sản phẩm`;
  grid.innerHTML = visible.map((product) => `
    <article class="product-card">
      <div class="product-image" style="background:${product.color}">
        ${product.stock === 0 ? '<span class="sold-out">Hết hàng</span>' : ""}
        <span>${product.icon}</span>
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-bottom"><span class="price">${formatPrice(product.price)}</span>
          <button class="add-button" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>${product.stock === 0 ? "Hết hàng" : "+ Thêm"}</button>
        </div>
      </div>
    </article>`).join("");
}

let cartCount = 0;
document.querySelectorAll(".category").forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".category.selected").classList.remove("selected");
  button.classList.add("selected");
  renderProducts(button.dataset.category);
}));
grid.addEventListener("click", (event) => {
  if (!event.target.matches(".add-button:not(:disabled)")) return;
  cartCount += 1;
  document.querySelector("#cart-count").textContent = cartCount;
  event.target.textContent = "Đã thêm ✓";
  setTimeout(() => { event.target.textContent = "+ Thêm"; }, 900);
});
document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
