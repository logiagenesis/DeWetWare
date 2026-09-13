import nodemailer from "nodemailer";

export type EmailPayload = { to: string; subject: string; text: string; html?: string };

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);
}

export async function sendEmail(payload: EmailPayload) {
  if (!smtpConfigured()) throw new Error("SMTP not configured");
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
  return transporter.sendMail({ from: process.env.SMTP_FROM, ...payload });
}
