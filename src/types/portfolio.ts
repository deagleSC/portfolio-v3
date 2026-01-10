export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface HeroData {
  name: string;
  headline: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
  resumeUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ProjectLink {
  type: "github" | "live" | "demo";
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageDark?: string;
  imageLight?: string;
  technologies: string[];
  links: ProjectLink[];
}

export interface ContactData {
  email: string;
  message: string;
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface PortfolioData {
  hero: HeroData;
  experience: Experience[];
  projects: Project[];
  contact: ContactData;
  navItems: NavItem[];
}
