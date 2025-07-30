import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  ExternalLink
} from 'lucide-react';
import logoImg from '/assets/logo.png'; // M ake sure this path is correct

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Certification Process', href: '#certification' },
    { name: 'Success Stories', href: '#stories' },
    { name: 'Contact Support', href: '#support' }
  ];

  const topCategories = [
    { name: 'Top 10 Hotels in Europe', href: '#europe-hotels' },
    { name: 'Best Travel Agencies in Asia', href: '#asia-agencies' },
    { name: 'Luxury DMCs in Africa', href: '#africa-dmcs' },
    { name: 'Adventure Travel Influencers', href: '#adventure-influencers' },
    { name: 'Eco-Tourism Specialists', href: '#eco-tourism' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'GDPR Compliance', href: '#gdpr' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/Top10Travel', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/traveltop_10', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/traveltop10.in', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@traveltop10', label: 'YouTube' }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={logoImg}
                  alt="Travel Top 10 Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-xl font-bold">
                  <span style={{ color: '#0F0F0F' }}>TRAVEL </span>
                  <span style={{ color: '#EF4B4B' }}>TOP10</span>
                </span>
              </Link>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Connecting travelers with the world's top-rated travel professionals.
              Discover, compare, and book with confidence through our certified network.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">contact@traveltop10.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  # 3-6 365, Himayatnagar, Hyderabad, Telangana 500029
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-travel"
                  >
                    <IconComponent className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-background/80 hover:text-primary transition-travel text-sm flex items-center gap-2 group"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-travel" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top 10 Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">Top 10 Categories</h3>
            <ul className="space-y-3">
              {topCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href={category.href}
                    className="text-background/80 hover:text-primary transition-travel text-sm flex items-center gap-2 group"
                  >
                    {category.name}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-travel" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
              <p className="text-background/80 text-sm mb-4">
                Get the latest travel trends, exclusive deals, and certification updates.
              </p>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/60 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                  />
                  <Button variant="ocean" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-background/60">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-background/80">
              © 2025 Travel Top10. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-background/80 hover:text-primary transition-travel"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Additional Links */}
            <div className="flex gap-6 text-sm">
              <a href="#sitemap" className="text-background/80 hover:text-primary transition-travel">
                Sitemap
              </a>
              <a href="#faq" className="text-background/80 hover:text-primary transition-travel">
                FAQ
              </a>
              <a href="#support" className="text-background/80 hover:text-primary transition-travel">
                24/7 Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;