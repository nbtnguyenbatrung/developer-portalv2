import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMethodColor(method: string) {
    switch (method) {
        case "GET":
            return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
        case "POST":
            return "bg-green-500/20 text-green-300 border border-green-500/30"
        case "PUT":
            return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        case "DELETE":
            return "bg-red-500/20 text-red-300 border border-red-500/30"
        case "PATCH":
            return "bg-purple-500/20 text-purple-300 border border-purple-500/30"
        default:
            return "bg-slate-500/20 text-slate-300 border border-slate-500/30"
    }
}
