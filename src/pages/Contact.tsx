'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import ReCAPTCHA from 'react-google-recaptcha';

// ✅ Visible checkbox reCAPTCHA — get from Google v2 keys
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY!;

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: user?.id || null,
          captchaToken,
        }),
      });

      if (!response.ok) {
        let msg = 'Failed to send message';
        try {
          const data = await response.json();
          if (data?.error) msg = data.error;
        } catch (_) {}
        throw new Error(msg);
      }

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error: any) {
      toast.error(error.message || 'Submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject &&
    formData.message.trim() &&
    captchaToken;

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <Card className="card-gradient border border-border shadow-travel">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              Send Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="certification">Certification Process</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* ✅ VISIBLE CAPTCHA CHECKBOX */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey={SITE_KEY}
                  onChange={handleCaptcha}
                  ref={recaptchaRef}
                />
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-300"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <CheckCircle className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
