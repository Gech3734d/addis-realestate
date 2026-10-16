import { NextResponse } from "next/server";
import { addProperty, getProperties } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ properties: getProperties() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const required = ["title", "location", "status", "type", "price", "area", "description"];
    for (const field of required) if (body[field] === undefined || body[field] === "") return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    if (!["For Sale", "For Rent"].includes(body.status)) return NextResponse.json({ error: "Invalid listing status" }, { status: 400 });
    if (Number(body.price) <= 0 || Number(body.area) <= 0) return NextResponse.json({ error: "Price and area must be positive" }, { status: 400 });
    const property = addProperty({
      title: String(body.title).trim(), location: String(body.location).trim(), status: body.status, type: body.type,
      price: Number(body.price), area: Number(body.area), beds: Math.max(0, Number(body.beds || 0)),
      baths: Math.max(0, Number(body.baths || 0)), image: body.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: String(body.description).trim()
    });
    return NextResponse.json({ property }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 });
  }
}
