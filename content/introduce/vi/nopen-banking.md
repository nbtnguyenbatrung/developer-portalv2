---
title: "Open Banking - NAPAS"
description: "Giải pháp Open Banking kết nối tập trung của NAPAS"
author: "NAPAS - Công ty Thanh toán Quốc gia Việt Nam"
date: "2024-12-13"
version: "1.0"
category: "Financial Technology"
tags: ["open-banking", "api", "fintech", "payment", "vietnam"]
language: "vi"
---

# Open Banking

![NAPAS Open Banking](banner-image.png)

## Giới thiệu tổng quan

NAPAS cung cấp giải pháp Open Banking theo mô hình kết nối tập trung, đóng vai trò cầu nối tin cậy giữa các tổ chức nắm giữ dữ liệu (DP) như ngân hàng, ví điện tử, tổ chức tín dụng và các bên thứ ba (TPP). 

Thông qua hạ tầng bảo mật này, TPP có thể truy cập thông tin tài khoản và sử dụng ý của người dùng để phát triển các dịch vụ gia tăng giá trị và nâng cao trải nghiệm khách hàng.

Giải pháp được xây dựng dựa trên kinh nghiệm quốc tế và nhìn cầu thực tiễn tại Việt Nam, hướng tới một nền tảng chia sẻ dữ liệu tài chính mở, có khả năng mở rộng và tương thích cao. Đồng thời đảm bảo tuân thủ đầy đủ quy định về an toàn bảo mật, chia sẻ dữ liệu và quyền riêng tư.

NAPAS ban hành bộ tiêu chuẩn kỹ thuật, pháp lý và quy định vận hành thống nhất, giúp đơn giản hóa tích hợp, tăng khả năng tương tác và thúc đẩy triển khai dịch vụ mới linh hoạt.

---

## Tính năng nổi bật

### 1. Kết nối duy nhất, tiêu chuẩn thống nhất

Tối ưu triển khai Open API với một kết nối, một chuẩn chung.

**Lợi ích:**
- Giảm thời gian và chi phí tích hợp
- Dễ dàng bảo trì và nâng cấp
- Đảm bảo tính nhất quán trên toàn hệ thống

### 2. Linh hoạt vai trò

Hỗ trợ đồng thời 02 vai trò Data Provider (DP) và Third Party Provider (TPP).

**Data Provider (DP):**
- Ngân hàng
- Ví điện tử  
- Tổ chức tín dụng
- Tổ chức cung cấp dữ liệu tài chính

**Third Party Provider (TPP):**
- Nhà cung cấp dịch vụ thanh toán
- Ứng dụng fintech
- Nền tảng quản lý tài chính cá nhân
- Dịch vụ gia tăng giá trị

### 3. AIS – Truy vấn thông tin tài khoản

Cung cấp số dư, chi tiết tài khoản, lịch sử giao dịch nhanh chóng, chính xác.

**Chức năng:**
- Xem số dư tài khoản real-time
- Truy vấn chi tiết giao dịch
- Lịch sử giao dịch theo khoảng thời gian
- Thông tin chi tiết tài khoản

### 4. PIS – Thanh toán tiện lợi

Khởi tạo giao dịch chuyển tiền, truy vấn trạng thái và hủy giao dịch dễ dàng.

**Chức năng:**
- Khởi tạo lệnh chuyển tiền
- Truy vấn trạng thái giao dịch
- Hủy giao dịch (nếu được phép)
- Xác nhận thanh toán

---

## Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────┐
│                     NAPAS OPEN BANKING                       │
│                  Nền tảng kết nối tập trung                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Gateway
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Banks (DP)   │    │E-Wallets (DP) │    │  Others (DP)  │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ • BIDV        │    │ • MoMo        │    │ • Insurance   │
│ • Techcombank │    │ • VNPay       │    │ • Securities  │
│ • VPBank      │    │ • ZaloPay     │    │ • Fintech     │
│ • MB Bank     │    │ • Others      │    │ • Others      │
│ • TPBank      │    │               │    │               │
│ • HDBank      │    │               │    │               │
│ • Others      │    │               │    │               │
└───────────────┘    └───────────────┘    └───────────────┘

        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Fintech Apps │    │   PFM Apps    │    │Payment Service│
