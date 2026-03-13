// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Farhan Architects | Architects in Perth Western Australia",
  description: "Perth experts in design and construction. Architecture & design studio specializing in residential, commercial and multi-residential projects in Western Australia.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Farhan Architects",
  menuLinks: [
    { label: "Home", href: "#hero" },
    { label: "About Us", href: "#about" },
    { label: "Our Portfolio", href: "#portfolio" },
    { label: "Team", href: "#team" },
    { label: "Design & Construct", href: "#design-construct" },
    { label: "Contact Us", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Search projects...",
  menuBackgroundImage: "/images/menu-bg.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "Architects in Perth, Western Australia",
  title: "Farhan Architects\n",
  ctaPrimaryText: "View Portfolio",
  ctaPrimaryTarget: "#portfolio",
  ctaSecondaryText: "About Us",
  ctaSecondaryTarget: "#about",
  backgroundImage: "/images/hero-bg.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "Our Approach",
  heading: "Precision Design\nfor Modern Living",
  bodyParagraphs: [
    "Ferhan Architects is a boutique Architectural design practice which specializes in contemporary home design, with function, form and innovative design solutions being our main focus throughout the design process.",
    "Energy efficient design has also been integrated into our architectural service, in the initiative to provide our clients the most effective and efficient design for the Site. Whether you're an investor or nester, we tailor the design to suit your very needs and budget."
  ],
  linkText: "Discover Our Story",
  linkTarget: "#about",
  image1: "/images/project-1.jpg",
  image2: "/images/project-2.jpg",
  stats: [
    { value: 17, suffix: "+", label: "Years Experience" },
    { value: 200, suffix: "+", label: "Projects Completed" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ],
};

// ─── Projects (Portfolio) ─────────────────────────────────────────────────────

export interface Project {
  id: number;
  name: string;
  category: string;
  location: string;
  year: string;
  image: string;
  gallery?: string[];
  description: string;
  services: string[];
  status: string;
}

export interface ProjectsConfig {
  tag: string;
  heading: string;
  description: string;
  categories: string[];
  projects: Project[];
}

export const projectsConfig: ProjectsConfig = {
  tag: "Our Portfolio",
  heading: "Award-Winning Architecture Across Perth",
  description: "From luxury single residences to multi-residential developments and commercial projects, our portfolio spans the breadth of contemporary architecture in Western Australia.",
  categories: ["All", "Single Story", "Double Story", "Multi Residential", "Commercial", "Design & Construct"],
  projects: [
    {
      id: 1,
      name: "Riverton Residence",
      category: "Double Story",
      location: "Riverton, Perth WA",
      year: "2024",
      image: "/images/project-1.jpg",
      gallery: ["/images/project-2.jpg", "/images/project-3.jpg", "/images/project-4.jpg"],
      description: "A stunning two-storey contemporary family home featuring clean geometric forms, floor-to-ceiling glazing, and seamless indoor-outdoor living. The design maximises natural light while providing optimal thermal performance for the Perth climate.",
      services: ["Concept Design", "Design Development", "Working Drawings", "Project Management"],
      status: "Completed"
    },
    {
      id: 2,
      name: "Willetton Residence",
      category: "Double Story",
      location: "Willetton, Perth WA",
      year: "2023",
      image: "/images/project-2.jpg",
      gallery: ["/images/project-1.jpg", "/images/project-5.jpg"],
      description: "An elegant double storey residence with white rendered facade and timber accents. Features a north-facing alfresco area, pool, and generous open-plan living spaces designed for the modern Australian family lifestyle.",
      services: ["Concept Design", "Design Development", "Working Drawings"],
      status: "Completed"
    },
    {
      id: 3,
      name: "John Street Apartments",
      category: "Multi Residential",
      location: "Queens Park, Perth WA",
      year: "2024",
      image: "/images/project-3.jpg",
      gallery: ["/images/project-6.jpg", "/images/project-4.jpg", "/images/project-2.jpg"],
      description: "A premium multi-residential development comprising 12 contemporary apartments over 4 levels. Each unit features private balconies, premium finishes, and shared amenities. Designed to complement the urban fabric of Queens Park.",
      services: ["Concept Design", "Design Development", "Working Drawings", "Development Application"],
      status: "Under Construction"
    },
    {
      id: 4,
      name: "Medical Centre Beckingham",
      category: "Commercial",
      location: "Beckingham, Perth WA",
      year: "2023",
      image: "/images/project-4.jpg",
      gallery: ["/images/project-1.jpg", "/images/project-3.jpg"],
      description: "A purpose-built modern medical facility designed to create a welcoming and functional environment for patients and practitioners. The design incorporates natural light, efficient workflow layouts, and accessibility throughout.",
      services: ["Concept Design", "Design Development", "Working Drawings", "Building Application"],
      status: "Design Development Stage"
    },
    {
      id: 5,
      name: "Southern River Residence",
      category: "Single Story",
      location: "Southern River, Perth WA",
      year: "2023",
      image: "/images/project-5.jpg",
      gallery: ["/images/project-2.jpg", "/images/project-1.jpg", "/images/project-6.jpg"],
      description: "A sophisticated single-storey home with a minimalist white facade and timber detailing. The design integrates passive solar principles with a thoughtful floor plan that connects internal spaces to the native Australian landscape.",
      services: ["Concept Design", "Design Development", "Working Drawings"],
      status: "Completed"
    },
    {
      id: 6,
      name: "Ficus Restaurant – Yagan Square",
      category: "Commercial",
      location: "Perth CBD, WA",
      year: "2022",
      image: "/images/project-6.jpg",
      gallery: ["/images/project-3.jpg", "/images/project-4.jpg"],
      description: "A vibrant restaurant and hospitality space at the iconic Yagan Square precinct in Perth CBD. The design features exposed concrete, warm timber joinery, and bespoke pendant lighting to create an inviting dining atmosphere in the heart of the city.",
      services: ["Concept Design", "Interior Architecture", "Working Drawings", "Project Management"],
      status: "Completed"
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
  processSteps: { title: string; description: string }[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "Who We Are",
      heading: "Architecture Studio\nBased in Perth, WA",
      paragraphs: [
        "Ferhan Architects is an Architectural design studio based in Perth, Western Australia. Our collaborative approach to residential, commercial and multi residential architecture results in precise solutions carefully attuned to their purpose.",
        "Established in July 2007, by the company co-founder and managing director, we cater our service for the Residential & Commercial sectors of the building industry. Our current projects range from New Single Residential homes, Multi Residential (apartments + units), as well as providing conceptual designs for light industrial and commercial facilities."
      ],
      quote: "",
      attribution: "",
      image: "/images/about-1.jpg",
      backgroundColor: "#111316",
      textColor: "#ffffff",
    },
    {
      tag: "Our Services",
      heading: "What We Specialise In",
      paragraphs: [],
      quote: "Whether you're an investor or nester, we tailor the design to suit your very needs and budget — delivering precise architecture solutions, carefully attuned to purpose.",
      attribution: "— Farhan Architects",
      image: "/images/project-3.jpg",
      backgroundColor: "#f2ede8",
      textColor: "#111316",
    },
  ],
  processSteps: [
    { title: "Concept Design", description: "We develop a brief with the Client on their requirements and produce a researched, first concept. We then present the concept to the client for feedback and begin the next phase." },
    { title: "Design Development", description: "The first concept drawings have been reviewed by the client and any amendments are carried out. Once accepted, they are lodged to the Local Council for Planning Approval." },
    { title: "Working Drawings", description: "The final phase of our design service — we produce Working Drawings for Local Council, Structural Engineers, and Builders to construct the building." },
  ],
};

// ─── Design & Construct ───────────────────────────────────────────────────────

export interface DesignConstructConfig {
  tag: string;
  heading: string;
  subheading: string;
  description: string;
  processSteps: string[];
  benefits: { title: string; description: string }[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const designConstructConfig: DesignConstructConfig = {
  tag: "Design & Construct",
  heading: "High Quality Buildings\nat Prices That Work for You",
  subheading: "End-to-end delivery of your vision",
  description: "The design and construct process helps you get the most out of our professional team. We love a challenge and solving problems. Our clients come to us when it's important to handle complexity, drive delivery, offer strategic and long term value, and to create innovative solutions. Our years of experience means we understand how a project's design will interact with the real world, while we also work hard to reduce costs without compromising on quality.",
  processSteps: [
    "Initial Consultation",
    "Design Stage",
    "Development Application",
    "Building Application",
    "Construction Stage",
  ],
  benefits: [
    {
      title: "Save Money",
      description: "The design construct model helps you save money. Unlike companies who only design, we know how to make design choices that reduce costs without compromising quality."
    },
    {
      title: "Faster Delivery",
      description: "This process is focused on getting onsite sooner, so you'll see a finished project quicker and start seeing a return on your investment sooner."
    },
    {
      title: "100% Transparency",
      description: "We keep you involved and in control of every step of the process so that you are 100% happy with the outcome."
    },
    {
      title: "Proven Experience",
      description: "With 17+ years of experience across Perth, our team delivers projects on time and to specification, every time."
    },
  ],
  ctaText: "Start Your Project",
  ctaTarget: "#contact",
  backgroundImage: "/images/project-4.jpg",
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Let's Build Something\nExtraordinary Together",
  description: "Ready to start your project? Contact us today for a consultation. We'd love to hear about your vision and show you how Farhan Architects can bring it to life.",
  locationLabel: "Address",
  location: "43A Macquarie Way Willetton 6155",
  emailLabel: "Email",
  email: "cf@ferhanarchitects.com.au",
  phoneLabel: "Phone",
  phone: "+61 (0) 402 427 059",
  formFields: {
    nameLabel: "Full Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "your@email.com",
    messageLabel: "Project Brief",
    messagePlaceholder: "Tell us about your project — location, type, budget, timeline...",
  },
  submitText: "Send Message",
  submittingText: "Sending...",
  submittedText: "Sent!",
  successMessage: "Thank you for contacting Farhan Architects. We'll get back to you within 24 hours.",
  backgroundImage: "/images/contact-bg.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "Farhan Architects",
  brandDescription: "Architecture & design studio based in Perth, Western Australia. Specialising in residential, multi-residential, and commercial architecture since 2007.",
  linkGroups: [
    {
      title: "Services",
      links: [
        { label: "Single Residential", href: "#portfolio" },
        { label: "Multi Residential", href: "#portfolio" },
        { label: "Commercial", href: "#portfolio" },
        { label: "Extensions & Renovations", href: "#portfolio" },
        { label: "Design & Construct", href: "#design-construct" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Portfolio", href: "#portfolio" },
        { label: "Contact Us", href: "#contact" },
      ]
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
  ],
  copyrightText: "© 2026 Farhan Architects. All rights reserved.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};

// ─── Team ────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialties: string[];
}

export interface TeamConfig {
  tag: string;
  heading: string;
  description: string;
  members: TeamMember[];
}

export const teamConfig: TeamConfig = {
  tag: "The Studio",
  heading: "Meet The Architects",
  description: "Our diverse team of architects, designers, and project managers bring decades of combined experience to every project we undertake.",
  members: [
    {
      id: 1,
      name: "Crishan Fernando",
      role: "Director",
      image: "/images/FerhanDesign_Chrishan1.jpg",
      bio: "Crishan has worked on a variety of different projects, including restaurant refurbishments, residential projects, including apartments, luxury houses and recycling facilities and commercial developments. Crishan is a registered architect with the Architects Board of WA (#3278) also professional member of Association of Consulting Architects (#6117). Chrishan has experience in Project Management and in a range of different fields including food service, commercial, civil, residential and retail drafting. Chrishan's interests are heavily into hi-tech architecture, energy efficiency, low-cost housing and environmentally-friendly design.\n\nQualifications & Registrations:\n• Registered Architect #3278\n• Association of Consulting Architects - Member Practice #6117\n• Corporation Registration #3327\n• Reg Builder Contractor #102155\n• Building Practitioner #103694\n• Post.Grad.Cert (Urban Design), B.Arch(Hons), Dip.Civil.Eng\n• Diploma of Building and Construction (Master Builders Association)",
      specialties: ["High-Tech Architecture", "Energy Efficient Design", "Low-Cost Housing", "Restaurant Refurbishments", "Project Management"],
    },
    {
      id: 2,
      name: "Adrian Price",
      role: "Consulting Architect",
      image: "/images/Ferhandesign-Adrian.jpg",
      bio: "Adrian holds a Bachelor of Design Studies and Bachelor of Architecture from the University of Adelaide and is a registered architect with the Architects Board of WA and the Architects Registration Board of Victoria. Adrian worked for retail architecture giant, The Buchan Group, major health facility firm Billard Leece Partnership where he was an Associate for several years, and the growing health practice, Vincent Chrisp Architects. Adrian's breadth of experience has seen him manage a variety of projects from high-end residential, commercial and major health facilities, including the $26million Alfred Hospital Intensive Care Unit (nominated for best institutional building in the 2009 AIA awards) and the $22million Latrobe Regional Hospital Cancer Care Centre. Known for his attention to detail, tight coordination during construction phases and his friendly but effective leadership, Adrian is always looking at new and better ways to deliver projects.",
      specialties: ["High-End Residential", "Commercial Design", "Major Health Facilities", "Project Delivery"],
    }
  ]
};

// ─── Product type alias for backward compat ──────────────────────────────────
export type Product = Project;
