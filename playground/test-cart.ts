import { products } from "../src/data/products.ts";
import { addToCart, calcTotal, countItems, removeFromCart, updateQuantity } from "../src/utils/cart.ts";
import type { CartItem } from "../src/utils/cart.ts";
import { formatPrice } from "../src/utils/format.ts";
import { filterProducts, getCategories, groupByCategory, searchByPriceRange } from "../src/utils/product.ts";

let cart: CartItem[] = [];
cart = addToCart(cart, products[0]);
cart = addToCart(cart, products[0], 2);
cart = addToCart(cart, products[3]);
console.log("Số sản phẩm:", countItems(cart));
console.log("Tổng tiền:", formatPrice(calcTotal(cart)));

cart = updateQuantity(cart, products[0].id, 1);
cart = removeFromCart(cart, products[3].id);
console.log(cart.map((item) => `${item.product.name} x${item.quantity}`));
console.log("Danh mục:", getCategories(products));
console.log("Điện tử, giá tăng dần:", filterProducts(products, { category: "Điện tử", sort: "asc" }).map((product) => product.name));
console.log("Tìm 'áo', tối đa 300k:", filterProducts(products, { keyword: "áo", maxPrice: 300000 }).map((product) => product.name));
console.log("Từ 200k đến 500k:", searchByPriceRange(products, 200000, 500000).map((product) => product.name));
console.log("Số sản phẩm theo danh mục:", groupByCategory(products));