│     (TPP)     │    │     (TPP)     │    │    (TPP)      │
└───────────────┘    └───────────────┘    └───────────────┘
```

### Các thành phần chính

**API Gateway:**
- Quản lý xác thực và phân quyền
- Rate limiting và monitoring
- Routing và load balancing

**Security Layer:**
- OAuth 2.0 / OpenID Connect
- API Key Management
- Encryption (TLS/SSL)
- Digital Signature

**Data Layer:**
- Chuẩn hóa dữ liệu
- Data mapping và transformation
- Audit log và compliance

---

## Đối tác tham gia

### Ngân hàng (Banks)

Hệ thống Open Banking của NAPAS hiện đang kết nối với các ngân hàng hàng đầu:

- **BIDV** - Ngân hàng Đầu tư và Phát triển Việt Nam
- **Techcombank** - Ngân hàng Thương mại Cổ phần Kỹ Thương Việt Nam
- **VPBank** - Ngân hàng Thương mại Cổ phần Việt Nam Thịnh Vượng
- **MB Bank** - Ngân hàng Thương mại Cổ phần Quân Đội
- **TPBank** - Ngân hàng Thương mại Cổ phần Tiên Phong
- **HDBank** - Ngân hàng Thương mại Cổ phần Phát triển Thành phố Hồ Chí Minh
- Và nhiều ngân hàng khác

### Ví điện tử (E-Wallets)

- Các nhà cung cấp ví điện tử được cấp phép
- Nền tảng thanh toán di động
- Payment gateway providers

### Tổ chức tài chính khác

- Công ty tài chính
- Tổ chức tín dụng
- Công ty chứng khoán
- Công ty bảo hiểm

---

## Tài liệu kỹ thuật

### API Documentation

Xem tài liệu chi tiết về các API endpoint:

**[Xem API →](https://napas.com.vn/api-docs)**

### API Testing & Sandbox

Truy cập môi trường sandbox để kiểm thử:

**[Kiểm thử API →](https://developer.napas.com.vn)**

### API Standards

- RESTful API Architecture
- JSON Data Format
- OAuth 2.0 Authentication
- OpenAPI 3.0 Specification

---

## Lợi ích

### Đối với Ngân hàng (Data Provider)

✅ **Mở rộng hệ sinh thái dịch vụ**
- Tiếp cận khách hàng mới thông qua đối tác TPP
- Tạo nguồn thu mới từ API economy

✅ **Tăng trải nghiệm khách hàng**
- Cung cấp dịch vụ đa dạng hơn
- Tích hợp liền mạch với ứng dụng bên thứ ba

✅ **Tiết kiệm chi phí**
- Kết nối một lần với NAPAS thay vì nhiều TPP
- Giảm chi phí vận hành và bảo trì

### Đối với TPP (Third Party Provider)

✅ **Truy cập dữ liệu an toàn**
- Chuẩn hóa API trên nhiều ngân hàng
- Đảm bảo bảo mật và tuân thủ

✅ **Phát triển sản phẩm nhanh**
- Tích hợp đơn giản với tài liệu đầy đủ
- Sandbox environment để testing

✅ **Mở rộng thị trường**
- Kết nối nhiều ngân hàng qua một API
- Tiếp cận hàng triệu khách hàng

### Đối với Người dùng cuối

✅ **Dịch vụ đa dạng, tiện lợi**
- Quản lý tài chính tập trung
- Thanh toán nhanh chóng, dễ dàng

✅ **Kiểm soát dữ liệu cá nhân**
- Quyền đồng ý/từ chối chia sẻ
- Minh bạch trong sử dụng dữ liệu

✅ **Trải nghiệm liền mạch**
- Tích hợp với nhiều ứng dụng yêu thích
- Không cần nhập lại thông tin nhiều lần

---

## Quy trình tích hợp

### Bước 1: Đăng ký

1. Đăng ký tài khoản developer tại [developer.napas.com.vn](https://developer.napas.com.vn)
2. Xác thực thông tin doanh nghiệp
3. Nhận API credentials (Client ID, Client Secret)

### Bước 2: Development

1. Đọc tài liệu API Documentation
2. Test trong môi trường Sandbox
3. Implement API calls vào ứng dụng
4. Handle authentication flow (OAuth 2.0)

### Bước 3: Testing

1. Test các use cases chính
2. Test error handling
3. Test security và performance
4. UAT với NAPAS team

### Bước 4: Go-live

1. Submit cho NAPAS review
2. Security audit và compliance check
3. Deploy lên production
4. Monitoring và support

---

## Bảo mật

### Authentication & Authorization

- **OAuth 2.0** - Industry standard protocol
- **OpenID Connect** - Identity layer
- **API Keys** - Application identification
- **JWT Tokens** - Secure information exchange

### Data Protection

- **TLS/SSL Encryption** - Data in transit
- **AES Encryption** - Sensitive data at rest
- **Tokenization** - Card/account numbers
- **Data Masking** - PII protection

### Compliance

- **PCI DSS** - Payment card security
- **GDPR** - Data privacy (if applicable)
- **SBV Regulations** - Vietnam central bank
- **ISO 27001** - Information security

---

## Liên hệ

### NAPAS - Công ty Thanh toán Quốc gia Việt Nam

**Trụ sở chính:**
- Địa chỉ: Tầng 6, Tòa nhà NAPAS, 44 Trần Thái Tông, Cầu Giấy, Hà Nội
- Website: [https://napas.com.vn](https://napas.com.vn)
- Hotline: 1900 xxxx

**Developer Support:**
- Developer Portal: [https://developer.napas.com.vn](https://developer.napas.com.vn)
- Email: developer@napas.com.vn
- Technical Support: support@napas.com.vn

**Business Inquiry:**
- Email: business@napas.com.vn
- Phone: (024) xxxx xxxx

---

## FAQ

### Câu hỏi thường gặp

**Q: Ai có thể sử dụng NAPAS Open Banking?**

A: Các tổ chức tài chính (ngân hàng, ví điện tử) và TPP (fintech, app developers) được cấp phép hoạt động tại Việt Nam.

**Q: Chi phí sử dụng như thế nào?**

A: Vui lòng liên hệ với NAPAS để được tư vấn chi tiết về mô hình phí phù hợp.

**Q: Thời gian tích hợp mất bao lâu?**

A: Tùy thuộc vào độ phức tạp, thường từ 2-4 tuần cho môi trường sandbox và 4-8 tuần để go-live.

**Q: NAPAS có hỗ trợ technical support không?**

A: Có, NAPAS cung cấp đầy đủ tài liệu, sandbox, và technical support team.

---

## Roadmap

### Q1 2025
- [ ] Mở rộng thêm 10 ngân hàng tham gia
- [ ] Thêm API cho Insurance sector
- [ ] Mobile SDK cho iOS và Android

### Q2 2025
- [ ] Hỗ trợ BSON format
- [ ] Real-time notification webhooks
- [ ] Advanced analytics dashboard

### Q3-Q4 2025
- [ ] Cross-border payment APIs
- [ ] AI-powered fraud detection
- [ ] GraphQL support

---

## Phiên bản

| Version | Date       | Changes                                    |
|---------|------------|--------------------------------------------|
| 1.0.0   | 2024-01-15 | Phiên bản đầu tiên - AIS & PIS APIs       |
| 1.1.0   | 2024-06-20 | Thêm confirmation of funds API            |
| 1.2.0   | 2024-09-10 | Performance improvements, Bug fixes        |
| 2.0.0   | 2024-12-13 | Major update - New authentication flow     |

---

## License & Terms

© 2024 NAPAS - Công ty Thanh toán Quốc gia Việt Nam. All rights reserved.

Việc sử dụng APIs và tài liệu này phải tuân thủ theo [Terms of Service](https://napas.com.vn/terms) và [Privacy Policy](https://napas.com.vn/privacy).

---

*Open Banking: Kết nối tương lai - Connecting the Future*