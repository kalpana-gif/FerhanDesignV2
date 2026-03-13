import { Instagram, Facebook, Twitter } from 'lucide-react';
import { footerConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Footer = () => {
  if (!footerConfig.brandName) return null;

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-steel-950 py-16 md:py-20 border-t border-border">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl mb-4 text-white">{footerConfig.brandName}</h3>
            <p className="text-steel-400 font-body text-sm leading-relaxed mb-6 max-w-sm">
              {footerConfig.brandDescription}
            </p>
            <div className="flex items-center gap-4 mb-6">
              {footerConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-steel-500 hover:text-chrome transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
            <div className="text-steel-400 font-body text-sm space-y-1">
              <p>205A Wharf Street, Queens Park WA 6107</p>
              <a href="tel:+61402427059" className="hover:text-chrome transition-colors">+61 (0) 402 427 059</a>
              <br />
              <a href="mailto:cf@ferhandesign.com.au" className="hover:text-chrome transition-colors">cf@ferhandesign.com.au</a>
            </div>
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-body text-xs font-medium uppercase tracking-wider mb-6 text-steel-500">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-steel-400 font-body text-sm hover:text-chrome transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-steel-500 font-body text-xs uppercase tracking-wider font-medium">
              {footerConfig.copyrightText}
            </p>
            <div className="flex items-center gap-6">
              {footerConfig.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-steel-500 font-body text-xs hover:text-steel-200 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
