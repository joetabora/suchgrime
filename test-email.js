// Quick test script to verify Resend is working
const { Resend } = require('resend');

const resend = new Resend('re_Rv25RwXf_AQv8SFWwE4TRQTLBciTDPfRZ');

async function testEmail() {
  try {
    const data = await resend.emails.send({
      from: 'SuchGrime Contact <onboarding@resend.dev>',
      to: 'suchgrime@guerrillasocialclub.com',
      subject: 'Test Email from Contact Form Setup',
      html: '<h1>Test Email</h1><p>If you receive this, Resend is working correctly!</p>',
    });

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data.id);
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error);
  }
}

testEmail();

