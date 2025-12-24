import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, projectType, budget, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email using Resend
    console.log('Attempting to send email...')
    console.log('To:', 'suchgrime@guerrillasocialclub.com')
    console.log('From:', email)
    
    const result = await resend.emails.send({
      from: 'SuchGrime Contact <onboarding@resend.dev>',
      to: 'suchgrime@guerrillasocialclub.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${projectType ? `<p style="margin: 10px 0;"><strong>Project Type:</strong> ${projectType}</p>` : ''}
            ${budget ? `<p style="margin: 10px 0;"><strong>Budget:</strong> ${budget}</p>` : ''}
          </div>

          <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-left: 3px solid #000;">
            <p style="margin: 0 0 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Sent from SuchGrime contact form
          </p>
        </div>
      `,
    })

    console.log('Email sent successfully!')
    console.log('Result:', result)

    return NextResponse.json(
      { message: 'Form submitted successfully', emailId: result.data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try emailing us directly.' },
      { status: 500 }
    )
  }
}
