---
title: "Digital Payment Platform"
author: "NAPAS - Công ty Thanh toán Quốc gia Việt Nam"
date: "2025-12-13"
version: "1.0"
category: "digital-payment-platform"
language: "vi"
apiDocument: [{
    "name": "Napas Digital Payment Platform",
    "defaultVersion": "1.2",
    "slug": "digital-payment-platform"
},{
  "name": "Napas Digital Payment Platform",
  "defaultVersion": "1.2",
  "slug": "digital-payment-platform-for-issuer"
},{
  "name": "Napas API Specification DPP Token Vault (Part 02 - Payment)",
  "defaultVersion": "1.2",
  "slug": "digital-payment-platform-token-vault"
}]
apiTest: []
---

![NAPAS Digital_Payment_Platform](/introduce/dpp_images.png)

## Giới thiệu tổng quan

NAPAS DPP là hạ tầng kỹ thuật để kết nối, truyền dẫn và xử lý dữ liệu điện tử các giao dịch thanh toán trực tuyến của NAPAS.

NAPAS DPP kết nối khách hàng, đơn vị chấp nhận thanh toán với ngân hàng, chi nhánh ngân hàng nước ngoài, công ty tài chính được phép phát hành thẻ tín dụng,
tổ chức cung ứng dịch vụ trung gian thanh toán nhằm hỗ trợ khách hàng thực hiện thanh toán trong giao dịch thương mại điện tử,
thanh toán hóa đơn điện tử và các dịch vụ thanh toán điện tử khác.

---

## Tính năng nổi bật

- Thanh toán bằng thẻ/tài khoản
- Thanh toán/nạp tiền bằng token thẻ/token tài khoản
- Thanh toán bằng mã VietQRPay
- Thanh toán bằng ứng dụng của Ngân hàng/Trung gian thanh toán
- Thanh toán bằng ApplePay
- Giải pháp xác thực 3DS

---

## Giới hạn truy cập (Rate Limit) theo Gói

| Tên gói       | Giới hạn tốc độ | Giới hạn số lượng |
|:--------------| :---------------- | :-------------------- |
| Basic plan    | 50 request/s | 10000 request/ngày |
| Standard plan | 300 request/s | 30000 request/ngày |
| Premium       | 150 request/s | 70000 request/ngày |


