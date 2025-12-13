'use client'

import React, {useEffect, useState} from 'react';
import { ChevronDown } from 'lucide-react';
import {Faq} from "@/types/api";
import LogoSpinner from "@/components/logo-spinner";
import {useLanguage} from "@/contexts/language-context";
import Link from "next/link";
import {useApiPublic} from "@/hooks/use-api-public";

// @ts-ignore
const FAQItem = ({question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">{question}</h3>
                <ChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
            </div>
        </div>
    );
};

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number>(0);
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const {t, language} = useLanguage()
    const {call} = useApiPublic()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)

            try {
                const faqData = await call("get", `/api/faq`)
                setFaqs(faqData)
            } catch (error) {
                console.error("Failed to load hero data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [language])

    if (isLoading) {
        return(
            <section className="h-screen flex items-center justify-center py-4 md:py-6 lg:py-6 sm: scroll-mt-20">
                <LogoSpinner />
            </section>
        )
    }

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? 0 : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t("askQuestion")}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {t("contentSearch")}
                    </p>
                </div>

                {/* FAQ List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index + 1}
                            question={faq.question}
                            answer={faq.content}
                            isOpen={openIndex === (index + 1)}
                            onClick={() => toggleFAQ(index + 1)}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">{t("notFoundQuestion")}</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                        <Link
                            href="/contact"
                            className="font-medium transition-colors hover:text-foreground/80"
                        >
                            {t("contactWe")}
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
