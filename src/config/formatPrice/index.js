const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount).replace("₫", "").trim(); // Loại bỏ ký hiệu "₫" và khoảng trắng thừa
};

export { formatCurrency };
