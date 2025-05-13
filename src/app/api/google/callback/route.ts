import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Parse the query parameters from the URL
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    return NextResponse.json({
      message: "Google callback route reached successfully!",
      data: params, // You can access query params like: params.code, params.state, etc.
    });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
