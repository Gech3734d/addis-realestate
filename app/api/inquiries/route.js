import { NextResponse } from "next/server";
import { addInquiry, getInquiries, getProperty } from "@/lib/data";

export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({ inquiries: getInquiries() }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message || !body.propertyId) return NextResponse.json({ error: "Name, email, message, and property are required." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    if (!getProperty(body.propertyId)) return NextResponse.json({ error: "That property no longer exists." }, { status: 404 });
    const inquiry = addInquiry({ name: String(body.name).trim(), email: String(body.email).trim(), message: String(body.message).trim(), propertyId: body.propertyId });
    return NextResponse.json({ inquiry }, { status: 201 });
  } catch { return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 }); }
}
