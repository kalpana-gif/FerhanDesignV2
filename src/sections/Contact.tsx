import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { contactConfig } from '../config';

const Contact = () => {
    if (!contactConfig.heading) return null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [launched, setLaunched] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // ── Build mailto: URI and open native mail client ─────────────────────────
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const to      = contactConfig.email ?? '';
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body    = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
        );

        // Opens Mail on iOS/macOS/Android, Outlook or default client on Windows/desktop
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

        // Brief visual confirmation that the mail app was triggered
        setLaunched(true);
        setTimeout(() => setLaunched(false), 4000);
    };

    const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim();

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center"
        >
            {/* Background Image */}
            {contactConfig.backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${contactConfig.backgroundImage})` }}
                />
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-16">

                    {/* ── Left Side — Info ──────────────────────────────────────────── */}
                    <div
                        className={`lg:w-1/2 text-white transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    >
                        <h2 className="font-display text-5xl md:text-6xl lg:text-[80px] mb-8 leading-none text-white">
                            {contactConfig.heading}
                        </h2>

                        <p className="text-xl font-body font-light leading-relaxed opacity-90 mb-12 max-w-md text-white">
                            {contactConfig.description}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-12">
                            {contactConfig.location && (
                                <div className="flex items-center gap-4">
                                    <MapPin size={20} strokeWidth={1.5} className="text-chrome shrink-0" />
                                    <div>
                    <span className="block text-xs font-body uppercase tracking-wider opacity-60 mb-1">
                      {contactConfig.locationLabel}
                    </span>
                                        <span className="font-light font-body">{contactConfig.location}</span>
                                    </div>
                                </div>
                            )}

                            {contactConfig.email && (
                                <div className="flex items-center gap-4">
                                    <Mail size={20} strokeWidth={1.5} className="text-chrome shrink-0" />
                                    <div>
                    <span className="block text-xs font-body uppercase tracking-wider opacity-60 mb-1">
                      {contactConfig.emailLabel}
                    </span>
                                        {/* Direct mailto tap target for when someone just wants to email directly */}
                                        <a
                                            href={`mailto:${contactConfig.email}`}
                                            className="font-light font-body hover:text-chrome transition-colors underline-offset-4 hover:underline"
                                        >
                                            {contactConfig.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contactConfig.phone && (
                                <div className="flex items-center gap-4">
                                    <Phone size={20} strokeWidth={1.5} className="text-chrome shrink-0" />
                                    <div>
                    <span className="block text-xs font-body uppercase tracking-wider opacity-60 mb-1">
                      {contactConfig.phoneLabel}
                    </span>
                                        <a
                                            href={`tel:${contactConfig.phone}`}
                                            className="font-light font-body hover:text-chrome transition-colors underline-offset-4 hover:underline"
                                        >
                                            {contactConfig.phone}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Map Iframe */}
                        <div className="w-full h-64 md:h-80 rounded-sm overflow-hidden border border-white/20 shadow-lg relative bg-white/5">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.8217316377774!2d115.8856525!3d-32.053896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bcab8a9aefff%3A0xbcf4c7e6c518b26!2s43A%20Macquarie%20Way%2C%20Willetton%20WA%206155%2C%20Australia!5e0!3m2!1sen!2sus!4v1709600000000!5m2!1sen!2sus" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen={false} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>

                    {/* ── Right Side — Form ─────────────────────────────────────────── */}
                    <div
                        className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div>
                                <input
                                    type="text"
                                    placeholder={contactConfig.formFields.namePlaceholder}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    autoComplete="name"
                                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-chrome transition-colors font-body font-light text-lg"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder={contactConfig.formFields.emailPlaceholder}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    autoComplete="email"
                                    inputMode="email"
                                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-chrome transition-colors font-body font-light text-lg"
                                />
                            </div>

                            <div>
                <textarea
                    placeholder={contactConfig.formFields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-chrome transition-colors font-body font-light text-lg resize-none"
                />
                            </div>

                            {/* ── Submit button ───────────────────────────────────────── */}
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`
                  group w-full flex items-center justify-center gap-3 py-5
                  border font-body font-light tracking-widest text-sm
                  transition-all duration-300
                  ${launched
                                    ? 'bg-green-900/40 border-green-500/60 text-green-300 cursor-default'
                                    : canSubmit
                                        ? 'bg-steel-900 border-steel-900 text-white hover:bg-steel-800 hover:border-steel-800 cursor-pointer'
                                        : 'bg-steel-900/50 border-steel-900/50 text-white/40 cursor-not-allowed'
                                }
                `}
                            >
                                {launched ? (
                                    <>
                                        <span>Mail app opened</span>
                                        {/* Subtle checkmark */}
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                            <path d="M2.5 7.5L6 11L12.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        <span>{contactConfig.submitText ?? 'Open in Mail'}</span>
                                        <ArrowUpRight
                                            size={15}
                                            strokeWidth={1.5}
                                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        />
                                    </>
                                )}
                            </button>

                            {/* Helper hint — shown only when fields are filled */}
                            {canSubmit && !launched && (
                                <p className="text-center text-white/35 text-xs font-body tracking-wide -mt-4 transition-opacity duration-300">
                                    Opens your device's mail app with this message pre-filled
                                </p>
                            )}

                            {/* Post-launch confirmation */}
                            {launched && (
                                <p className="text-center text-green-400/80 text-xs font-body tracking-wide -mt-4 transition-opacity duration-300">
                                    {contactConfig.successMessage ?? 'Your mail client should have opened. Send whenever you\'re ready.'}
                                </p>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;