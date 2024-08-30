import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${`c4cd278034abe4a6e2da5433ab82861d`}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching geocoded data");
    return new Response("Error fetching geocoded data", { status: 500 });
  }
}
