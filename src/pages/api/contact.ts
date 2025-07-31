import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
dotenv.config();

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { generateUserAcknowledgmentEmail, generateAdminNotificationEmail } from '@/utils/email-templates';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message, user_id, captchaToken } = req.body;

  if (!name || !email || !subject || !message || !captchaToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ✅ Verify reCAPTCHA
  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams();
    params.append('secret', process.env.RECAPTCHA_SECRET_KEY!);
    params.append('response', captchaToken);

    const captchaRes = await fetch(verifyURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const captchaData = await captchaRes.json();

    if (!captchaData.success || (captchaData.score !== undefined && captchaData.score < 0.5)) {
      return res.status(400).json({ error: 'Failed CAPTCHA verification' });
    }
  } catch (err) {
    console.error('CAPTCHA error:', err);
    return res.status(500).json({ error: 'Failed to verify reCAPTCHA' });
  }

  // ✅ Save to database
  const { data, error: dbError } = await supabase
    .from('contact_messages')
    .insert([{
      user_id: user_id || null,
      name,
      email,
      subject,
      message,
      status: 'unread',
    }])
    .select()
    .single();

  if (dbError) {
    console.error('Supabase error:', dbError);
    return res.status(500).json({ error: 'Failed to save message' });
  }

  try {
    await resend.emails.send({
      from: 'Travel Top10 <contact@traveltop10.in>',
      to: data.email,
      subject: '🌟 Thank you for contacting Travel Top10!',
      html: generateUserAcknowledgmentEmail(data),
    });

    await resend.emails.send({
      from: 'Travel Top10 <contact@traveltop10.in>',
      to: process.env.ADMIN_EMAIL!,
      subject: `🔔 New Contact Form Submission: ${data.subject}`,
      html: generateAdminNotificationEmail(data),
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.' 
    });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ 
      error: 'Failed to send emails',
      details: err.message 
    });
  }
}
