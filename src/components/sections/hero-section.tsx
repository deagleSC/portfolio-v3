"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import portfolioData from "@/data/data.json";
import type { HeroData, SocialLink } from "@/types/portfolio";

const heroData = portfolioData.hero as HeroData;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function HeroSection() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const hasSnapped = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollToExperience = () => {
    const element = document.querySelector("#experience");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile scroll snap: when user scrolls past a threshold, snap to experience section
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (!isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = sectionRef.current?.offsetHeight || window.innerHeight;
      const threshold = heroHeight * 0.15; // 15% scroll triggers snap

      if (scrollY > threshold && !hasSnapped.current) {
        hasSnapped.current = true;
        // Scroll to just past the hero section (hero height minus some padding)
        const scrollTarget = heroHeight - 100;
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
      }

      // Reset snap flag when scrolled back to top
      if (scrollY < 10) {
        hasSnapped.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto pb-16 sm:pb-20 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="shrink-0"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-20 blur-xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src={heroData.image}
                  alt={heroData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Status Badge */}
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-3 py-1 bg-card border border-border rounded-full shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-foreground">
                  Available
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 dark:bg-teal-400/10 dark:text-teal-300 dark:border-teal-400/20">
                <span className="w-1.5 h-1.5 bg-primary rounded-full dark:bg-teal-300" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight"
            >
              {heroData.name}
            </motion.h1>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-base sm:text-lg font-medium text-primary mb-3"
            >
              {heroData.headline}
            </motion.h2>

            {/* Description - Full on larger screens */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="hidden sm:block text-sm text-muted-foreground mb-5 leading-relaxed"
            >
              {heroData.description}
            </motion.p>

            {/* Description - Truncated on mobile with Read More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="sm:hidden mb-5"
            >
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {heroData.description}
              </p>
              <button
                onClick={() => setIsDescriptionOpen(true)}
                className="mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Read more
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <Button
                variant="default"
                size="default"
                asChild
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 dark:bg-primary/10 dark:text-primary dark:hover:bg-primary/20 dark:border-primary/20"
              >
                <a
                  href={heroData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
              <Button
                variant="outline"
                size="default"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground"
              >
                Get in Touch
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-1"
            >
              {heroData.socialLinks.map((link: SocialLink) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={handleScrollToExperience}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-widest">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
      {/* Description Drawer for Mobile */}
      <Drawer open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-lg font-bold">About Me</DrawerTitle>
            <DrawerDescription className="text-primary font-medium text-left mt-3">
              {heroData.headline}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {heroData.description}
            </p>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
