"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  ResizableSheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import portfolioData from "@/data/data.json";
import type { Experience } from "@/types/portfolio";

const experiences = portfolioData.experience as Experience[];

interface ExperienceModalContentProps {
  experience: Experience;
}

function ExperienceModalContent({ experience }: ExperienceModalContentProps) {
  return (
    <div className="space-y-6 px-4 pb-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{experience.period}</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{experience.location}</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded dark:bg-teal-400/10 dark:text-teal-300">
          {experience.type}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {experience.description}
      </p>

      {/* Key Achievements */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          Key Achievements
        </h4>
        <ul className="space-y-2.5">
          {experience.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed">
                {highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          Technologies
        </h4>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {experience.technologies.map((tech) => (
            <li key={tech}>
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full dark:bg-teal-400/10 dark:text-teal-300">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onSelect: (experience: Experience) => void;
}

function ExperienceCard({ experience, index, onSelect }: ExperienceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  // Subtle scale effect
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ y: smoothY, scale: smoothScale }}
    >
      <Card
        className="group relative border-none bg-transparent shadow-none transition-all hover:!opacity-100 group-hover/list:opacity-50 cursor-pointer"
        onClick={() => onSelect(experience)}
      >
        {/* Hover background effect */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-slate-800/50" />

        <div className="z-10 relative flex flex-col gap-1 pb-1 transition-all">
          {/* Period */}
          <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {experience.period}
          </header>

          <div className="z-10">
            {/* Title & Company */}
            <h3 className="font-medium leading-snug text-foreground">
              <div>
                <span className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base transition-colors">
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span>
                    {experience.role} ·{" "}
                    <span className="inline-block">
                      {experience.company}
                      <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                    </span>
                  </span>
                </span>
              </div>
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-normal text-muted-foreground">
              {experience.description}
            </p>

            {/* Technologies */}
            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
              {experience.technologies.map((skill, skillIndex) => (
                <motion.li
                  key={skill}
                  className="mr-1.5 mt-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: index * 0.15 + skillIndex * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <span className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-xs font-medium leading-5 dark:bg-teal-400/10 dark:text-teal-300 dark:hover:bg-teal-400/20 transition-colors">
                    {skill}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ExperienceSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const handleClose = () => setSelectedExperience(null);

  return (
    <>
      <section
        id="experience"
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -50 }}
            animate={
              isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 relative"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute -left-4 top-0 bottom-0 w-1 bg-primary origin-top"
            />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
              Experience
            </h2>
          </motion.div>

          {/* Experience List */}
          <div className="flex flex-col gap-12 group/list">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                onSelect={setSelectedExperience}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop: Resizable Sheet from right */}
      {isDesktop && (
        <Sheet
          open={!!selectedExperience}
          onOpenChange={(open) => !open && handleClose()}
        >
          <ResizableSheetContent onClose={handleClose}>
            {selectedExperience && (
              <>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">
                    {selectedExperience.role}
                  </SheetTitle>
                  <SheetDescription className="text-primary font-medium">
                    {selectedExperience.company}
                  </SheetDescription>
                </SheetHeader>
                <ExperienceModalContent experience={selectedExperience} />
              </>
            )}
          </ResizableSheetContent>
        </Sheet>
      )}

      {/* Mobile/Tablet: Drawer */}
      {!isDesktop && (
        <Drawer
          open={!!selectedExperience}
          onOpenChange={(open) => !open && handleClose()}
        >
          <DrawerContent className="max-h-[85vh]">
            {selectedExperience && (
              <>
                <DrawerHeader className="text-left">
                  <DrawerTitle className="text-lg font-bold">
                    {selectedExperience.role}
                  </DrawerTitle>
                  <DrawerDescription className="text-primary font-medium">
                    {selectedExperience.company}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-8 overflow-y-auto">
                  <ExperienceModalContent experience={selectedExperience} />
                </div>
              </>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
