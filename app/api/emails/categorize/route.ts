import { NextResponse } from "next/server";

// AI email categorization - to be implemented by Jarvis
export async function POST() {
  return NextResponse.json(
    { message: "Email categorization - not yet implemented" },
    { status: 501 }
  );
}
