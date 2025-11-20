import { NextResponse } from "next/server";

const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`;

export async function POST(req: Request) {
  const data = await req.json(); 
  const payload = {
    fields: [
      { name: "name", value: data.name },
      { name: "email", value: data.email },
      { name: "message", value: data.message }
    ],
    context: { pageUri: data.pageUri || "", pageName: "Contact page" }
  };

  const res = await fetch(HUBSPOT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ message: "HubSpot error: " + text }, { status: res.status });
  }
  return NextResponse.json({ message: "ok" });
}
