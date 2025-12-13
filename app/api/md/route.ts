"use server"

import { readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const searchParams = req.nextUrl.searchParams;
        const headers = req.headers;

        const language = headers.get("Accept-Language");
        const slug = searchParams.get("slug") || "";
        const fullPath = join(process.cwd(), "content", "introduce/" + language )

        // Đọc nội dung từng file
        const filePath = join(fullPath, slug + ".md");
        const content = await readFile(filePath, "utf-8")
        return new Response(content, {
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
            },
        })
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
