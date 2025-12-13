"use server"

import { readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";
import {Product} from "@/types/api";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const headers = req.headers;

        const language = headers.get("Accept-Language");
        const fullPath = join(process.cwd(), "config", "products")

        // Đọc nội dung từng file
        const filePath = join(fullPath, language + ".json");
        const content = await readFile(filePath, "utf-8")
        const heroSection: Product[] = JSON.parse(content)

        return NextResponse.json(heroSection.filter(product => product.active))
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
