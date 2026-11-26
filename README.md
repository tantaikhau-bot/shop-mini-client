# ShopMini / LUNORA

Website thời trang tĩnh, xây dựng bằng HTML, CSS và JavaScript thuần. Dự án cũng có thư viện TypeScript từ Lab 2 để chuẩn bị tích hợp React ở các buổi sau.

## Xem website

Mở `index.html` bằng trình duyệt hoặc tiện ích **Live Server** trong Visual Studio Code.

## Kiểm tra bài Lab 2

Node.js 22.18+ có thể chạy trực tiếp các file TypeScript:

```powershell
node playground/es6.ts
node playground/test-cart.ts
```

Các hàm TypeScript nằm trong `src/utils/`:

- `format.ts`: định dạng tiền Việt Nam.
- `product.ts`: lọc, sắp xếp, nhóm và tìm sản phẩm theo khoảng giá.
- `cart.ts`: thêm, xóa, đổi số lượng, đếm và tính tổng giỏ hàng mà không làm thay đổi dữ liệu cũ.
