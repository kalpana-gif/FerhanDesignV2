import { useState, useEffect } from 'react';
import { X, Instagram, Facebook, Twitter } from 'lucide-react';
import { navigationConfig } from '../config';
import GradualBlur from '@/components/GradualBlur';

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
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
                style={{
                    // Almost no tint — clear glass, not frosted milk
                    background: isScrolled
                        ? 'rgba(255, 255, 255, 0.06)'
                        : 'rgba(255, 255, 255, 0.02)',
                    // Single hairline border at bottom only, barely visible
                    borderBottom: `0.5px solid ${isScrolled ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`,
                }}
            >
                {/*
          ── GradualBlur sits behind all nav content.
             position="bottom" with target="parent" so it fills the nav
             and feathers the blur edge downward — content underneath
             dissolves into clarity rather than hitting a hard edge.
             strength kept low (1.5) so it reads as clear glass, not fog.
        */}
                <GradualBlur
                    target="parent"
                    position="top"
                    height="100%"
                    strength={isScrolled ? 2 : 1.5}
                    divCount={8}
                    curve="bezier"
                    exponential={false}
                    opacity={1}
                    zIndex={0}
                />

                <div
                    className="relative flex items-center justify-between h-[70px] px-6 md:px-12 lg:px-[170px]"
                    style={{ zIndex: 1 }}
                >
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
                                className="text-xs font-body tracking-widest uppercase transition-colors duration-200"
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
                            className="hidden lg:inline-block px-6 py-2 text-xs font-body tracking-widest uppercase transition-all duration-300"
                            style={{
                                color: isScrolled ? 'var(--white)' : 'var(--steel-50)',
                                border: `0.5px solid ${isScrolled ? 'var(--steel-900)' : 'rgba(255,255,255,0.35)'}`,
                                backgroundColor: isScrolled ? 'var(--steel-900)' : 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                            }}
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </nav>

            {/* Mobile Full Screen Menu — deep clear glass */}
            <div
                className={`fixed inset-0 z-[9999] transition-all duration-700 lg:hidden ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                {/*
          Full-screen GradualBlur as the backdrop — fills the whole overlay
          with a strong blur that feathers at the bottom edge so it feels
          like looking through thick clear glass, not a frosted panel.
        */}
                <div
                    className="absolute inset-0"
                    style={{
                        backdropFilter: 'blur(40px) saturate(120%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                        // Very low tint — want to see the page behind, just distorted
                        background: 'rgba(10, 12, 18, 0.55)',
                    }}
                />

                {/* Subtle specular edge — top light reflection like real glass */}
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent 100%)',
                    }}
                />

                {/* GradualBlur layered over for the feathered dissolve at bottom */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                    <GradualBlur
                        target="parent"
                        position="bottom"
                        height="35%"
                        strength={3}
                        divCount={10}
                        curve="bezier"
                        exponential
                        opacity={0.6}
                        zIndex={1}
                    />
                </div>

                <div className="relative h-full flex" style={{ zIndex: 2 }}>
                    <div className="flex-1 flex flex-col justify-center items-center px-8">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                        >
                            <X size={28} strokeWidth={1} />
                        </button>

                        <div className="mb-4">
              <span
                  className="font-display text-2xl"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {navigationConfig.brandName}
              </span>
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
                                    className="font-display text-3xl transition-all duration-300"
                                    style={{
                                        color: 'rgba(255,255,255,0.7)',
                                        opacity: isMenuOpen ? 1 : 0,
                                        transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                        transition: `all 0.5s ease ${index * 0.1}s`,
                                        textShadow: '0 1px 20px rgba(255,255,255,0.08)',
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,1)'; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
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
                                        className="transition-colors"
                                        style={{ color: 'rgba(255,255,255,0.3)' }}
                                        aria-label={social.label}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)'; }}
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