"use server"

import { readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const fullPath = join(process.cwd(), "config", "rate-limit")

        // Đọc nội dung từng file
        const filePath = join(fullPath, "rateLimit.json");
        const content = await readFile(filePath, "utf-8")
        const data = JSON.parse(content)

        return NextResponse.json(data)
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
