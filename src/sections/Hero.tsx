import { useEffect, useRef, useState } from 'react';
import { heroConfig } from '../config';

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

  const p1 = scrollY * 0.10;
  const p2 = scrollY * 0.22;
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

        #hl-base { background: var(--black); }

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

        .coord-label {
          font-family: var(--font-body);
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.18);
          text-transform: uppercase;
          position: absolute;
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
      `}</style>

      <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">

        {/* Layer stack */}
        <div id="hl-base" className="absolute inset-0" />
        <div id="hl-grid-fine" className="absolute inset-0" style={{ transform: `translateY(${p1}px)` }} />
        <div id="hl-grid-major" className="absolute inset-0" style={{ transform: `translateY(${p2}px)` }} />
        <div id="hl-hatch" className="absolute inset-0" style={{ transform: `translateY(${p2 * 0.8}px)` }} />

        {/* Blueprint SVG */}
        <div id="hl-drawing" className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateY(${p3}px)` }}>
          <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full" preserveAspectRatio="xMidYMid slice"
            stroke="white" fill="none" strokeWidth="0.5">

            {/* Floor plan — left wing */}
            <rect x="80" y="80" width="340" height="540" />
            <rect x="84" y="84" width="332" height="532" strokeWidth="0.25" strokeDasharray="4 4" />
            <rect x="80" y="80" width="160" height="180" />
            <rect x="80" y="260" width="160" height="200" />
            <rect x="80" y="460" width="160" height="160" />
            <rect x="240" y="80" width="180" height="540" />

            {/* Staircase */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={i} x1="252" y1={210 + i * 12} x2="310" y2={210 + i * 12} strokeWidth="0.4" />
            ))}

            {/* Doors */}
            <path d="M 240 200 Q 210 200 210 230" strokeWidth="0.6" />
            <line x1="210" y1="200" x2="240" y2="200" />
            <path d="M 240 380 Q 210 380 210 350" strokeWidth="0.6" />
            <line x1="210" y1="380" x2="240" y2="380" />

            {/* Windows */}
            <line x1="80" y1="130" x2="80" y2="180" strokeWidth="1.5" />
            <line x1="80" y1="300" x2="80" y2="360" strokeWidth="1.5" />
            <line x1="80" y1="490" x2="80" y2="540" strokeWidth="1.5" />

            {/* Elevation facade — right wing */}
            <rect x="560" y="120" width="580" height="460" />
            {Array.from({ length: 8 }).map((_, col) =>
              Array.from({ length: 5 }).map((_, row) => (
                <rect key={`w-${col}-${row}`} x={585 + col * 68} y={155 + row * 82} width="38" height="52" strokeWidth="0.4" />
              ))
            )}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`fc-${i}`} x1={560 + i * 72.5} y1="120" x2={560 + i * 72.5} y2="580" strokeWidth="0.25" strokeDasharray="2 6" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`ff-${i}`} x1="560" y1={120 + i * 92} x2="1140" y2={120 + i * 92} strokeWidth="0.25" strokeDasharray="2 6" />
            ))}
            <path d="M 820 580 L 820 500 Q 820 460 860 460 Q 900 460 900 500 L 900 580" strokeWidth="0.7" />

            {/* Dimension lines */}
            <line x1="80" y1="50" x2="420" y2="50" strokeWidth="0.4" />
            <line x1="80" y1="44" x2="80" y2="56" strokeWidth="0.4" />
            <line x1="420" y1="44" x2="420" y2="56" strokeWidth="0.4" />
            <line x1="50" y1="80" x2="50" y2="620" strokeWidth="0.4" />
            <line x1="44" y1="80" x2="56" y2="80" strokeWidth="0.4" />
            <line x1="44" y1="620" x2="56" y2="620" strokeWidth="0.4" />

            {/* North indicator */}
            <circle cx="490" cy="630" r="18" strokeWidth="0.6" />
            <polygon points="490,612 484,636 490,630 496,636" fill="white" fillOpacity="0.6" strokeWidth="0" />
            <line x1="490" y1="612" x2="490" y2="648" strokeWidth="0.5" />

            {/* Scale bar */}
            <line x1="560" y1="635" x2="760" y2="635" strokeWidth="0.6" />
            {[0, 1, 2, 3, 4].map(i => (
              <line key={`sb-${i}`} x1={560 + i * 50} y1="630" x2={560 + i * 50} y2="640" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        <div id="hl-elevation" className="absolute inset-0" style={{ transform: `translateY(${p3 * 0.6}px)` }} />
        <div id="hl-spot" className="absolute inset-0" style={{ transform: `translateY(${p4}px)` }} />
        <div id="hl-grain" className="absolute inset-0 pointer-events-none" />
        <div id="hl-vignette" className="absolute inset-0" />

        {/* Crosshair lines */}
        <div className="measure-h" style={{ top: '50%', left: 0, right: 0 }} />
        <div className="measure-v" style={{ left: '50%', top: 0, bottom: 0 }} />

        {/* Corner marks */}
        <div className="corner-mark tl" />
        <div className="corner-mark tr" />
        <div className="corner-mark bl" />
        <div className="corner-mark br" />

        {/* Coordinate labels */}
        <span className="coord-label" style={{ top: 36, left: 68 }}>A-01</span>
        <span className="coord-label" style={{ top: 36, right: 68 }}>A-02</span>
        <span className="coord-label" style={{ bottom: 72, left: 68 }}>B-01</span>
        <span className="coord-label" style={{ bottom: 72, right: 68 }}>B-02</span>
        <span className="coord-label" style={{ top: '50%', left: 20, transform: 'rotate(-90deg) translateX(-50%)' }}>SECTION A–A</span>
        <span className="coord-label" style={{ top: 20, left: '50%', transform: 'translateX(-50%)' }}>ELEVATION — NORTH FACADE</span>

        {/* Content */}
        <div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ transform: `translateY(${contentShift}px)` }}
        >
          <div className={`fu ${isVisible ? 'on' : 'off'} mb-5`} style={{ transitionDelay: '150ms' }}>
            <span className="hero-number">SHEET 01 / 01 &nbsp;·&nbsp; SCALE 1:100 &nbsp;·&nbsp; REV.A</span>
          </div>

          <div className={`fu ${isVisible ? 'on' : 'off'} mb-6`} style={{ transitionDelay: '300ms' }}>
            <span className="hero-eyebrow">{heroConfig.tagline}</span>
          </div>

          <div className={`fu ${isVisible ? 'on' : 'off'} w-48 mb-8`} style={{ transitionDelay: '440ms' }}>
            <div className="hero-rule" />
          </div>

          <h1
            className={`fu ${isVisible ? 'on' : 'off'} hero-title max-w-4xl`}
            style={{ transitionDelay: '560ms', fontSize: 'clamp(4rem, 11vw, 9rem)' }}
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

          <div className={`fu ${isVisible ? 'on' : 'off'} w-48 mt-8 mb-7`} style={{ transitionDelay: '700ms' }}>
            <div className="hero-rule" />
          </div>

          <div className={`fu ${isVisible ? 'on' : 'off'} mb-12`} style={{ transitionDelay: '800ms' }}>
            <span className="hero-sub">Precision &nbsp;·&nbsp; Form &nbsp;·&nbsp; Structure</span>
          </div>

          <div className={`fu ${isVisible ? 'on' : 'off'} flex flex-col sm:flex-row gap-4`} style={{ transitionDelay: '960ms' }}>
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

        {/* Drawing metadata strips */}
        <div className={`absolute bottom-8 right-8 transition-opacity duration-1000 text-right ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
          <div className="hero-number" style={{ marginBottom: '2px' }}>DRAWN BY: STUDIO</div>
          <div className="hero-number">DATE: {new Date().getFullYear()} &nbsp;·&nbsp; DWG NO. 001</div>
        </div>
        <div className={`absolute bottom-8 left-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1100ms' }}>
          <div className="hero-number">PROJECT: {(heroConfig.tagline || 'ARCHITECTURE').toUpperCase()}</div>
        </div>
      </section>
    </>
  );
};

export default Hero;