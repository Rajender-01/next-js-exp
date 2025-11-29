import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const recaptchaVerifyURL = "https://www.google.com/recaptcha/api/siteverify";

    const secret = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SECRET_KEY;

    const response = await fetch(recaptchaVerifyURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    })

    const data = await response.json();
    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: data }, { status: 400 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }
}