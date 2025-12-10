import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export { errorHandler };

async function errorHandler(err: Error | string) {
  const cookieStore = await cookies();
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const status = is404 ? 404 : 400;
    return NextResponse.json({ message: err }, { status });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    // jwt error - delete cookie to auto logout
    cookieStore.delete("authorization");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // default to 500 server error
  console.error(err);
  return NextResponse.json({ message: err.message }, { status: 500 });
}
