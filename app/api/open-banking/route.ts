import { callApi } from "@/app/_service/utils/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const domain = "https://developer.napas.com.vn";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await axios.request({
      method: body.method,
      url: `${domain}${body.url}`,
      data: body.data,
      headers: body.header,
    });

    const result = res.data;
    return NextResponse.json({ status: 200, data: result });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      description: "OK",
      data: {
        error: "request body not json format",
      },
    });
  }
}
