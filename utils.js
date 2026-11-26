// Bản JavaScript dùng trực tiếp trên website tĩnh.
// Logic tương ứng với src/utils/format.ts và src/utils/product.ts của Lab 2.
export function formatPrice(value) {
  return value.toLocaleString("vi-VN") + " đ";
}

export function filterProducts(products, filter = {}) {
  const { keyword = "", category, maxPrice, sort } = filter;
  const normalizedKeyword = keyword.trim().toLowerCase();
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(normalizedKeyword) &&
    (!category || product.category === category) &&
    (maxPrice === undefined || product.price <= maxPrice)
  );

  if (sort === "asc") return [...result].sort((a, b) => a.price - b.price);
  if (sort === "desc") return [...result].sort((a, b) => b.price - a.price);
  return result;
}
