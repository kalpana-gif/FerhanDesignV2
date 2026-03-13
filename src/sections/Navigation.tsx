import { useState, useEffect } from 'react';
import { X, Instagram, Facebook, Twitter } from 'lucide-react';
import { navigationConfig } from '../config';

interface NavigationProps { }

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Navigation = ({ }: NavigationProps) => {
  if (!navigationConfig.brandName) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between h-[70px] px-6 md:px-12 lg:px-[170px]">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="font-display text-xl tracking-wide"
            style={{ color: isScrolled ? 'var(--steel-950)' : 'var(--white)' }}
          >
            {navigationConfig.brandName}
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationConfig.menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-xs font-body tracking-widest uppercase text-steel-100 transition-colors duration-200"
                style={{ color: isScrolled ? 'var(--steel-800)' : 'var(--steel-100)' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 w-7 btn-hover lg:hidden"
            >
              <span className={`h-[2px] w-full transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'}`} />
              <span className={`h-[2px] w-full transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-white'}`} />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="hidden lg:inline-block px-6 py-2 text-xs font-body tracking-widest uppercase transition-all duration-300 border"
              style={{
                color: isScrolled ? 'var(--white)' : 'var(--steel-50)',
                borderColor: isScrolled ? 'var(--steel-900)' : 'rgba(255,255,255,0.6)',
                backgroundColor: isScrolled ? 'var(--steel-900)' : 'transparent',
              }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="absolute inset-0 bg-white" />
        <div className="relative h-full flex">
          <div className="flex-1 flex flex-col justify-center items-center px-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <div className="mb-4">
              <span className="font-display text-2xl text-steel-900">{navigationConfig.brandName}</span>
            </div>

            <nav className="flex flex-col items-center gap-6 mt-8">
              {navigationConfig.menuLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-display text-3xl text-steel-950 hover:text-chrome transition-colors duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6 mt-12">
              {navigationConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-steel-400 hover:text-steel-900 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {navigationConfig.menuBackgroundImage && (
            <div
              className="hidden lg:block w-[40%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${navigationConfig.menuBackgroundImage})`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'all 0.7s ease 0.2s',
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
