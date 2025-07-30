import dotenv from 'dotenv';
dotenv.config();

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message, user_id } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error: dbError } = await supabase
    .from('contact_messages')
    .insert([
      {
        user_id: user_id || null,
        name,
        email,
        subject,
        message,
        status: 'unread',
      },
    ])
    .select()
    .single();

  if (dbError) {
    console.error('Supabase error:', dbError);
    return res.status(500).json({ error: 'Failed to save message' });
  }

  try {
    // ✅ Send acknowledgment email to user
    await resend.emails.send({
      from: 'Travel Top10 <noreply@traveltop10.in>',
      to: data.email,
      subject: 'Thank you for contacting Travel Top10!',
      html: `
        <table style="width: 100%; font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <tr>
            <td>
              <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <img src="https://traveltop10.in/logo.png" alt="Travel Top10 Logo" style="width: 150px; margin-bottom: 20px;" />
                <h2 style="color: #1a202c;">Hi ${data.name},</h2>
                <p>Thank you for reaching out to <strong>Travel Top10</strong>. We've received your message and will get back to you shortly.</p>
                <hr style="margin: 20px 0;" />
                <p><strong>Subject:</strong> ${data.subject}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px; color: #555;">${data.message}</blockquote>
                <p>We appreciate your interest and look forward to assisting you.</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>Travel Top10 Team</strong></p>
                <hr style="margin: 30px 0;" />
                <div style="text-align: center;">
                  <a href="https://facebook.com/Top10Travel" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" />
                  </a>
                  <a href="https://instagram.com/traveltop10.in" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" />
                  </a>
                  <a href="https://x.com/traveltop_10" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/733/733579.png" alt="Twitter" />
                  </a>
                  <a href="https://linkedin.com/company/traveltop10" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/1384/1384014.png" alt="LinkedIn" />
                  </a>
                  <a href="https://youtube.com/@traveltop10" style="margin: 0 10px;">
                    <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" />
                    </a>

                </div>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
                  © 2025 Travel Top10. All rights reserved.
                </p>
              </div>
            </td>
          </tr>
        </table>
      `,
    });

    // ✅ Send internal notification to admin
    await resend.emails.send({
      from: 'Travel Top10 <noreply@traveltop10.in>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${data.message}</blockquote>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send emails' });
  }
}