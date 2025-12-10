import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    if (!id) {
      return NextResponse.json({
          status: 404,
          description: "invalid param",
          data: {
              error: 'id is required',
          }
      })
  }
  return NextResponse.json({
      status: 200,
      description: "success",
      data: {
          id: id,
          name: "cat"
      }
  })
}
