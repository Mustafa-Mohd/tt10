import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown, Shield, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const navLinks = [
    // { name: 'Agencies', section: 'agencies' },
    { name: 'Hotels', section: 'hotels' },
    { name: 'DMCs', section: 'dmcs', requiresAuth: true },
    { name: 'Influencers', section: 'influencers' },
    { name: 'Contact Us', section: 'contact' },
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="mb-4">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/assets/logo.png"
                  alt="Travel Top 10 Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-xl font-bold">
                  <span style={{ color: '#0F0F0F' }}>TRAVEL </span>
                  <span style={{ color: '#f04a4a' }}>TOP10</span>
                </span>
              </Link>
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.requiresAuth && !user) return null;
              
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.section)}
                  className="text-foreground hover:text-primary transition-travel relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-travel"
              >
                <Globe size={16} />
                <span className="text-sm">EN</span>
                <ChevronDown size={14} />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 card-gradient rounded-lg shadow-travel-md border border-border overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-travel"
                      onClick={() => setIsLanguageOpen(false)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                {userRole === ' admin' && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ocean" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-travel"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                if (link.requiresAuth && !user) return null;
                
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.section)}
                    className="text-left text-foreground hover:text-primary transition-travel py-2"
                  >
                    {link.name}
                  </button>
                );
              })}
              <div className="flex flex-col space-y-2 pt-3 border-t border-border/50">
                {user ? (
                  <>
                    {userRole === 'admin' && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="sm" className="justify-start w-full" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="justify-start w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ocean" size="sm" className="justify-start w-full">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;