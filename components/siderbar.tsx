"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const menuItems = [
        { label: "Sản phẩm của Napas", href: "#" },
        { label: "Tài liệu", href: "#" },
        { label: "Support", href: "#" },
    ]

    return (
        <>
            {/* Overlay - increased z-index to 40 and darkened background */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={onClose}
                    aria-label="Close sidebar"
                />
            )}

            {/* Sidebar - increased z-index to 50 and added slide-in animation */}
            <aside
                className={`fixed left-0 top-0 h-full w-72 bg-background border-r border-border z-50 transform transition-all duration-300 ease-out md:hidden ${
                    isOpen ? "translate-x-0 opacity-100 animate-in slide-in-from-left-80" : "-translate-x-full opacity-0"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 via-blue-500 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            ⚡
                        </div>
                        <span className="font-semibold text-foreground text-lg">Napas</span>
                    </div>

                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-foreground hover:bg-muted transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" />
                    </Button>
                </div>

                {/* Content */}
                <nav className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Menu Items */}
                        <div className="space-y-3">
                            {menuItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="block px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* User Section */}
                        <div className="border-t border-border pt-6">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                                    N
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">Napas</p>
                                    <p className="text-sm text-muted-foreground">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-border">
                    <Button
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        onClick={onClose}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </aside>
        </>
    )
}
