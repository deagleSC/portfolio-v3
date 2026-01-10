import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import { MouseSpotlight } from "@/components/mouse-spotlight";
import { ParticleBackground } from "@/components/particle-background";
import { HeroSection } from "@/components/sections/hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <ScrollProgress />
      <MouseSpotlight />
      <Navbar />
      <main className="min-h-screen relative z-10">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <ScrollToTop />
    </>
  );
}
