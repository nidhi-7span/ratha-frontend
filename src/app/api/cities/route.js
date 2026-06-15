import { NextResponse } from "next/server";
import { getCities } from "@/services/carService";

export async function GET() {
  try {
    const cities = await getCities();
    return NextResponse.json({ data: cities });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 502 }
    );
  }
}
