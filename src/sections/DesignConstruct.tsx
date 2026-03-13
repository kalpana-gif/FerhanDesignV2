import { CheckCircle, ArrowRight } from 'lucide-react';
import { designConstructConfig } from '../config';

const DesignConstruct = () => {
    const scrollToContact = (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector(designConstructConfig.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="design-construct" className="bg-steel-950 py-24">
            {/* Top hero strip */}
            <div
                className="relative h-[320px] bg-cover bg-center mb-16"
                style={{ backgroundImage: `url(${designConstructConfig.backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-steel-950/85" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-[170px]">
                    <span className="section-tag" style={{ color: 'var(--chrome)' }}>
                        {designConstructConfig.tag}
                    </span>
                    <h2
                        className="font-display text-4xl md:text-5xl text-steel-50 leading-tight text-white"
                        dangerouslySetInnerHTML={{
                            __html: designConstructConfig.heading.replace('\n', '<br/>'),
                        }}
                    />
                    <p className="text-white/70 font-light mt-4 text-base">
                        {designConstructConfig.subheading}
                    </p>
                </div>
            </div>

            <div className="px-6 md:px-12 lg:px-[170px]">
                {/* Description + Process */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                    {/* Left: description */}
                    <div>
                        <p className="text-white/80 font-light leading-[1.9] text-base mb-8">
                            {designConstructConfig.description}
                        </p>
                        <a
                            href={designConstructConfig.ctaTarget}
                            onClick={scrollToContact}
                            className="btn-steel-outline mt-4 border-steel-700 bg-steel-800"
                        >
                            {designConstructConfig.ctaText}
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Right: process */}
                    <div>
                        <h3 className="section-tag mb-8" style={{ color: 'var(--chrome)' }}>Our Process</h3>
                        <div className="space-y-0">
                            {designConstructConfig.processSteps.map((step, i) => (
                                <div key={i} className="flex items-start gap-5 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-9 h-9 rounded-full border border-steel-600 flex items-center justify-center text-steel-400 text-sm font-body flex-shrink-0 group-hover:bg-steel-600 group-hover:text-steel-100 transition-all duration-300">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        {i < designConstructConfig.processSteps.length - 1 && (
                                            <div className="w-px h-10 bg-steel-800" />
                                        )}
                                    </div>
                                    <div className="pb-10">
                                        <p className="text-white font-light text-base">{step}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="border-t border-[#2a2a2a] pt-16">
                    <h3 className="section-tag mb-12 text-center" style={{ color: 'var(--chrome)' }}>
                        Why Design & Construct?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {designConstructConfig.benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="p-8 border border-steel-800 hover:border-chrome transition-all duration-300 group"
                            >
                                <CheckCircle
                                    size={28}
                                    strokeWidth={1.5}
                                    className="text-chrome mb-5 group-hover:scale-110 transition-transform duration-300"
                                />
                                <h4 className="font-display text-steel-50 text-xl mb-3 text-white   ">{benefit.title}</h4>
                                <p className="text-steel-400 font-light text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignConstruct;
