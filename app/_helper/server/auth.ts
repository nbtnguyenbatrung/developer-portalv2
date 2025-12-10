import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const auth = {
  isAuthenticated,
  verifyToken,
};

function isAuthenticated() {
  try {
    verifyToken();
    return true;
  } catch {
    return false;
  }
}

async function verifyToken() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const cookieToken = cookieStore.get("authorization")?.value ?? "";
  console.log("cookieToken", cookieToken);
  let headerToken;
  try {
    if (headersList.get("authorization")?.split(" ")[0] === "Bearer") {
      headerToken = headersList.get("authorization")?.split(" ")[1];
    }
  } catch (error) {
    console.error("error", error);
  }

  const token = headerToken?.trim() || cookieToken;

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const id = decoded.sub as string;
  console.log("id sau khi verify", id);

  return id;
}
