# Contact Form Setup Guide

Your contact form now has the infrastructure in place. To make it send actual emails, choose one of these options:

## ✅ Option 1: Resend (Recommended - Free 100 emails/day)

**Why Resend?**
- Modern, clean API
- Free tier: 100 emails/day, 3,000/month
- Great for Next.js/Vercel
- Easy to set up

**Setup Steps:**

1. **Sign up at [resend.com](https://resend.com)**

2. **Get your API key** from the dashboard

3. **Install Resend:**
```bash
npm install resend
```

4. **Add API key to `.env.local`:**
```env
RESEND_API_KEY=re_your_api_key_here
```

5. **Update `/app/api/contact/route.ts`:**

Uncomment the Resend code block and update the imports:

```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, projectType, budget, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'SuchGrime Contact <onboarding@resend.dev>',
      to: 'suchgrime@guerrillasocialclub.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
```

6. **Add to Vercel environment variables:**
   - Go to your Vercel project settings
   - Add `RESEND_API_KEY` with your API key
   - Redeploy

7. **Verify domain (Optional but recommended):**
   - In Resend dashboard, verify `guerrillasocialclub.com`
   - Update the `from` email to use your domain
   - Change from `onboarding@resend.dev` to `contact@guerrillasocialclub.com`

---

## Option 2: SendGrid (Alternative)

**Setup Steps:**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key (free tier: 100 emails/day)
3. Install: `npm install @sendgrid/mail`
4. Add to `.env.local`: `SENDGRID_API_KEY=your_key`
5. Update the API route similarly to Resend

---

## Option 3: Formspree (Easiest - No code needed)

If you want the absolute easiest solution:

1. Go to [formspree.io](https://formspree.io)
2. Sign up and create a form
3. Get your form endpoint (e.g., `https://formspree.io/f/YOUR_ID`)
4. Update Contact.tsx to POST directly to that URL

---

## Testing

After setup, test the form:

1. Fill out the contact form on your site
2. Check your email inbox
3. Verify all fields are coming through correctly

## Environment Variables

Make sure to add your API keys to:
- `.env.local` for local development
- Vercel dashboard for production

**Never commit API keys to git!**

---

## Current Status

✅ Form UI is complete
✅ API route is created
✅ Error handling is in place
⏳ Email service integration needed (follow steps above)

