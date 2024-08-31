import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Missing latitude or longitude", { status: 400 });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      return new Response("API key is missing", { status: 500 });
    }

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in getting pollution data:", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
