import { Resend } from "resend"
import { siteConfig } from "@/lib/site-config"
import { formatChicagoDateTime } from "@/lib/scheduler/timezone"

const FROM_EMAIL = "SuchGrime <hello@suchgrime.com>"

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

function notifyEmail(): string {
  return process.env.BOOKING_NOTIFY_EMAIL ?? siteConfig.contact.email
}

export interface BookingEmailData {
  name: string
  email: string
  company?: string | null
  phone?: string | null
  projectType?: string | null
  notes?: string | null
  slotStart: Date
}

export interface ContactEmailData {
  name: string
  email: string
  projectType?: string | null
  message?: string | null
}

export async function sendBookingConfirmation(data: BookingEmailData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const when = formatChicagoDateTime(data.slotStart)

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Strategy call confirmed — ${when}`,
      text: [
        `Hi ${data.name},`,
        ``,
        `Your strategy call with ${siteConfig.name} is confirmed.`,
        ``,
        `When: ${when}`,
        `Duration: 30 minutes`,
        ``,
        data.projectType ? `Project type: ${data.projectType}` : "",
        ``,
        `We'll send a calendar invite if needed. Reply to this email with any questions.`,
        ``,
        `— ${siteConfig.name}`,
      ]
        .filter(Boolean)
        .join("\n"),
    })
    return true
  } catch {
    return false
  }
}

export async function sendBookingAdminNotification(data: BookingEmailData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  const when = formatChicagoDateTime(data.slotStart)

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: notifyEmail(),
      subject: `New strategy call booking — ${data.name}`,
      text: [
        `New strategy call booked:`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : "",
        data.phone ? `Phone: ${data.phone}` : "",
        data.projectType ? `Project type: ${data.projectType}` : "",
        `When: ${when}`,
        data.notes ? `Notes: ${data.notes}` : "",
        ``,
        `View in admin: ${process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteConfig.domain}`}/admin/bookings`,
      ]
        .filter(Boolean)
        .join("\n"),
    })
    return true
  } catch {
    return false
  }
}

export async function sendContactNotification(data: ContactEmailData): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: notifyEmail(),
      subject: `New contact inquiry — ${data.name}`,
      replyTo: data.email,
      text: [
        `New contact form submission:`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.projectType ? `Project type: ${data.projectType}` : "",
        data.message ? `Message: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    })
    return true
  } catch {
    return false
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}
