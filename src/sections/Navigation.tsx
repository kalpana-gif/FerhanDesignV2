import { useState, useEffect, useRef, useCallback } from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { navigationConfig } from '../config';
import GradualBlur from '@/components/GradualBlur';

interface NavigationProps { }

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
    Instagram,
    Facebook,
    Twitter,
};

// ─── Multi-point luminance sampler ────────────────────────────────────────────
function sampleNavLuminance(navHeight = 72, sampleCount = 8): boolean {
    const y = navHeight / 2;
    const width = window.innerWidth;
    let totalLuminance = 0;
    let validSamples = 0;

    for (let i = 0; i < sampleCount; i++) {
        const x = (width / (sampleCount + 1)) * (i + 1);
        const els = document.elementsFromPoint(x, y);

        for (const el of els) {
            const htmlEl = el as HTMLElement;
            if (htmlEl.closest?.('[data-nav-root]')) continue;

            const theme = htmlEl.getAttribute('data-nav-theme');
            if (theme === 'light') { totalLuminance += 1; validSamples++; break; }
            if (theme === 'dark') { totalLuminance += 0; validSamples++; break; }

            const style = getComputedStyle(htmlEl);
            const bg = style.backgroundColor;

            if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
                if (style.backgroundImage && style.backgroundImage !== 'none') {
                    totalLuminance += 0.15;
                    validSamples++;
                    break;
                }
                continue;
            }

            const match = bg.match(/[\d.]+/g);
            if (!match || match.length < 3) continue;
            const [r, g, b] = match.map(Number);
            totalLuminance += (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            validSamples++;
            break;
        }
    }

    if (validSamples === 0) return false;
    return (totalLuminance / validSamples) > 0.52;
}

