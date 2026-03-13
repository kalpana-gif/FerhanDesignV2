import { useState } from 'react';
import { X, MapPin, Calendar, Tag, ChevronRight, Briefcase, ChevronLeft } from 'lucide-react';
import { projectsConfig, type Project } from '../config';

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = activeCategory === 'All'
        ? projectsConfig.projects
        : projectsConfig.projects.filter(p => p.category === activeCategory);

    const openModal = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
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
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-steel-900 hover:text-white transition-all duration-200"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>

                        {/* Hero Image Slider */}
                        <div className="relative aspect-[16/7] overflow-hidden bg-steel-100 group">
                            {(() => {
                                const allImages = [selectedProject.image, ...(selectedProject.gallery || [])];
                                const hasMultipleImages = allImages.length > 1;

                                const nextImage = (e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
                                };

                                const prevImage = (e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                                };

                                return (
                                    <>
                                        <div
                                            className="w-full h-full flex transition-transform duration-500 ease-out"
                                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                                        >
                                            {allImages.map((img, idx) => (
                                                <div 
                                                    key={idx} 
                                                    className="w-full h-full flex-shrink-0 relative cursor-pointer"
                                                    onClick={() => setLightboxIndex(idx)}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`${selectedProject.name} - view ${idx + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {hasMultipleImages && (
                                            <>
                                                {/* Left Arrow */}
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 text-steel-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft size={20} />
                                                </button>

                                                {/* Right Arrow */}
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 text-steel-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>

                                                {/* Dots */}
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                                    {allImages.map((_, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentImageIndex(idx);
                                                            }}
                                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                                            aria-label={`Go to slide ${idx + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                );
                            })()}
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

                            {/* Gallery Grid */}
                            {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-border">
                                    <h4 className="flex items-center gap-2 text-xs tracking-widest uppercase font-body text-steel-800 mb-6">
                                        <Tag size={14} className="text-chrome" /> Project Gallery
                                    </h4>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {[selectedProject.image, ...selectedProject.gallery].map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="aspect-square cursor-pointer overflow-hidden group"
                                                onClick={() => setLightboxIndex(idx)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${selectedProject.name} gallery view ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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

            {/* Lightbox Slider */}
            {lightboxIndex !== null && selectedProject && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Dark/Blurred Backdrop */}
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

                    {/* Close Button */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200"
                        aria-label="Close fullscreen gallery"
                    >
                        <X size={24} strokeWidth={1.5} />
                    </button>

                    {(() => {
                        const allImages = [selectedProject.image, ...(selectedProject.gallery || [])];
                        
                        const nextLightboxImage = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
                        };

                        const prevLightboxImage = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? allImages.length - 1 : prev - 1) : 0));
                        };

                        return (
                            <div 
                                className="relative w-full h-full flex items-center justify-center max-w-7xl mx-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Main Image Container */}
                                <div className="relative w-full aspect-video md:aspect-auto md:h-[80vh] flex justify-center">
                                    <img
                                        src={allImages[lightboxIndex]}
                                        alt={`${selectedProject.name} fullscreen view`}
                                        className="max-w-full max-h-full object-contain shadow-2xl"
                                    />
                                </div>

                                {/* Navigation Arrows */}
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevLightboxImage}
                                            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-14 h-14 text-white/70 hover:text-white flex items-center justify-center transition-all hover:scale-110 z-10 p-2"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={36} strokeWidth={1} />
                                        </button>
                                        <button
                                            onClick={nextLightboxImage}
                                            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-14 h-14 text-white/70 hover:text-white flex items-center justify-center transition-all hover:scale-110 z-10 p-2"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={36} strokeWidth={1} />
                                        </button>

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white/80 px-4 py-1.5 rounded-full text-xs font-body tracking-widest uppercase">
                                            {lightboxIndex + 1} / {allImages.length}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })()}
                </div>
            )}
        </>
    );
};

export default Portfolio;
