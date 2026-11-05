import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { formatInTimeZone } from 'date-fns-tz'

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readField(body: Record<string, unknown>, key: string): string {
  const value = body[key]
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const name = readField(body, 'name')
  const email = readField(body, 'email')
  const subject = readField(body, 'subject')
  const message = readField(body, 'message')

  if (
    !name ||
    !message ||
    !EMAIL_PATTERN.test(email) ||
    name.length > 200 ||
    email.length > 254 ||
    subject.length > 200 ||
    message.length > 10000
  ) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message)
  const now = new Date()

  const osloTime = formatInTimeZone(now, 'Europe/Oslo', 'dd')
  const day = parseInt(osloTime, 10)

  const formattedDate = formatInTimeZone(
    now,
    'Europe/Oslo',
    `HH:mm, MMMM d'${getOrdinalSuffix(day)}' yyyy`
  )

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'VinTech Contact Form <no-reply@vintech.no>',
      to: 'contact@vintech.no',
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: 'Helvetica', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                border-bottom: 2px solid #2a2a2a;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .logo {
                font-size: 22px;
                font-weight: bold;
                color: #2a2a2a;
                margin-bottom: 5px;
              }
              .message-container {
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                margin-top: 15px;
                white-space: pre-line;
              }
              .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #2a2a2a;
                text-align: center;
                border-top: 1px solid #eee;
                padding-top: 10px;
              }
              .info-row {
                margin-bottom: 10px;
              }
              .label {
                font-weight: bold;
                min-width: 100px;
                display: inline-block;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">VinTech</div>
              <div>New Website Contact Form Submission</div>
            </div>
            
            <div class="info-row">
              <span class="label">Date:</span> ${formattedDate}
            </div>
            
            <div class="info-row">
              <span class="label">Name:</span> ${safeName}
            </div>
            
            <div class="info-row">
              <span class="label">Email:</span> <a href="mailto:${safeEmail}">${safeEmail}</a>
            </div>
            
            ${subject ? `<div class="info-row"><span class="label">Subject:</span> ${safeSubject}</div>` : ''}
            
            <div class="info-row">
              <div class="label">Message:</div>
              <div class="message-container">${safeMessage}</div>
            </div>
            
            <div class="footer">
              This email was sent from the contact form on vintech.no
            </div>
          </body>
        </html>
      `
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
