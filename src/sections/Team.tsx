import { useState, useEffect, useRef } from 'react';
import { X, Briefcase, ChevronRight } from 'lucide-react';
import { teamConfig, type TeamMember } from '../config';

// ─── Modal / Bottom-sheet ─────────────────────────────────────────────────────
const MemberModal = ({
    member,
    onClose,
}: {
    member: TeamMember;
    onClose: () => void;
}) => {
    const [visible, setVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sheetRef = useRef<HTMLDivElement>(null);

    // Detect mobile on mount + resize
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Animate in after first paint
    useEffect(() => {
        const tid = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
        document.body.style.overflow = 'hidden';
        return () => {
            cancelAnimationFrame(tid);
            document.body.style.overflow = '';
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 480);
    };

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div
            className="fixed inset-0 z-[9999] flex"
            style={{ alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center' }}
        >
            {/* ── Scrim ────────────────────────────────────────────────── */}
            <div
                onClick={handleClose}
                style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(8,10,18,0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                }}
            />

            {/* ── Panel ────────────────────────────────────────────────── */}
            <div
                ref={sheetRef}
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '860px',
                    maxHeight: isMobile ? '92vh' : '88vh',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    overflow: 'hidden',
                    // Desktop: scale in. Mobile: slide up.
                    ...(isMobile
                        ? {
                            borderRadius: '1.5rem 1.5rem 0 0',
                            boxShadow: '0 -32px 80px rgba(0,0,0,0.35)',
                            transform: visible ? 'translateY(0)' : 'translateY(100%)',
                            transition: 'transform 0.52s cubic-bezier(0.16,1,0.3,1)',
                        }
                        : {
                            borderRadius: '0.25rem',
                            boxShadow: '0 40px 120px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,0,0,0.12)',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(16px)',
                            transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                        }),
                }}
            >
                {/* ── Mobile drag handle ────────────────────────────────── */}
                {isMobile && (
                    <div style={{ padding: '0.875rem 0 0', flexShrink: 0 }}>
                        <div style={{
                            width: 36, height: 4, borderRadius: 9999,
                            background: 'rgba(0,0,0,0.12)', margin: '0 auto',
                        }} />
                    </div>
                )}

                {/* ── Close button ─────────────────────────────────────── */}
                <button
                    onClick={handleClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute',
                        top: isMobile ? '1rem' : '1.25rem',
                        right: '1.25rem',
                        zIndex: 20,
                        width: 36, height: 36,
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.06)',
                        border: '0.5px solid rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        color: '#000',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.14)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)'; }}
                >
                    <X size={15} strokeWidth={2} />
                </button>

                {/* ── Photo ────────────────────────────────────────────── */}
                <div style={{
                    flexShrink: 0,
                    width: isMobile ? '100%' : '42%',
                    ...(isMobile
                        ? { height: '38vh', minHeight: 200 }
                        : { height: 'auto' }),
                    overflow: 'hidden',
                    position: 'relative',
                }}>
                    <img
                        src={member.image}
                        alt={member.name}
                        style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                            filter: 'grayscale(15%)',
                            display: 'block',
                        }}
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80';
                        }}
                    />

                    {/* Photo gradient overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: isMobile
                            ? 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.15) 100%)'
                            : 'linear-gradient(to right, transparent 80%, rgba(255,255,255,0.08) 100%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Role badge — pinned to bottom-left of photo */}
                    <div style={{
                        position: 'absolute', bottom: '1rem', left: '1rem',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 4,
                        background: 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '0.5px solid rgba(255,255,255,0.15)',
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(255,255,255,0.8)',
                    }}>
                        {member.role}
                    </div>
                </div>

                {/* ── Content ──────────────────────────────────────────── */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: isMobile ? '1.5rem 1.5rem 2rem' : '3rem 2.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {/* Name */}
                    <h2
                        className="font-display"
                        style={{
                            fontSize: isMobile ? 'clamp(2rem, 8vw, 2.75rem)' : '2.75rem',
                            lineHeight: 1,
                            letterSpacing: '-0.02em',
                            color: '#0a0c14',
                            marginBottom: '0.5rem',
                        }}
                    >
                        {member.name}
                    </h2>

                    {/* Thin divider */}
                    <div style={{
                        height: '0.5px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.15), transparent)',
                        margin: '1.25rem 0',
                        width: '80%',
                    }} />

                    {/* Bio */}
                    <p
                        className="font-body"
                        style={{
                            fontSize: 14,
                            lineHeight: 1.75,
                            color: 'rgba(0,0,0,0.55)',
                            fontWeight: 300,
                            marginBottom: '2rem',
                        }}
                    >
                        {member.bio}
                    </p>

                    {/* Specialties */}
                    <div>
                        <h4
                            className="font-body"
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 10, letterSpacing: '0.18em',
                                textTransform: 'uppercase' as const,
                                color: 'rgba(0,0,0,0.38)',
                                marginBottom: '0.875rem',
                            }}
                        >
                            <Briefcase size={12} strokeWidth={1.5} />
                            Areas of Expertise
                        </h4>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {member.specialties.map((spec, i) => (
                                <span
                                    key={i}
                                    className="font-body"
                                    style={{
                                        padding: '0.35rem 0.75rem',
                                        fontSize: 11,
                                        color: 'rgba(0,0,0,0.6)',
                                        background: 'rgba(0,0,0,0.04)',
                                        border: '0.5px solid rgba(0,0,0,0.1)',
                                        borderRadius: 2,
                                        letterSpacing: '0.04em',
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? 'translateY(0)' : 'translateY(6px)',
                                        transition: `opacity 0.4s ease ${0.25 + i * 0.04}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.04}s`,
                                    }}
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Safe area for mobile */}
                    <div style={{ height: 'env(safe-area-inset-bottom, 0px)', flexShrink: 0 }} />
                </div>
            </div>
        </div>
    );
};

