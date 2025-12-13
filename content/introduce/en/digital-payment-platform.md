---
title: "Digital Payment Platform"
author: "NAPAS - Công ty Thanh toán Quốc gia Việt Nam"
date: "2025-12-13"
version: "1.0"
category: "digital-payment-platform"
language: "en"
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

![NAPAS Digital_Payment_Platform](/introduce/ob_images.png)

## Overview

NAPAS DPP is a technical infrastructure for connecting, transmitting and processing electronic data of NAPAS's online payment transactions. 

NAPAS DPP connects customers and payment acceptance units with banks, foreign bank branches, financial companies licensed to issue credit cards,
and payment intermediary service providers to support customers in making payments in e-commerce transactions,
electronic bill payments and other electronic payment services.

---

## Features

- Pay by card/account
- Pay/top up by card token/account token
- Pay by VietQRPay code
- Pay by Bank/Payment Intermediary application
- Pay by ApplePay
- 3DS authentication solution

---

## Rate Limit by Package

| Name          | Throttle | Quota              |
|:--------------| :----------- |:------------------|
| Basic plan    | 50 request/s | 10000 request/day  |
| Standard plan | 300 request/s | 30000 request/day  |
| Premium       | 150 request/s | 70000 request/day  |

