import { NextResponse } from "next/server";
import { getCarsPaged } from "@/services/carService";

// Same-origin proxy for the client listing. Browser → /api/cars → Directus
// (server-to-server), which avoids CORS since the Directus instance does not
// allow the localhost/app origin directly.
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  let filters = {};
  try {
    filters = JSON.parse(searchParams.get("filters") || "{}");
  } catch {
    filters = {};
  }

  const sortBy = searchParams.get("sortBy") || "newest";
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";

  try {
    const result = await getCarsPaged({ filters, sortBy, page, search, city });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 502 }
    );
  }
}
