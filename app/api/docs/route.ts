"use server"

import {readFile} from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";
import {Document} from "@/types/api";

export async function GET(req: NextRequest) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    try {
        const searchParams = req.nextUrl.searchParams;
        const headers = req.headers;

        const language = headers.get("Accept-Language");
        const category = searchParams.get("category") || "";
        const fullPath = join(process.cwd(), "public", `docs/${language}` )

        // Đọc nội dung từng file
        const filePath = join(fullPath, "doc.json");
        const content = await readFile(filePath, "utf-8")
        const data: Document[] = JSON.parse(content)

        return NextResponse.json(data.filter(item => item.category === category))
    } catch (error) {
        console.error("[napas] Error reading JSON files:", error)
        throw error
    }
}
