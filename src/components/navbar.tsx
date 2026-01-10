"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavDrawer } from "@/components/mobile-nav-drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import portfolioData from "@/data/data.json";
import type { NavItem } from "@/types/portfolio";

const navItems = portfolioData.navItems as NavItem[];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["hero", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      // Check if we're at the bottom of the page (for the last section)
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveSection("#contact");
        return;
      }

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const nextElement = sections[i + 1]
            ? document.getElementById(sections[i + 1])
            : null;
          const nextOffsetTop = nextElement ? nextElement.offsetTop : Infinity;

          if (scrollPosition >= offsetTop && scrollPosition < nextOffsetTop) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const element = document.querySelector(href);
      if (element) {
        // Calculate position with offset for fixed navbar
        const navbarHeight = 56; // h-14 = 56px
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        // Use smooth scroll with custom timing
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      setActiveSection(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo / Name */}
            <button
              onClick={() => handleNavClick("#hero")}
              className="text-base font-semibold text-foreground hover:text-primary transition-colors"
            >
              <span className="text-primary">&lt;</span>
              {portfolioData.hero.name.split(" ")[0]}
              <span className="text-primary">/&gt;</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-secondary/50 rounded-full p-1">
                {navItems
                  .filter((item) => !item.isExternal)
                  .map((item) => {
                    const isActive = activeSection === item.href;
                    return (
                      <button
                        key={item.href}
                        onClick={() =>
                          handleNavClick(item.href, item.isExternal)
                        }
                        className={`relative px-4 py-1.5 text-sm font-medium transition-all duration-200 rounded-full ${
                          isActive
                            ? "text-primary-foreground dark:text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-primary border border-primary/50 dark:bg-primary/10 dark:border-primary/20 rounded-full -z-10"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.5,
                            }}
                          />
                        )}
                        {item.label}
                      </button>
                    );
                  })}
              </div>
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile: Theme Toggle & Menu Button */}
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                className="text-muted-foreground hover:text-foreground h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        onNavClick={handleNavClick}
      />
    </>
  );
}
