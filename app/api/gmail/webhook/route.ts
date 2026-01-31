import { NextResponse } from "next/server";

// Gmail webhook for push notifications - to be implemented by Jarvis
export async function POST() {
  return NextResponse.json(
    { message: "Gmail webhook - not yet implemented" },
    { status: 501 }
  );
}
