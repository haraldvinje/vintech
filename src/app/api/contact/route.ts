import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { formatISO } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  const currentDate = formatISO(new Date(), { representation: 'date' });
  
  try {
    await resend.emails.send({
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
              <span class="label">Date:</span> ${currentDate}
            </div>
            
            <div class="info-row">
              <span class="label">Name:</span> ${name}
            </div>
            
            <div class="info-row">
              <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
            </div>
            
            ${subject ? `<div class="info-row"><span class="label">Subject:</span> ${subject}</div>` : ''}
            
            <div class="info-row">
              <div class="label">Message:</div>
              <div class="message-container">${message}</div>
            </div>
            
            <div class="footer">
              This email was sent from the contact form on vintech.no
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}