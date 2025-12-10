"use client"

import {useEffect, useMemo} from "react"

interface SidebarProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
    searchQuery: string
    leftHeight: number
}

const CATEGORIES = [
    { label: "Tất cả", code: "all" },
    { label: "Digital Payment Platform", code: "DPP" },
    { label: "Open banking", code: "OB" },
    /*{ label: "Napas Core", code: "NC" },
    { label: "Interbank Funds Transfer", code: "IBFT" }*/
]

export default function Sidebar({ selectedCategory, onSelectCategory, searchQuery, leftHeight }: SidebarProps) {

    const filteredServices = useMemo(() => {
        if (!searchQuery) return CATEGORIES

        const query = searchQuery.toLowerCase()
        return CATEGORIES?.filter(
            (category) =>
                category.label.toLowerCase().includes(query),
        );
    }, [searchQuery])

    useEffect(() => {
        if (filteredServices?.length > 0) {
            onSelectCategory(filteredServices[0].code);
        }
    }, [filteredServices]);

    return (
        <aside className="w-full bg-card border-r border-border overflow-y-auto overflow-x-hidden sticky top-0 p-4"
        style={{
            height: leftHeight
        }}>

            {/* Categories */}
            <nav className="space-y-2">
                {filteredServices.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectCategory(category.code)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 group ${
                            selectedCategory === category.code
                                ? "bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 scale-105"
                                : "text-foreground hover:bg-secondary hover:text-secondary-foreground"
                        }`}
                    >
                        <span className="text-sm font-medium truncate">{category.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}
