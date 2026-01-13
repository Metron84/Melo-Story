"use server";

import { redirect } from "next/navigation";

type SafeString = string & { readonly __brand: unique symbol };

function sanitize(input: FormDataEntryValue | null): SafeString {
  const value = typeof input === "string" ? input : "";
  return value.trim().slice(0, 2000) as SafeString;
}

export async function sendContact(formData: FormData) {
  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const message = sanitize(formData.get("message"));
  const nickname = sanitize(formData.get("nickname")); // honeypot

  if (nickname) {
    return redirect("/contact/thank-you?ok=1");
  }

  const subject = `Mr.Melo Contact — ${name || "Unknown"}`;

  const toEmails = [
    process.env.CONTACT_TO_EMAIL || "info@mrmelo.com",
    process.env.CONTACT_CC_EMAIL || "melo@mrmelo.com",
  ].filter(Boolean) as string[];

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "MrMelo <noreply@mrmelo.com>",
        to: toEmails,
        subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } else {
      console.warn("RESEND_API_KEY not set; skipping email send.");
    }
  } catch (error) {
    console.error("Failed to send contact email", error);
  }

  return redirect("/contact/thank-you?ok=1");
}


