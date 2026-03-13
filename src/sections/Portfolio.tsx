import { useState } from 'react';
import { X, MapPin, Calendar, Tag, ChevronRight, Briefcase } from 'lucide-react';
import { projectsConfig, type Project } from '../config';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filtered = activeCategory === 'All'
        ? projectsConfig.projects
        : projectsConfig.projects.filter(p => p.category === activeCategory);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
    };

    return (
        <>
            <section id="portfolio" className="py-24 px-6 md:px-12 lg:px-[170px] bg-white">
                {/* Header */}
                <div className="mb-14 text-center max-w-3xl mx-auto">
                    <span className="section-tag">
                        {projectsConfig.tag}
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl text-steel-950 leading-tight mb-5">
                        {projectsConfig.heading}
                    </h2>
                    <p className="text-steel-500 font-body leading-relaxed text-base">
                        {projectsConfig.description}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {projectsConfig.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="px-5 py-2 text-xs font-body tracking-widest uppercase transition-all duration-300"
                            style={{
                                backgroundColor: activeCategory === cat ? 'var(--steel-900)' : 'transparent',
                                color: activeCategory === cat ? 'var(--white)' : 'var(--steel-500)',
                                border: '1px solid',
                                borderColor: activeCategory === cat ? 'var(--steel-900)' : 'var(--border)',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer overflow-hidden relative"
                            onClick={() => openModal(project)}
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-end">
                                <div className="p-6 w-full translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                                    <span className="text-steel-100 text-xs tracking-widest uppercase font-body">
                                        {project.category}
                                    </span>
                                    <h3 className="font-display text-white text-2xl mt-1">{project.name}</h3>
                                    <div className="flex items-center gap-1.5 text-steel-300 text-sm mt-2 font-body">
                                        <MapPin size={12} />
                                        <span>{project.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 text-chrome text-xs font-body tracking-wider uppercase">
                                        View Project <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                            {/* Status badge */}
                            {project.status !== 'Completed' && (
                                <div className="absolute top-4 right-4 bg-steel-900 text-white text-xs px-3 py-1 font-body tracking-wide uppercase">
                                    {project.status}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                    {/* Modal */}
                    <div
                        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-steel-900 hover:text-white transition-all duration-200"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        {/* Hero Image */}
                        <div className="aspect-[16/7] overflow-hidden">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {/* Meta */}
                            <div className="flex flex-wrap gap-4 mb-6 font-body">
                                <div className="flex items-center gap-1.5 text-steel-600 text-sm">
                                    <Tag size={14} />
                                    <span className="uppercase tracking-widest text-xs">{selectedProject.category}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-steel-500 text-sm">
                                    <MapPin size={14} />
                                    <span>{selectedProject.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-steel-500 text-sm">
                                    <Calendar size={14} />
                                    <span>{selectedProject.year}</span>
                                </div>
                            </div>

                            <h2 className="font-display text-4xl md:text-5xl text-steel-950 mb-4">{selectedProject.name}</h2>

                            {/* Status */}
                            <div className="inline-block mb-6 px-4 py-1.5 text-xs tracking-widest uppercase font-body"
                                style={{
                                    backgroundColor: selectedProject.status === 'Completed' ? 'var(--steel-100)' : 'var(--steel-50)',
                                    color: selectedProject.status === 'Completed' ? 'var(--steel-800)' : 'var(--steel-900)',
                                }}
                            >
                                {selectedProject.status}
                            </div>

                            <p className="text-steel-600 font-body leading-relaxed text-sm mb-8">
                                {selectedProject.description}
                            </p>

                            {/* Services */}
                            <div>
                                <h4 className="flex items-center gap-2 text-xs tracking-widest uppercase font-body text-steel-800 mb-4">
                                    <Briefcase size={14} className="text-chrome" /> Services Provided
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.services.map((svc, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 text-xs font-body text-steel-900 border border-border"
                                        >
                                            {svc}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-10 pt-8 border-t border-border">
                                <p className="text-steel-500 font-body mb-4">Interested in a similar project?</p>
                                <button
                                    onClick={() => {
                                        closeModal();
                                        setTimeout(() => {
                                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    }}
                                    className="btn-steel-primary"
                                >
                                    Start Your Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Portfolio;
