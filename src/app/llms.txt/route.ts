import { NextResponse } from 'next/server';

const content = `# Nabda OTP

> Nabda OTP is the cheapest WhatsApp Business API for MENA and Turkey — unlimited messages, REST API, webhooks, media support, and a 5-day free trial starting from $10/month.

## What is Nabda OTP?

Nabda OTP provides a WhatsApp API gateway that allows businesses to send and receive WhatsApp messages programmatically via REST API and webhooks. It is designed specifically for the MENA region (Middle East and North Africa) and Turkey, offering the most affordable pricing in those markets.

## Core Features

- Unlimited WhatsApp messages (no per-message fees)
- REST API with full documentation
- Webhooks for incoming messages
- Media and document support (images, PDFs, voice)
- 5-day free trial, no credit card required
- Priority support
- Starting from $10/month

## Use Cases / Solutions

- OTP verification via WhatsApp (replaces SMS OTP)
- Order confirmations and delivery notifications
- Account security and two-factor authentication (2FA)
- Appointment reminders
- Customer support automation
- WhatsApp marketing campaigns

## Supported Countries

Egypt, Iraq, Saudi Arabia, UAE, Qatar, Jordan, Syria, Kuwait, Bahrain, Oman, Lebanon, Palestine, Yemen, Algeria, Morocco, Tunisia, Libya, Sudan, Germany, USA, Turkey.

## How It Compares

- Nabda OTP vs UltraMsg
- Nabda OTP vs Twilio
- Nabda OTP vs Official WhatsApp Business API
- Nabda OTP vs Bulk SMS
- Nabda OTP vs OTPiq
- Nabda OTP vs Other Alternatives

Nabda OTP is typically cheaper than all alternatives for MENA-based businesses, with no per-message pricing and a flat monthly subscription.

## Pricing

Flat monthly subscription starting from $10/month.
No per-message fees.
5-day free trial included.
No credit card required to start.

## API & Integration

- REST API (JSON)
- Webhook support for real-time message receiving
- Send text, images, documents, audio via API
- Simple authentication via API key
- Works with any backend: Node.js, Python, PHP, Laravel, etc.

## Languages Supported

- English (en)
- Arabic (ar)  
- Turkish (tr)

## Website

https://www.nabdaotp.com

## Contact & Support

Priority support included with all plans.
Contact via the website: https://www.nabdaotp.com

## Blog & Guides

- WhatsApp OTP for Iraq: https://www.nabdaotp.com/blogs/whatsapp-otp-iraq-guide
- WhatsApp Replacing SMS: https://www.nabdaotp.com/blogs/whatsapp-replacing-sms

## Legal

- Privacy Policy: https://www.nabdaotp.com/privacy-policy
- Terms of Service: https://www.nabdaotp.com/terms-of-service
- Refund Policy: https://www.nabdaotp.com/refund-policy
`;

export async function GET() {
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}