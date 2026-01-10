"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import portfolioData from "@/data/data.json";
import type { Project, ProjectLink } from "@/types/portfolio";

const projects = portfolioData.projects as Project[];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch - only use theme after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the primary link (live > demo > github)
  const primaryLink =
    project.links.find((l) => l.type === "live") ||
    project.links.find((l) => l.type === "demo") ||
    project.links[0];

  // Get theme-aware image (use default image until mounted to prevent hydration mismatch)
  const projectImage = mounted
    ? resolvedTheme === "dark"
      ? project.imageDark || project.image
      : project.imageLight || project.image
    : project.image;

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax movement (alternating direction based on index)
  const yRange = index % 2 === 0 ? [25, -25] : [20, -20];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });

  // Subtle rotation for visual interest
  const rotate = useTransform(scrollYProgress, [0, 1], [0.5, -0.5]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

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
      style={{ y: smoothY, rotate: smoothRotate }}
    >
      <Card className="group relative border-none bg-transparent shadow-none transition-all hover:!opacity-100 group-hover/list:opacity-50">
        {/* Hover background effect */}
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none sm:-inset-x-6 sm:block sm:group-hover:bg-slate-100 sm:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] sm:group-hover:drop-shadow-lg dark:sm:group-hover:bg-slate-800/50" />

        <div className="z-10 relative flex flex-col sm:flex-row gap-4 pb-1 transition-all">
          {/* Project Image */}
          <div className="z-10 mt-1 sm:w-48 sm:shrink-0">
            <Image
              src={projectImage}
              alt={project.title}
              width={200}
              height={120}
              className="w-full h-auto rounded border-2 border-border/50 transition group-hover:border-border"
            />
          </div>

          <div className="z-10 flex-1">
            {/* Title */}
            <h3 className="font-medium leading-snug text-foreground">
              <div>
                <Link
                  className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base transition-colors"
                  href={primaryLink?.url || "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.title} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 sm:block" />
                  <span>
                    {project.title}
                    <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                  </span>
                </Link>
              </div>
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-normal text-muted-foreground">
              {project.description}
            </p>

            {/* Technologies */}
            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
              {project.technologies.map((skill, skillIndex) => (
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

export function ProjectsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
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
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-4 top-0 bottom-0 w-1 bg-primary origin-top"
          />
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
            Projects
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="flex flex-col gap-12 group/list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-12"
        >
          <Link
            href="https://github.com/deagleSC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
