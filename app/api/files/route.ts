"use server"

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        const nameFile = searchParams.get("nameFile") || "";
        const fullPath = join(process.cwd(), "public", "mock_data")

        // Đọc tất cả file trong thư mục
        let files = await readdir(fullPath)

        if (nameFile !== "") {
            files = files.filter((f) => f === nameFile + ".json")
        }

        // Đọc nội dung từng file
        const arr = await Promise.all(
            files.map(async (filename) => {
                const filePath = join(fullPath, filename)
                const content = await readFile(filePath, "utf-8")
                return JSON.parse(content)
            }),
        )
        return NextResponse.json(arr)
    } catch (error) {
        console.error("[v0] Error reading JSON files:", error)
        throw error
    }
}
