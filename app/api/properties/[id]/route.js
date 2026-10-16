import { NextResponse } from "next/server";
import { deleteProperty, getProperty, updateProperty } from "@/lib/data";

export async function GET(_request, { params }) {
  const { id } = await params;
  const property = getProperty(id);
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  return NextResponse.json({ property }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const existing = getProperty(id);
  if (!existing) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  try {
    const body = await request.json();
    const allowed = ["title", "location", "status", "type", "price", "area", "beds", "baths", "image", "description"];
    const patch = Object.fromEntries(Object.entries(body).filter(([key]) => allowed.includes(key)));
    if (patch.status && !["For Sale", "For Rent"].includes(patch.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    for (const key of ["price", "area", "beds", "baths"]) if (patch[key] !== undefined) patch[key] = Number(patch[key]);
    const property = updateProperty(id, patch);
    return NextResponse.json({ property });
  } catch { return NextResponse.json({ error: "Invalid JSON request body" }, { status: 400 }); }
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  if (!deleteProperty(id)) return NextResponse.json({ error: "Property not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
