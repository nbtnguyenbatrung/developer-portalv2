"use server"

import { readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const headers = req.headers;

        const language = headers.get("Accept-Language");
        const fullPath = join(process.cwd(), "public", "hero-section")

        // Đọc nội dung từng file
        const filePath = join(fullPath, language + ".json");
        const content = await readFile(filePath, "utf-8")
        const heroSection = JSON.parse(content)

        return NextResponse.json(heroSection)
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
