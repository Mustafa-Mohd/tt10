// Enhanced Email Templates for Travel Top10

export const generateUserAcknowledgmentEmail = (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => ` <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Thank you for contacting Travel Top10</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fa;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa; padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; font-family:sans-serif;">
            <!-- Banner -->
            <tr>
              <td>
                <img src="https://yt3.googleusercontent.com/AjeZALGjf-4t91HuxjhWJzAtBW0TjzkZPZJepNjtIWpxtM1K95IgbtZxnyugcrG3krBzedg7yQ=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="Banner" width="600" style="display:block; width:100%; height:auto;">
              </td>
            </tr>

            <!-- Logo & Title -->
            <tr>
              <td align="center" style="padding:20px;">
                <a href="https://traveltop10.in/"><img src="https://traveltop10.in/assets/fav%20icon.png" width="100" height="100" alt="Logo" style="border-radius:50%; border:4px solid #000000;"></a>
                <h2 style="margin:10px 0 0 0; font-size:25px; color:#0F0F0F;">TRAVEL <span style="color:#EF4B4B;">TOP10</span></h2>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td align="center" style="padding:0 30px 20px;">
                <h1 style="color:#EF4B4B; font-size:24px;">Thank You for Contacting Us!</h1>
                <h2 style="font-size:18px; color:#333; margin:10px 0;">Dear ${data.name}</h2>
                <p style="font-size:15px; color:#555;">Thank you for reaching out to <strong>Travel Top10</strong>. We've received your message and our team will get back to you within 24 hours.</p>

                <!-- Caption Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                  <tr>
                    <td align="center" style="background: #ef7c7c; padding:15px; border-radius:8px; color:#ffffff; font-weight:bold;">
                      When the best come together, travel becomes extraordinary.
                    </td>
                  </tr>
                </table>

                <p style="font-size:15px; color:#666;">To Build the Strongest Network of Trusted Travel Brands That Deliver Flawless Experiences</p>

                <!-- Message Details -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafe; border-radius:10px; padding:20px; border:1px solid #e1f5fe; margin:20px 0;">
                  <tr>
                    <td style="color:#EF4B4B; font-size:16px; font-weight:bold; padding-bottom:10px;">Your Message Details</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;"><strong>Subject:</strong> ${data.subject}</td>
                  </tr>
                  <tr>
                    <td style="padding:5px 0;"><strong>Email:</strong> ${data.email}</td>
                  </tr>
                  <tr>
                    <td style="background:#ffffff; border-left:4px solid #ef4b4b; padding:10px; font-style:italic; color:#555; margin-top:10px;">
                      "${data.message}"
                    </td>
                  </tr>
                </table>

                <!-- Buttons -->
                <table cellpadding="0" cellspacing="0" style="margin:30px 0;">
                  <tr>
                    <td align="center">
                      <a href="https://traveltop10.in/register" style="background:linear-gradient(135deg,#f79090,#ef4b4b); color:#fff; text-decoration:none; padding:12px 25px; border-radius:50px; display:inline-block; font-weight:bold; margin-right:10px;">Register Now</a>
                      <a href="https://traveltop10.in" style="border:2px solid #ef4b4b; color:#ef4b4b; text-decoration:none; padding:12px 25px; border-radius:50px; display:inline-block; font-weight:bold;">Explore Destinations</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Social Links -->
            <tr>
              <td style="background:#f8fafe; padding:20px; border-top:1px solid #ef4b4b;" align="center">
                <h3 style="font-size:15px; color:#333;">Follow Us for Daily Travel Inspiration</h3>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td><a href="https://facebook.com/Top10Travel"><img src="https://cdn-icons-png.flaticon.com/32/733/733547.png" alt="Facebook" width="32" style="margin: 0 5px;"></a></td>
                    <td><a href="https://x.com/traveltop_10"><img src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png" alt="X" width="32" style="margin: 0 5px;"></a></td>
                    <td><a href="https://instagram.com/traveltop10.in"><img src="https://cdn-icons-png.flaticon.com/32/2111/2111463.png" alt="Instagram" width="32" style="margin: 0 5px;"></a></td>
                    <td><a href="https://linkedin.com/company/traveltop10"><img src="https://cdn-icons-png.flaticon.com/32/1384/1384014.png" alt="LinkedIn" width="32" style="margin: 0 5px;"></a></td>
                    <td><a href="https://youtube.com/@traveltop10"><img src="https://cdn-icons-png.flaticon.com/32/1384/1384060.png" alt="YouTube" width="32" style="margin: 0 5px;"></a></td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Contact Info -->
            <tr>
              <td align="center" style="padding:20px; background:#ffffff; border-top:1px solid #e1f5fe; font-size:14px; color:#666;">
                <strong>Travel Top10</strong> - Your Premier Travel Discovery Platform<br />
                <a href="mailto:contact@traveltop10.in" style="color:#ef4b4b; text-decoration:none; font-weight:600;">contact@traveltop10.in</a><br />
                <a href="https://traveltop10.in" style="color:#ef4b4b; text-decoration:none; font-weight:600;">traveltop10.in</a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#e27878; color:#ffffff; padding:15px; font-size:14px;">
                © 2025 Travel Top10. All rights reserved.<br />
                Discover • Explore • Experience
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


  `;

export const generateAdminNotificationEmail = (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .header {
      background: linear-gradient(135deg, #f79090, #ef4b4b);
      color: #fff;
      text-align: center;
      padding: 30px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }

    .header p {
      margin-top: 8px;
      font-size: 15px;
      opacity: 0.9;
    }

    .content {
      padding: 30px;
    }

    .alert-badge {
      background: #ef4b4b;
      color: #fff;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .contact-card, .message-card {
      background: #f8fafe;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;
      border-left: 4px solid #ef4b4b;
    }

    .contact-card h3, .message-card h3 {
      color: #ef4b4b;
      font-size: 18px;
      margin: 0 0 15px;
    }

    .contact-detail {
      margin-bottom: 12px;
    }

    .contact-label {
      display: inline-block;
      font-weight: 600;
      width: 90px;
      color: #333;
    }

    .contact-value {
      color: #555;
    }

    .priority-indicator {
      background: #ffd700;
      color: #333;
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 15px;
      text-transform: uppercase;
      margin-left: 10px;
    }

    .email-link {
      color: #ef4b4b;
      font-weight: 600;
      text-decoration: none;
    }

    .message-content {
      background: #fff;
      padding: 15px;
      border-left: 4px solid #ef4b4b;
      border-radius: 8px;
      font-style: italic;
      line-height: 1.6;
      white-space: pre-wrap;
      color: #555;
    }

    .action-buttons {
      text-align: center;
      margin-top: 30px;
    }

    .reply-button {
      background: linear-gradient(135deg, #f79090, #ef4b4b);
      color: #fff !important;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 50px;
      font-weight: 600;
      display: inline-block;
      margin: 0 10px;
      box-shadow: 0 4px 15px rgba(239, 75, 75, 0.3);
    }

    .manage-button {
      border: 2px solid #ef4b4b;
      color: #ef4b4b !important;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 50px;
      font-weight: 600;
      display: inline-block;
      margin: 0 10px;
    }

    .footer {
      background: #e27878;
      color: white;
      text-align: center;
      padding: 20px;
      font-size: 12px;
    }

    .footer a {
      color: #ffffff;
      text-decoration: underline;
    }

    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px;
      }
      .reply-button,
      .manage-button {
        display: block;
        margin: 10px auto;
        width: 80%;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
      <p>Travel Top10 Admin Notification</p>
    </div>
    <div class="content">
      <span class="alert-badge">🔔 New Inquiry</span>

      <div class="contact-card">
        <h3>📇 Contact Info</h3>
        <div class="contact-detail">
          <span class="contact-label">Name:</span>
          <span class="contact-value">${data.name}</span>
        </div>
        <div class="contact-detail">
          <span class="contact-label">Email:</span>
          <span class="contact-value">
            <a href="mailto:${data.email}" class="email-link">${data.email}</a>
          </span>
        </div>
        <div class="contact-detail">
          <span class="contact-label">Subject:</span>
          <span class="contact-value">${data.subject}</span>
          <span class="priority-indicator">High</span>
        </div>
        <div class="contact-detail">
          <span class="contact-label">Date:</span>
          <span class="contact-value">${new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short'
          })}</span>
        </div>
      </div>

      <div class="message-card">
        <h3>📝 Message</h3>
        <div class="message-content">${data.message}</div>
      </div>

      <div class="action-buttons">
        <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}&body=Dear ${encodeURIComponent(data.name)},%0D%0A%0D%0AThank you for contacting Travel Top10.%0D%0A%0D%0A" class="reply-button">
          📧 Reply
        </a>
        <a href="https://traveltop10.in/admin/contacts" class="manage-button">
          🔧 Manage Contact
        </a>
      </div>
    </div>

    <div class="footer">
      <p>
        Notification generated by Travel Top10 contact form system.<br>
        <a href="https://traveltop10.in">Visit Admin Panel</a>
      </p>
    </div>
  </div>
</body>
</html>

  `;