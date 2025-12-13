"use server"

import { readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const headers = req.headers;

        const locale = headers.get("Accept-Language");
        const fullPath = join(process.cwd(), "config", "application")

        // Đọc nội dung từng file
        const filePath = join(fullPath, locale + ".json");
        const content = await readFile(filePath, "utf-8")
        const applicationI18n = JSON.parse(content)

        return NextResponse.json(applicationI18n)
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
