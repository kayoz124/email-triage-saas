import { NextResponse } from "next/server";

// Gmail OAuth routes - to be implemented by Jarvis
export async function GET() {
  return NextResponse.json(
    { message: "Gmail OAuth - not yet implemented" },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Gmail OAuth callback - not yet implemented" },
    { status: 501 }
  );
}
