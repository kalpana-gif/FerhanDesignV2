import { useEffect, useRef, useState } from 'react';
import { aboutConfig } from '../config';

const About = () => {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section id="about" className="bg-white">
      {aboutConfig.sections.map((section, index) => {
        const isVisible = visibleSections.has(index);
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="flex flex-col lg:flex-row min-h-[560px]"
            style={{ flexDirection: isEven ? 'row' : 'row-reverse' } as React.CSSProperties}
          >
            {/* Image */}
            <div
              className="lg:w-1/2 h-[320px] lg:h-auto overflow-hidden"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(1.05)',
                transition: 'all 0.9s ease',
              }}
            >
              <img
                src={section.image}
                alt={section.heading}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div
              className="lg:w-1/2 flex flex-col justify-center px-10 md:px-16 py-16"
              style={{
                backgroundColor: section.backgroundColor,
                color: section.textColor,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : `translateX(${isEven ? '30px' : '-30px'})`,
                transition: 'all 0.8s ease 0.2s',
              }}
            >
              <span
                className="section-tag"
                style={{ color: 'var(--chrome)' }}
              >
                {section.tag}
              </span>

              {section.quote ? (
                <>
                  <blockquote
                    className="font-display text-2xl md:text-3xl leading-relaxed italic mb-6"
                    style={{ color: section.textColor }}
                  >
                    "{section.quote}"
                  </blockquote>
                  <p className="text-xs font-body uppercase tracking-widest text-chrome-dark">
                    {section.attribution}
                  </p>
                </>
              ) : (
                <>
                  <h2
                    className="font-display text-3xl md:text-4xl leading-tight mb-6"
                    style={{ color: section.textColor }}
                    dangerouslySetInnerHTML={{ __html: section.heading.replace('\n', '<br/>') }}
                  />
                  {section.paragraphs.map((para, pi) => (
                    <p
                      key={pi}
                      className="font-body font-light leading-relaxed mb-4 text-sm"
                      style={{ color: section.textColor === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'var(--steel-500)' }}
                    >
                      {para}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* Service Specialisations */}
      <div className="py-20 px-6 md:px-12 lg:px-[170px] bg-steel-100">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="section-tag" style={{ color: 'var(--steel-500)' }}>
            Specialisations
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-steel-950">Everything We Offer</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Single-Storey Residential",
            "Double-Storey Residential",
            "Three-Storey Dwellings",
            "Multi Residential",
            "Townhouses & Apartments",
            "Commercial Projects",
            "Extensions & Renovations",
            "Aged Care & Child Care",
            "3D Illustration",
            "Project Management",
            "Design & Construct",
            "Kiosk & Mixed-Use",
          ].map((item) => (
            <div
              key={item}
              className="p-5 border border-border hover:border-chrome bg-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-sm font-body text-steel-600 leading-snug text-center">{item}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Design Process */}
      <div className="py-20 px-6 md:px-12 lg:px-[170px] bg-white">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <span className="section-tag" style={{ color: 'var(--steel-500)' }}>
            Our Process
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-steel-950">How We Work</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutConfig.processSteps.map((step, i) => (
            <div key={i} className="relative pl-10 md:pl-0 md:text-center">
              <div className="w-12 h-12 rounded-full border border-steel-400 flex items-center justify-center font-body text-steel-500 text-sm mb-5 md:mx-auto bg-steel-50">
                {String(i + 1).padStart(2, '0')}
              </div>
              {i < aboutConfig.processSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+36px)] right-[-50%] h-px bg-border" />
              )}
              <h4 className="font-display text-xl text-steel-900 mb-3">{step.title}</h4>
              <p className="text-steel-500 font-body leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
