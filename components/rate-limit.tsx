import {useLanguage} from "@/contexts/language-context";
import {RateLimit} from "@/types/api";

interface RateLimitProps{
    rateLimits: RateLimit[];
}

export default function RateLimitView({rateLimits}: RateLimitProps) {

    const {t} = useLanguage()

    return (
        <>
            <h2 className="text-4xl font-semibold mb-4 ">
                {t("rateLimit")}
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-xs lg:text-lg">
                    <thead>
                        <tr className=" border-b-2 ">
                        <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                            {t("name")}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                            {t("throttle")}
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                            {t("quota")}
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        rateLimits.map((rateLimit, index) => (
                            <tr key={index} className="hover:bg-blue-50 hover:text-gray-900 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold ">{rateLimit.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {rateLimit.throttle} {rateLimit.unitThrottle}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {rateLimit.quota} {rateLimit.unitQuota}
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
