import { useEffect, useRef, useState } from 'react';
import { heroConfig } from '../config';
import Squares from '../components/Squares';
import Waves from '../components/Waves';
import Orb from '../components/Orb';
import myImage from "../../public/images/Drawing.sketchpad.svg";

const Hero = () => {
    if (!heroConfig.title) return null;

    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 80);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNext = () => {
        document.querySelector('#subhero')?.scrollIntoView({ behavior: 'smooth' });
    };

    const titleLines = heroConfig.title.split('\n');

    const p3 = scrollY * 0.38;
    const p4 = scrollY * 0.55;
    const contentShift = scrollY * 0.35;

    return (
        <>
            <style>{`
        #hero {
          --black: #060606;
          --off-black: #0e0e0e;
          --charcoal: #1a1a1a;
          --mid: #2e2e2e;
          --steel: #5a5a5a;
          --silver: #9a9a9a;
          --light-grey: #c8c8c8;
          --off-white: #efefef;
          --white: #f9f9f9;
          --accent-line: #e0e0e0;
          background: var(--black);
          font-family: var(--font-body);
        }

        #hl-grid-fine {
          background-image:
            linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        #hl-grid-major {
          background-image:
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 200px 200px;
        }

        #hl-hatch {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 28px,
            rgba(255,255,255,0.018) 28px,
            rgba(255,255,255,0.018) 29px
          );
        }

        #hl-elevation {
          background-image:
            linear-gradient(to top, rgba(255,255,255,0.055) 0%, transparent 35%),
            linear-gradient(to right, rgba(255,255,255,0.045) 0%, transparent 25%);
        }

        #hl-spot {
          background: radial-gradient(
            ellipse 75% 65% at 50% 42%,
            rgba(255,255,255,0.055) 0%,
            transparent 70%
          );
        }

        #hl-vignette {
          background: radial-gradient(
            ellipse 110% 100% at 50% 50%,
            transparent 28%,
            rgba(0,0,0,0.55) 65%,
            rgba(0,0,0,0.92) 100%
          );
        }
        #hl-drawing-image {
          opacity: 90;
          pointer-events: none;
        }

        #hl-drawing { opacity: 0.22; }

        #hl-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          mix-blend-mode: overlay;
          opacity: 0.5;
        }

        .hero-eyebrow {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 0.62rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--steel);
        }

        .hero-number {
          font-family: var(--font-body);
          font-size: 0.58rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.15em;
        }

        .hero-title {
          font-family: var(--font-body);
          font-weight: 400;
          letter-spacing: 0.06em;
          color: var(--white);
          line-height: 0.92;
          text-shadow: 0 0 120px rgba(255,255,255,0.08), 0 2px 40px rgba(0,0,0,0.8);
        }

        .hero-title em {
          font-family: var(--font-display);
          font-weight: 300;
          font-size: 0.72em;
          color: var(--light-grey);
          display: block;
          letter-spacing: 0.12em;
          margin-top: 0.08em;
        }

        .hero-rule {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--steel) 20%, var(--accent-line) 50%, var(--steel) 80%, transparent);
        }

        .hero-sub {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          color: var(--silver);
          text-transform: uppercase;
        }

        .btn-arch-primary {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--black);
          background: var(--white);
          padding: 1rem 3rem;
          border: none;
          display: inline-block;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .btn-arch-primary:hover {
          background: var(--off-white);
          transform: translateY(-2px);
        }

        .btn-arch-secondary {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--light-grey);
          background: transparent;
          padding: 1rem 3rem;
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-block;
          text-decoration: none;
          transition: all 0.25s ease;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .btn-arch-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          color: var(--white);
          transform: translateY(-2px);
        }

        /* ── Mobile: stack buttons full-width ── */
        @media (max-width: 480px) {
          .btn-arch-primary,
          .btn-arch-secondary {
            width: 100%;
            text-align: center;
            padding: 0.9rem 1.5rem;
          }
        }

        .corner-mark {
          position: absolute;
          width: 28px;
          height: 28px;
          opacity: 0.35;
        }
        .corner-mark.tl { top: 32px; left: 32px; border-top: 1px solid var(--silver); border-left: 1px solid var(--silver); }
        .corner-mark.tr { top: 32px; right: 32px; border-top: 1px solid var(--silver); border-right: 1px solid var(--silver); }
        .corner-mark.bl { bottom: 64px; left: 32px; border-bottom: 1px solid var(--silver); border-left: 1px solid var(--silver); }
        .corner-mark.br { bottom: 64px; right: 32px; border-bottom: 1px solid var(--silver); border-right: 1px solid var(--silver); }

        /* ── Mobile: tuck corners closer to edge ── */
        @media (max-width: 480px) {
          .corner-mark.tl { top: 16px; left: 16px; }
          .corner-mark.tr { top: 16px; right: 16px; }
          .corner-mark.bl { bottom: 48px; left: 16px; }
          .corner-mark.br { bottom: 48px; right: 16px; }
        }

        .coord-label {
          font-family: var(--font-body);
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
          position: absolute;
        }

        /* ── Mobile: hide side/top coord labels to reduce clutter ── */
        @media (max-width: 640px) {
          .coord-label-side,
          .coord-label-top {
            display: none;
          }
        }

        .scroll-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 56px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
          animation: scrollDrop 2s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { opacity: 0; transform: translateX(-50%) scaleY(0); transform-origin: top; }
          40%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) scaleY(1); transform-origin: top; }
        }

        .fu {
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fu.off { opacity: 0; transform: translateY(22px); }
        .fu.on  { opacity: 1; transform: translateY(0); }

        .measure-h { position: absolute; height: 1px; background: rgba(255,255,255,0.06); }
        .measure-v { position: absolute; width: 1px; background: rgba(255,255,255,0.06); }

        /* ── Mobile metadata strips ── */
        @media (max-width: 640px) {
          .hero-meta-right,
          .hero-meta-left {
            display: none;
          }
        }

        /* ── Mobile: reduce bottom margin on title rule ── */
        @media (max-width: 640px) {
          .hero-rule-top  { margin-bottom: 1rem !important; }
          .hero-rule-bot  { margin-top: 1rem !important; margin-bottom: 1rem !important; }
          .hero-sub-wrap  { margin-bottom: 1.5rem !important; }
        }
      `}</style>

            <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">

                {/* Layer stack */}
                <div id="hl-base" className="absolute inset-0 w-full h-full">
                    <Squares
                        speed={0.5}
                        squareSize={40}
                        direction="diagonal"
                        borderColor="#271E37"
                        hoverFillColor="#222"
                    />
                </div>

                {/* Blueprint SVG */}
                <div id="hl-drawing" className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateY(${p3}px)` }}>

                    <div
                        id="hl-drawing-image"
                        className="absolute inset-1 flex items-center justify-center"
                        style={{ transform: `translateY(${p3}px)` }}
                    >
                        <img
                            src={myImage}
                            alt="Architectural drawing"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </div>

                    <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg"
                         className="w-full h-full" preserveAspectRatio="xMidYMid slice"
                         stroke="white" fill="none" strokeWidth="0.5">

                        <g strokeOpacity="0.1" strokeWidth="0.4">
                            {Array.from({ length: 13 }).map((_, i) => (
                                <line key={`vg-${i}`} x1={100 + i * 100} y1="50" x2={100 + i * 100} y2="650" />
                            ))}
                            {Array.from({ length: 7 }).map((_, i) => (
                                <line key={`hg-${i}`} x1="50" y1={100 + i * 100} x2="1150" y2={100 + i * 100} />
                            ))}
                        </g>

                        <rect x="150" y="150" width="900" height="400" strokeOpacity="0.3" strokeDasharray="8 8" />

                        <g strokeOpacity="0.4">
                            <line x1="140" y1="200" x2="140" y2="500" />
                            <line x1="135" y1="200" x2="145" y2="200" />
                            <line x1="135" y1="500" x2="145" y2="500" />
                            <text x="110" y="350" fill="white" fontSize="18" stroke="none" fillOpacity="0.3">30'</text>
                            <line x1="300" y1="540" x2="700" y2="540" />
                            <line x1="300" y1="535" x2="300" y2="545" />
                            <line x1="700" y1="535" x2="700" y2="545" />
                            <text x="480" y="570" fill="white" fontSize="18" stroke="none" fillOpacity="0.3">40'</text>
                        </g>

                        <g transform="translate(1000, 100)" strokeOpacity="0.6">
                            <circle cx="0" cy="0" r="18" />
                            <polygon points="0,-12 4,0 -4,0" fill="white" fillOpacity="0.6" stroke="none" />
                            <line x1="0" y1="-12" x2="0" y2="12" />
                            <text x="8" y="-8" fill="white" fontSize="14" stroke="none" fillOpacity="0.5">N</text>
                        </g>

                        <text x="200" y="80" fill="white" fontSize="24" stroke="none" fillOpacity="0.4" fontFamily="monospace">FIRST FLOOR PLAN</text>
                        <text x="920" y="620" fill="white" fontSize="18" stroke="none" fillOpacity="0.3" fontFamily="monospace">SCALE 1:200</text>
                        <text x="150" y="620" fill="white" fontSize="14" stroke="none" fillOpacity="0.2">A-101</text>
                        <text x="1050" y="180" fill="white" fontSize="14" stroke="none" fillOpacity="0.2">REV. 01</text>
                    </svg>
                </div>

                <div id="hl-elevation" className="absolute inset-0" style={{ transform: `translateY(${p3 * 0.6}px)` }} />
                <div id="hl-spot" className="absolute inset-0" style={{ transform: `translateY(${p4}px)` }} />
                <div id="hl-grain" className="absolute inset-0 pointer-events-none" />
                <div id="hl-vignette" className="absolute inset-0" />

                <div className="measure-h" style={{ top: '50%', left: 0, right: 0 }} />
                <div className="measure-v" style={{ left: '50%', top: 0, bottom: 0 }} />

                <div className="corner-mark tl" />
                <div className="corner-mark tr" />
                <div className="corner-mark bl" />
                <div className="corner-mark br" />

                <span className="coord-label" style={{ top: 36, left: 68 }}>A-01</span>
                <span className="coord-label" style={{ top: 36, right: 68 }}>A-02</span>
                <span className="coord-label" style={{ bottom: 72, left: 68 }}>B-01</span>
                <span className="coord-label" style={{ bottom: 72, right: 68 }}>B-02</span>
                <span className="coord-label coord-label-side" style={{ top: '50%', left: 20, transform: 'rotate(-90deg) translateX(-50%)' }}>SECTION A–A</span>
                <span className="coord-label coord-label-top" style={{ top: 20, left: '50%', transform: 'translateX(-50%)' }}>ELEVATION — NORTH FACADE</span>

                {/* Content */}
                <div
                    className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
                    style={{ transform: `translateY(${contentShift}px)` }}
                >
                    <div className={`fu ${isVisible ? 'on' : 'off'} mb-5 font-bold`} style={{ transitionDelay: '150ms' }}>
                        <span className="hero-number">SHEET 01 / 01 &nbsp;·&nbsp; SCALE 1:100 &nbsp;·&nbsp; REV.A</span>
                    </div>

                    <div className={`fu ${isVisible ? 'on' : 'off'} mb-6 font-bold`} style={{ transitionDelay: '300ms' }}>
                        <span className="hero-eyebrow">{heroConfig.tagline}</span>
                    </div>

                    <div className={`fu ${isVisible ? 'on' : 'off'} w-48 mb-8 hero-rule-top`} style={{ transitionDelay: '440ms' }}>
                        <div className="hero-rule" />
                    </div>

                    <h1
                        className={`fu ${isVisible ? 'on' : 'off'} hero-title max-w-4xl font-black`}
                        style={{
                            transitionDelay: '560ms',
                            // Wider range: min 2.2rem (mobile) → max 9rem (desktop)
                            fontSize: 'clamp(2.2rem, 10vw, 9rem)',
                        }}
                    >
                        {titleLines.map((line, i) =>
                            i === titleLines.length - 1 ? (
                                <em key={i}>{line}</em>
                            ) : (
                                <span key={i}>
                                        {line}
                                    {i < titleLines.length - 1 && <br />}
                                    </span>
                            )
                        )}
                    </h1>

                    <div className={`fu ${isVisible ? 'on' : 'off'} w-48 mt-8 mb-7 hero-rule-bot`} style={{ transitionDelay: '700ms' }}>
                        <div className="hero-rule" />
                    </div>

                    <div className={`fu ${isVisible ? 'on' : 'off'} mb-12 hero-sub-wrap`} style={{ transitionDelay: '800ms' }}>
                        <span className="hero-sub">Precision &nbsp;·&nbsp; Form &nbsp;·&nbsp; Structure</span>
                    </div>

                    <div className={`fu ${isVisible ? 'on' : 'off'} flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-xs sm:max-w-none`} style={{ transitionDelay: '960ms' }}>
                        {heroConfig.ctaPrimaryText && (
                            <a
                                href={heroConfig.ctaPrimaryTarget}
                                onClick={(e) => { e.preventDefault(); document.querySelector(heroConfig.ctaPrimaryTarget)?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="btn-arch-primary"
                            >
                                {heroConfig.ctaPrimaryText}
                            </a>
                        )}
                        {heroConfig.ctaSecondaryText && (
                            <a
                                href={heroConfig.ctaSecondaryTarget}
                                onClick={(e) => { e.preventDefault(); document.querySelector(heroConfig.ctaSecondaryTarget)?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="btn-arch-secondary"
                            >
                                {heroConfig.ctaSecondaryText}
                            </a>
                        )}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className={`absolute bottom-8 left-1/2 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: '1300ms' }}
                >
                    <button onClick={scrollToNext} className="relative flex flex-col items-center gap-2" aria-label="Scroll down">
                        <span className="hero-number" style={{ letterSpacing: '0.3em' }}>SCROLL</span>
                        <div className="relative h-14 w-px">
                            <div className="scroll-line" />
                        </div>
                    </button>
                </div>

                {/* Drawing metadata strips — hidden on mobile */}
                <div className={`hero-meta-right absolute bottom-8 right-8 transition-opacity duration-1000 text-right ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
                    <div className="hero-number" style={{ marginBottom: '2px' }}>DRAWN BY: STUDIO</div>
                    <div className="hero-number">DATE: {new Date().getFullYear()} &nbsp;·&nbsp; DWG NO. 001</div>
                </div>
                <div className={`hero-meta-left absolute bottom-8 left-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
                    <div className="hero-number">PROJECT: {(heroConfig.tagline || 'ARCHITECTURE').toUpperCase()}</div>
                </div>
            </section>
        </>
    );
};

export default Hero;