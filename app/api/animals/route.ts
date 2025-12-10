import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  if (!params.id) {
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
          id: params.id,
          name: "cat"
      }
  })
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (typeof (body) === "string") {
            return NextResponse.json({
                status: 500,
                description: "OK",
                data: {
                    "error": "request body not json format",
                }
            })
        }
        if (body.name === undefined || body.name === null || body.name === '') {
            return NextResponse.json({
                status: 400,
                description: "invalid input",
                data: {
                    error: 'name is required',
                }
            })
        }else if (body.name === 'dog') {
            return NextResponse.json({
                status: 400,
                description: "invalid input",
                data: {
                    error: 'name is found',
                }
            })
        }
        return NextResponse.json({
            status: 200,
            description: "OK",
            data: body
        })
    } catch (e) {
        return NextResponse.json({
            status: 500,
            description: "OK",
            data: {
                "error": "request body not json format",
            }
        })
    }
}
