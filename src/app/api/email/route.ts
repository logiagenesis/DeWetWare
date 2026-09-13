import { NextResponse } from "next/server";
import { sendEmail, smtpConfigured } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { to?: string; subject?: string; text?: string; html?: string; test?: boolean };
    if (!smtpConfigured()) return NextResponse.json({ error: "SMTP not configured", configured: false }, { status: 503 });
    const to = payload.test ? process.env.SMTP_TEST_TO : payload.to;
    if (!to || !payload.subject || !payload.text) return NextResponse.json({ error: payload.test ? "SMTP_TEST_TO is not configured" : "to, subject and text are required" }, { status: 400 });
    await sendEmail({ to, subject: payload.subject, text: payload.text, html: payload.html });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send email";
    return NextResponse.json({ error: message, configured: smtpConfigured() }, { status: message === "SMTP not configured" ? 503 : 500 });
  }
}
