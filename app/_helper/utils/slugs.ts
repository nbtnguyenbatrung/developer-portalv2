export const productSlugs = {
    "open-banking": {
        vi: "open-banking",
        en: "open-banking"
    },
    "digital-payment-platform":{
        vi: "digital-payment-platform",
        en: "digital-payment-platform"
    },
    "napas-domestic-card": {
        vi: "the-noi-dia-napas",
        en: "napas-domestic-card"
    },
    "the-noi-dia-napas": {
        vi: "the-noi-dia-napas",
        en: "napas-domestic-card"
    },
    "napas-fastfund-247-service-featured-service":{
        vi: "dich-vu-chuyen-tien-nhanh-247",
        en: "napas-fastfund-247-service-featured-service"
    },
    "dich-vu-chuyen-tien-nhanh-247":{
        vi: "dich-vu-chuyen-tien-nhanh-247",
        en: "napas-fastfund-247-service-featured-service"
    },
    "napas-fastfund-247-with-vietqr-code-service":{
        vi: "dich-vu-chuyen-tien-nhanh-napas-247-bang-ma-vietqr",
        en: "napas-fastfund-247-with-vietqr-code-service"
    },
    "dich-vu-chuyen-tien-nhanh-napas-247-bang-ma-vietqr":{
        vi: "dich-vu-chuyen-tien-nhanh-napas-247-bang-ma-vietqr",
        en: "napas-fastfund-247-with-vietqr-code-service"
    }
};

// Lấy slug tương ứng ngôn ngữ mới
export function translateSlug(slug: string, targetLocale: string): string {
    // @ts-ignore
    const key = productSlugs[slug];
    if (!key) return slug; // fallback
    // @ts-ignore
    return key[targetLocale];
}
