"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import portfolioData from "@/data/data.json";
import type { ContactData } from "@/types/portfolio";

const contactData = portfolioData.contact as ContactData;

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Get LinkedIn URL from contact social links
  const linkedInLink = contactData.socialLinks.find(
    (link) => link.icon === "linkedin",
  );

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section Header */}
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">
            Contact
          </h2>

          {/* Intro Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-muted-foreground mb-10 max-w-xl"
          >
            {contactData.message}
          </motion.p>

          {/* Contact Options */}
          <div className="space-y-3">
            {/* Email */}
            <motion.a
              href={`mailto:${contactData.email}`}
              className="group flex items-center gap-4 p-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary dark:bg-teal-400/10 dark:text-teal-300 transition-transform group-hover:scale-105">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  Email
                  <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0.5 transition-all duration-200" />
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {contactData.email}
                </p>
              </div>
            </motion.a>

            {/* LinkedIn */}
            {linkedInLink && (
              <motion.a
                href={linkedInLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 -mx-4 rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary dark:bg-teal-400/10 dark:text-teal-300 transition-transform group-hover:scale-105">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    LinkedIn
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0.5 transition-all duration-200" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Let&apos;s connect
                  </p>
                </div>
              </motion.a>
            )}
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground text-center lg:text-left">
              Built with{" "}
              <a
                href="https://nextjs.org/"
                className="font-medium text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                Next.js
              </a>{" "}
              and{" "}
              <a
                href="https://tailwindcss.com/"
                className="font-medium text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                Tailwind CSS
              </a>
              , deployed with{" "}
              <a
                href="https://vercel.com/"
                className="font-medium text-muted-foreground hover:text-primary focus-visible:text-primary transition-colors"
                target="_blank"
                rel="noreferrer noopener"
              >
                Vercel
              </a>
              .
            </p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
}
