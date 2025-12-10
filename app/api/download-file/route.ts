"use server"

import {readdir, readFile} from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const searchParams = req.nextUrl.searchParams;
        const headers = req.headers;

        const language = headers.get("Accept-Language");
        const slug = searchParams.get("slug") || "";
        const fullPath = join(process.cwd(), "public", "download/" + language )

        // Đọc tất cả file trong thư mục
        let files = await readdir(fullPath)

        if (slug !== "") {
            files = files.filter((f) => f === slug + ".json")
        }

        if (files.length === 0) {
            return NextResponse.json([])
        }

        // Đọc nội dung từng file
        const filePath = join(fullPath, slug + ".json");
        const content = await readFile(filePath, "utf-8")
        const data = JSON.parse(content)

        return NextResponse.json(data)
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
