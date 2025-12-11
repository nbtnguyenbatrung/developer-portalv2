'use server'

const fs = require('fs/promises')
const path = require('path')
import { readFile } from 'fs/promises'
import { isArray } from 'lodash'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params
  const body = await req.json()
  let version = body.version
  const slug = body.slug
  try {
    const fullPathData = join(process.cwd(), 'public', 'docs')

    // Đọc nội dung từng file
    const filePath = join(fullPathData, 'doc.json')
    const contentData = await readFile(filePath, 'utf-8')
    const dataDoc = JSON.parse(contentData)

    if (!dataDoc || !isArray(dataDoc))
      return NextResponse.json(
        { success: false, data: undefined, error: 'DataDoc Not found' },
        { status: 500 },
      )

    const doc = dataDoc.find((doc) => doc.slug === slug)

    if (!doc)
      return NextResponse.json(
        { success: false, data: undefined, error: 'Doc Not found' },
        { status: 500 },
      )

    if (!version) version = doc.defaultVersion

    // đọc dữ liệu file md để fill vào content
    const fullPath = path.join(
      process.cwd(),
      'public',
      `/md/${locale}/${doc.docName}-${version}.md`,
    )

    const content = await fs.readFile(fullPath, { encoding: 'utf8' })

    return NextResponse.json({
      ...doc,
      defaultVersion: version,
      content,
    })
  } catch (error: any) {
    // Xử lý lỗi nếu file không tồn tại hoặc không thể đọc được
    console.error(`Lỗi khi đọc file ${body.relativeFilePath}:`, error.message)
    // Có thể throw lại lỗi hoặc trả về null/chuỗi rỗng tùy mục đích
    throw new Error(`Không thể đọc file: ${body.relativeFilePath}`)
  }
}


export async function GET(req: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
    try {
        const { locale } = await params
        const fullPath = join(process.cwd(), "public", "docs")

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
