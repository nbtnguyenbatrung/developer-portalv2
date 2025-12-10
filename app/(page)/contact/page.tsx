'use client'

import {ScrollReveal} from "@/components/scroll-reveal";

export default function Home() {
    return (
        <main className="w-full bg-background">
            {/* content */}
            <ScrollReveal>
            <div className="py-12 max-w-[1920px] mx-auto">
                <div className="mainbo grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-right">
                        <img className="innerh w-full h-96 object-cover" src="/IMG_3440.png"
                             alt="anh1"/>
                    </div>
                    <div id="main" className="main-contact">
                        <p className="text-2xl font-bold">CÔNG TY CỔ PHẦN THANH TOÁN QUỐC GIA VIỆT NAM (NAPAS).</p>
                        <fieldset className="mt-4">
                            <form action="/contact" method="post" encType="multipart/form-data">
                                <fieldset className="hidden"></fieldset>
                                <dl className="mx-auto bg-white shadow-xs rounded-lg py-3 px-4 space-y-4 border border-neutral-300 text-napas-font-color-primary">
                                    <div className="border-b border-neutral-300 pb-4 text-neutral-900">
                                        <dt className="font-semibold text-lg">Trụ sở chính:</dt>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-map-marker text-red-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">Tầng 2 - 17 - 18, Tòa nhà Pacific Place, 83B Lý Thường
                                            Kiệt, Hoàn Kiếm, Hà Nội
                                        </dd>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-phone text-green-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">024 3936 1818</dd>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-fax text-blue-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">024 3936 1819</dd>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-chrome text-purple-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">
                                            <a href="https://www.napas.com.vn/"
                                               className="text-blue-600 hover:underline">www.napas.com.vn</a>
                                        </dd>
                                    </div>
                                    <div className="border-t pt-4 pb-4 border-b border-neutral-300 text-neutral-900">
                                        <dt className="font-semibold text-lg">
                                            Văn phòng đại diện:
                                        </dt>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-map-marker text-red-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">Phòng 909, Lầu 9, Sài Gòn Tower, 29 Lê duẩn, Phường Bến
                                            Nghé, Quận 1, TP Hồ Chí Minh
                                        </dd>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-phone text-green-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">028 3825 1386</dd>
                                    </div>
                                    <div className="flex space-x-2">
                                        <dt className="w-6">
                                            <i className="fa fa-fax text-blue-500" aria-hidden="true"></i>
                                        </dt>
                                        <dd className="mb-0">028 3911 7155</dd>
                                    </div>
                                </dl>
                            </form>
                        </fieldset>
                    </div>
                </div>
            </div>
            </ScrollReveal>
        </main>
    )
}
