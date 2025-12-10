'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'
import {useLanguage} from "@/contexts/language-context";

export default function Footer() {
    const {t, language} = useLanguage()
  return (
    <footer className="border-t bg-background"　id={"footer"}>
      <div className="container py-8 md:py-12">
        <div className="flex items-center justify-start gap-3 text-left">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">
                {t("napas")}
            </h2>
              {
                  language === "vi" &&
                  <p className="text-sm text-gray-600">
                      National Payment Corporation of Vietnam
                  </p>
              }
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{t("headquarters")}</h2>
            <p className="text-sm text-gray-600">
                {t("address")}: Tầng 2, tầng 17 và tầng 18 tòa nhà Pacific Place, 83B phố
              Lý Thường Kiệt, Cửa Nam, Hà Nội.
            </p>
            <p className="text-sm text-gray-600">Tel: 024 3936 1818</p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">{t("representativeOffice")}</h2>
            <p className="text-sm text-gray-600">
                {t("address")}: Lầu 9, Sài Gòn Tower, 29 Lê Duẩn, Phường Sài Gòn, thành
              phố Hồ Chí Minh.
            </p>
            <p className="text-sm text-gray-600">Tel: 0283 911 7155</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-4 mr-5">
              <Link
                href="https://www.facebook.com/NapasVietnam/"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.03 5.66 21.13 10.44 21.98v-6.99H7.9v-2.92h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.84h2.74l-.44 2.92h-2.3v6.99C18.34 21.13 22 17.03 22 12.07z" />
                </svg>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCc5yR3KB47BSHkuNSzvl8dQ"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.5 6.2c-.3-1.1-1.2-1.9-2.3-2.1C18.7 3.7 12 3.7 12 3.7s-6.7 0-9.2.4C1.7 4.3.8 5.1.5 6.2.1 7.9 0 10 0 10s0 2.1.5 3.8c.3 1.1 1.2 1.9 2.3 2.1 2.6.4 9.2.4 9.2.4s6.7 0 9.2-.4c1.1-.3 2-1 2.3-2.1.5-1.7.5-3.8.5-3.8s0-2.1-.5-3.8zM9.8 14.5V5.5l6.5 4.5-6.5 4.5z" />
                </svg>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} by Napas Corporation. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
