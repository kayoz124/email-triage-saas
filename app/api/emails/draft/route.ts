import { NextResponse } from "next/server";

// AI draft reply generation - to be implemented by Jarvis
export async function POST() {
  return NextResponse.json(
    { message: "Draft reply generation - not yet implemented" },
    { status: 501 }
  );
}
