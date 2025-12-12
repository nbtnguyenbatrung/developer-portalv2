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
  } catch (e: any) {
    const responseToLog = e.response
      ? {
          status: e.response.status,
          headers: e.response.headers,
          data: e.response.data,
        }
      : {
          code: e.code,
          message: e.message,
        };

    console.log("error :>> ", JSON.stringify(responseToLog));

    const errorStatus = e.response?.status || 500;
    const errorData = e.response?.data || { error: e.code };

    return NextResponse.json({
      status: errorStatus,
      description: "Fail",
      data: errorData,
    });
  }
}