// ─── Team Card ────────────────────────────────────────────────────────────────
const TeamCard = ({
    member,
    onClick,
}: {
    member: TeamMember;
    onClick: () => void;
}) => {
    const [hovered, setHovered] = useState(false);
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                cursor: 'pointer',
                background: '#ffffff',
                border: '0.5px solid rgba(0,0,0,0.09)',
                boxShadow: hovered
                    ? '0 16px 48px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)'
                    : '0 1px 4px rgba(0,0,0,0.05)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                overflow: 'hidden',
            }}
        >
            {/* Photo */}
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={member.image}
                    alt={member.name}
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                        transform: hovered ? 'scale(1.04)' : 'scale(1)',
                        transition: 'filter 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                        opacity: loaded ? 1 : 0,
                    }}
                    onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80';
                        setLoaded(true);
                    }}
                />

                {/* Hover CTA */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '2.5rem 1.25rem 1.25rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    display: 'flex', alignItems: 'center', gap: 6,
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    color: 'rgba(255,255,255,0.9)',
                }}>
                    View Profile <ChevronRight size={13} strokeWidth={1.5} />
                </div>
            </div>

            {/* Name / role */}
            <div style={{ padding: '1.25rem 1.5rem 1.5rem', textAlign: 'center' }}>
                <h3
                    className="font-display"
                    style={{
                        fontSize: '1.35rem',
                        letterSpacing: '-0.01em',
                        color: '#0a0c14',
                        marginBottom: '0.3rem',
                        lineHeight: 1.1,
                    }}
                >
                    {member.name}
                </h3>
                <p
                    className="font-body"
                    style={{
                        fontSize: 10,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase' as const,
                        color: 'rgba(0,0,0,0.38)',
                    }}
                >
                    {member.role}
                </p>
            </div>
        </div>
    );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const Team = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    return (
        <>
            <section id="team" className="py-24 px-6 md:px-12 lg:px-[170px] bg-steel-50">
                {/* Header */}
                <div className="mb-14 text-center max-w-3xl mx-auto">
                    <span className="section-tag">{teamConfig.tag}</span>
                    <h2 className="text-4xl md:text-5xl text-steel-950 mb-5">{teamConfig.heading}</h2>
                    <div className="divider-steel" />
                    <p className="text-steel-600 mt-5">{teamConfig.description}</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {teamConfig.members.map((member) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            onClick={() => setSelectedMember(member)}
                        />
                    ))}
                </div>
            </section>

            {selectedMember && (
                <MemberModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </>
    );
};

export default Team;