// ─── Animated Hamburger ───────────────────────────────────────────────────────
const MenuIcon = ({ isOpen, color }: { isOpen: boolean; color: string }) => (
    <div style={{ width: 20, height: 14, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{
            display: 'block', height: '1.5px', borderRadius: 9999,
            background: color, transformOrigin: 'center',
            transform: isOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
        }} />
        <span style={{
            display: 'block', height: '1.5px', borderRadius: 9999,
            background: color, width: isOpen ? '0%' : '70%', alignSelf: 'flex-end',
            opacity: isOpen ? 0 : 1,
            transition: 'opacity 0.2s ease, width 0.25s ease, background 0.3s ease',
        }} />
        <span style={{
            display: 'block', height: '1.5px', borderRadius: 9999,
            background: color, transformOrigin: 'center',
            transform: isOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
        }} />
    </div>
);

// ─── Mobile Menu Link ─────────────────────────────────────────────────────────
const MobileLink = ({
    link, index, active, isOpen, onClick,
}: {
    link: { label: string; href: string };
    index: number;
    active: boolean;
    isOpen: boolean;
    onClick: () => void;
}) => {
    const [hovered, setHovered] = useState(false);
    const num = String(index + 1).padStart(2, '0');

    return (
        <a
            href={link.href}
            onClick={(e) => { e.preventDefault(); onClick(); }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1.25rem',
                borderRadius: '1rem',
                textDecoration: 'none',
                background: active
                    ? 'rgba(255,255,255,0.10)'
                    : hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `0.5px solid ${active ? 'rgba(255,255,255,0.18)' : 'transparent'}`,
                backdropFilter: active ? 'blur(12px)' : 'none',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: [
                    'background 0.25s ease',
                    'border-color 0.25s ease',
                    `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.055}s`,
                    `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.055}s`,
                ].join(', '),
            }}
        >
            {/* Number */}
            <span style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: active ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)',
                width: '1.5rem',
                flexShrink: 0,
                transition: 'color 0.25s ease',
            }}>
                {num}
            </span>

            {/* Label */}
            <span style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(1.6rem, 7vw, 2.2rem)',
                fontWeight: active ? 500 : 400,
                letterSpacing: '-0.02em',
                color: active ? 'rgba(255,255,255,0.97)' : hovered ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.38)',
                transition: 'color 0.25s ease',
                lineHeight: 1,
            }}>
                {link.label}
            </span>

            {/* Active arrow */}
            <span style={{
                marginLeft: 'auto',
                opacity: active ? 1 : 0,
                transform: active ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.5 9h11M10 4l5 5-5 5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </a>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Navigation = ({ }: NavigationProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [isDark, setIsDark] = useState(true);
    const [sheetVisible, setSheetVisible] = useState(false); // controls render
    const [sheetIn, setSheetIn] = useState(false); // controls animation

    const observerRef = useRef<IntersectionObserver | null>(null);
    const navLinksRef = useRef<Record<string, HTMLAnchorElement | null>>({});
    const navContainerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    if (!navigationConfig.brandName) return null;

    // ── Open / close with animation lifecycle ─────────────────────────────
    const openMenu = () => {
        setSheetVisible(true);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => requestAnimationFrame(() => setSheetIn(true)));
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setSheetIn(false);
        setIsMenuOpen(false);
        setTimeout(() => {
            setSheetVisible(false);
            document.body.style.overflow = '';
        }, 500);
    };

    // Close on resize to desktop
    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 1024) closeMenu(); };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // ── Background luminance ──────────────────────────────────────────────
    const checkBackground = useCallback(() => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            setIsDark(!sampleNavLuminance());
        });
    }, []);

    useEffect(() => {
        const tid = setTimeout(checkBackground, 80);
        return () => { clearTimeout(tid); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [checkBackground]);

    // ── Scroll ────────────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => { setIsScrolled(window.scrollY > 60); checkBackground(); };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [checkBackground]);

    // ── IntersectionObserver ──────────────────────────────────────────────
    useEffect(() => {
        observerRef.current?.disconnect();
        const ids = navigationConfig.menuLinks.map((l) => l.href.replace('#', '')).filter(Boolean);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                    checkBackground();
                }
            },
            { threshold: 0.4, rootMargin: '-80px 0px -20% 0px' }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observerRef.current!.observe(el);
        });
        return () => observerRef.current?.disconnect();
    }, [checkBackground]);

    // ── Sliding pill ──────────────────────────────────────────────────────
    useEffect(() => {
        const target = hoveredLink ?? activeSection;
        const linkEl = navLinksRef.current[target];
        const cEl = navContainerRef.current;
        if (linkEl && cEl) {
            const cr = cEl.getBoundingClientRect();
            const lr = linkEl.getBoundingClientRect();
            setPillStyle({ left: lr.left - cr.left, width: lr.width, opacity: 1 });
        } else {
            setPillStyle((p) => ({ ...p, opacity: 0 }));
        }
    }, [hoveredLink, activeSection]);

    const scrollToSection = (href: string) => {
        closeMenu();
        setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    // ── Adaptive tokens ───────────────────────────────────────────────────
    const D = isDark;
    const T = {
        pillBg: D ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        pillShadow: D
            ? '0 1px 0 rgba(255,255,255,0.1) inset, 0 8px 32px rgba(0,0,0,0.25)'
            : '0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 32px rgba(0,0,0,0.08)',
        borderGrad: D
            ? 'linear-gradient(135deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.04) 40%,rgba(255,255,255,0.18) 70%,rgba(255,255,255,0.04) 100%)'
            : 'linear-gradient(135deg,rgba(0,0,0,0.18) 0%,rgba(0,0,0,0.04) 40%,rgba(0,0,0,0.12) 70%,rgba(0,0,0,0.04) 100%)',
        text: D ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
        textMuted: D ? 'rgba(255,255,255,0.36)' : 'rgba(0,0,0,0.35)',
        activePill: D ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.09)',
        activePillHover: D ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
        activePillShadow: D ? 'inset 0 0.5px 0 rgba(255,255,255,0.22)' : 'inset 0 0.5px 0 rgba(0,0,0,0.1)',
        ctaBg: D ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
        ctaBgHover: D ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.13)',
        hamBg: D ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)',
        hamBorder: D ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.12)',
        hamBar: D ? '#ffffff' : '#000000',
    };

    return (
        <>
            <style>{`
                [data-nav-root] .nb::before {
                    content:''; position:absolute; inset:0; border-radius:9999px; padding:0.5px;
                    background:var(--nbg);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude;
                    pointer-events:none; transition: background 0.4s ease;
                }
                [data-nav-root] .nt {
                    transition: background 0.4s ease, box-shadow 0.4s ease, color 0.3s ease, border-color 0.3s ease;
                }
                [data-nav-root] .nlt { transition: color 0.22s ease; }

                /* Mobile sheet drag handle */
                .sheet-handle {
                    width: 36px; height: 4px;
                    background: rgba(255,255,255,0.18);
                    border-radius: 9999px;
                    margin: 0 auto 1.5rem;
                }
            `}</style>

            <div
                data-nav-root=""
                className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-10 lg:px-14 h-[68px] pointer-events-none"
                style={{ '--nbg': T.borderGrad } as React.CSSProperties}
            >
                {/* ── Brand ──────────────────────────────────────────────── */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                    className="pointer-events-auto nlt select-none"
                    style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.125rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: T.text,
                        textDecoration: 'none',
                        position: 'relative',
                        zIndex: 10,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.55'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                    {navigationConfig.brandName}
                </a>

                {/* ── Desktop pill nav ───────────────────────────────────── */}
                <div
                    ref={navContainerRef}
                    className="nb nt hidden lg:flex items-center gap-0.5 px-2 py-2 pointer-events-auto"
                    style={{
                        borderRadius: '9999px', position: 'relative',
                        background: T.pillBg,
                        backdropFilter: 'blur(28px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                        boxShadow: T.pillShadow,
                    }}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {/* Sliding indicator */}
                    <div style={{
                        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                        left: pillStyle.left, width: pillStyle.width,
                        height: 'calc(100% - 16px)', borderRadius: '9999px',
                        background: hoveredLink ? T.activePillHover : T.activePill,
                        boxShadow: T.activePillShadow,
                        opacity: pillStyle.opacity, pointerEvents: 'none',
                        transition: [
                            'left 0.32s cubic-bezier(0.34,1.4,0.64,1)',
                            'width 0.32s cubic-bezier(0.34,1.4,0.64,1)',
                            'opacity 0.18s ease',
                            'background 0.35s ease',
                            'box-shadow 0.35s ease',
                        ].join(', '),
                    }} />

                    {navigationConfig.menuLinks.map((link) => {
                        const sid = link.href.replace('#', '');
                        const active = activeSection === sid;
                        const hovered = hoveredLink === sid;
                        return (
                            <a
                                key={link.label}
                                ref={(el) => { navLinksRef.current[sid] = el; }}
                                href={link.href}
                                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                                onMouseEnter={() => setHoveredLink(sid)}
                                className="nlt relative z-10 px-4 py-1.5 select-none"
                                style={{
                                    borderRadius: '9999px',
                                    fontFamily: 'var(--font-body, sans-serif)',
                                    fontSize: '11px',
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    textDecoration: 'none',
                                    color: active || hovered ? T.text : T.textMuted,
                                    fontWeight: active ? 500 : 400,
                                }}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                </div>

                {/* ── Right side ─────────────────────────────────────────── */}
                <div className="flex items-center gap-2.5 pointer-events-auto">

                    {/* Desktop CTA */}
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                        className="nb nt hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full select-none"
                        style={{
                            position: 'relative',
                            fontFamily: 'var(--font-body, sans-serif)',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            color: T.text,
                            background: T.ctaBg,
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            boxShadow: T.pillShadow,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = T.ctaBgHover; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = T.ctaBg; }}
                    >
                        Get In Touch
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ opacity: 0.45 }}>
                            <path d="M1 8L8 1M8 1H2.5M8 1V6.5" stroke={T.hamBar} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>

                    {/* Hamburger toggle */}
                    <button
                        onClick={isMenuOpen ? closeMenu : openMenu}
                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full nt"
                        style={{
                            background: isMenuOpen ? 'rgba(255,255,255,0.14)' : T.hamBg,
                            border: `0.5px solid ${isMenuOpen ? 'rgba(255,255,255,0.22)' : T.hamBorder}`,
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            cursor: 'pointer',
                        }}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        <MenuIcon isOpen={isMenuOpen} color={isMenuOpen ? '#ffffff' : T.hamBar} />
                    </button>
                </div>
            </div>

            {/* ── Mobile sheet overlay ──────────────────────────────────────── */}
            {sheetVisible && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    }}
                >
                    {/* Scrim */}
                    <div
                        onClick={closeMenu}
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            opacity: sheetIn ? 1 : 0,
                            transition: 'opacity 0.45s ease',
                        }}
                    />

                    {/* Sheet */}
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxHeight: '90vh',
                            borderRadius: '1.5rem 1.5rem 0 0',
                            background: 'rgba(6,8,15,0.88)',
                            backdropFilter: 'blur(48px) saturate(160%)',
                            WebkitBackdropFilter: 'blur(48px) saturate(160%)',
                            border: '0.5px solid rgba(255,255,255,0.1)',
                            borderBottom: 'none',
                            boxShadow: '0 -24px 80px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.08) inset',
                            transform: sheetIn ? 'translateY(0)' : 'translateY(100%)',
                            transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Top shine */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent)',
                        }} />

                        {/* Drag handle */}
                        <div style={{ paddingTop: '1rem' }}>
                            <div className="sheet-handle" />
                        </div>

                        {/* Sheet header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 1.5rem 1rem',
                        }}>
                            <span style={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '10px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.22)',
                            }}>
                                Menu
                            </span>
                            <span style={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '10px',
                                letterSpacing: '0.14em',
                                color: 'rgba(255,255,255,0.15)',
                            }}>
                                {String(navigationConfig.menuLinks.length).padStart(2, '0')} links
                            </span>
                        </div>

                        {/* Divider */}
                        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.07)', margin: '0 1.5rem' }} />

                        {/* Nav links */}
                        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 0.75rem' }}>
                            {navigationConfig.menuLinks.map((link, index) => (
                                <MobileLink
                                    key={link.label}
                                    link={link}
                                    index={index}
                                    active={activeSection === link.href.replace('#', '')}
                                    isOpen={sheetIn}
                                    onClick={() => scrollToSection(link.href)}
                                />
                            ))}
                        </nav>

                        {/* Footer */}
                        <div style={{
                            padding: '1rem 1.5rem 2rem',
                            borderTop: '0.5px solid rgba(255,255,255,0.07)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            opacity: sheetIn ? 1 : 0,
                            transform: sheetIn ? 'translateY(0)' : 'translateY(10px)',
                            transition: `opacity 0.5s ease ${0.1 + navigationConfig.menuLinks.length * 0.055}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.1 + navigationConfig.menuLinks.length * 0.055}s`,
                        }}>
                            {/* CTA button */}
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.65rem 1.25rem',
                                    borderRadius: '9999px',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '0.5px solid rgba(255,255,255,0.18)',
                                    backdropFilter: 'blur(12px)',
                                    fontFamily: 'var(--font-body, sans-serif)',
                                    fontSize: '11px',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.85)',
                                    textDecoration: 'none',
                                }}
                            >
                                Get In Touch
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ opacity: 0.5 }}>
                                    <path d="M1 8L8 1M8 1H2.5M8 1V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {/* Social icons */}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {navigationConfig.socialLinks.map((social) => {
                                    const Icon = iconMap[social.icon];
                                    if (!Icon) return null;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            aria-label={social.label}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 36, height: 36,
                                                borderRadius: '50%',
                                                color: 'rgba(255,255,255,0.35)',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '0.5px solid rgba(255,255,255,0.09)',
                                                transition: 'color 0.2s ease, background 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.9)';
                                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)';
                                                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                                            }}
                                        >
                                            <Icon size={13} strokeWidth={1.5} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Safe area bottom padding for notched devices */}
                        <div style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;