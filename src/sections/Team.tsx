import { useState } from 'react';
import { X, Briefcase, ChevronRight } from 'lucide-react';
import { teamConfig, type TeamMember } from '../config';

const Team = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const openModal = (member: TeamMember) => {
        setSelectedMember(member);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedMember(null);
        document.body.style.overflow = '';
    };

    return (
        <>
            <section id="team" className="py-24 px-6 md:px-12 lg:px-[170px] bg-steel-50">
                {/* Header */}
                <div className="mb-14 text-center max-w-3xl mx-auto">
                    <span className="section-tag">
                        {teamConfig.tag}
                    </span>
                    <h2 className="text-4xl md:text-5xl text-steel-950 mb-5">
                        {teamConfig.heading}
                    </h2>
                    <div className="divider-steel" />
                    <p className="text-steel-600 mt-5">
                        {teamConfig.description}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamConfig.members.map((member) => (
                        <div
                            key={member.id}
                            className="group cursor-pointer bg-white border border-border shadow-xs hover:shadow-md transition-all duration-300"
                            onClick={() => openModal(member)}
                        >
                            <div className="aspect-[3/4] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        // Fallback to unsplash if local image not found
                                        e.currentTarget.src = `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80`;
                                    }}
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-steel-950/80 to-transparent p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                                    <div className="flex items-center gap-2 text-steel-100 text-sm font-body">
                                        View Profile <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-2xl text-steel-900 mb-1">{member.name}</h3>
                                <p className="text-chrome-dark text-xs uppercase tracking-widest font-body">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Profile Modal */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-steel-950/90 backdrop-blur-sm" />

                    {/* Modal */}
                    <div
                        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-steel-100 text-steel-900 hover:bg-steel-900 hover:text-white transition-all duration-300 rounded-full shadow-md"
                        >
                            <X size={18} strokeWidth={2} />
                        </button>

                        {/* Photo Column */}
                        <div className="md:w-2/5 aspect-[3/4] md:aspect-auto overflow-hidden grayscale">
                            <img
                                src={selectedMember.image}
                                alt={selectedMember.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80`;
                                }}
                            />
                        </div>

                        {/* Content Column */}
                        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-chrome-dark text-xs tracking-[0.2em] uppercase font-body mb-2 block">
                                {selectedMember.role}
                            </span>
                            <h2 className="text-4xl text-steel-950 mb-6">{selectedMember.name}</h2>
                            <div className="divider-steel ml-0 mb-6" />

                            <p className="text-steel-600 font-light leading-relaxed text-sm mb-8">
                                {selectedMember.bio}
                            </p>

                            {/* Specialties */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs tracking-widest uppercase font-body text-steel-800 mb-4">
                                    <Briefcase size={14} className="text-chrome" />
                                    Areas of Expertise
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMember.specialties.map((spec, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 text-xs font-body text-steel-700 bg-steel-50 border border-border"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Team;
