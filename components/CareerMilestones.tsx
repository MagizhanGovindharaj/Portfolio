"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";

// ── Auto-rotating color palette ───────────────────────────────
// Add as many colors as you want — cards cycle through them automatically
const PALETTE = [
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#14b8a6", // teal
  "#a78bfa", // purple
  "#f59e0b", // amber
  "#10b981", // emerald
  "#f43f5e", // rose
  "#8b5cf6", // violet
];

const milestones = [
  {
    id: 1,
    period: "2025 — 2026",
    role: "Brewszilla CMS (Software Engineer)",
    company: "Brewszilla Technologies Private Limited",
    description:
      "A robust CMS engineered to streamline content delivery across BrewsZilla's multi-platform ecosystem. Features real-time editing, role-based access control, and seamless API integration for instant updates.",
    tags: ["svelte.js", "GraphQL", "Hasura", "Golang", "PostgreSQL"],
    side: "right",
    image: "/cms.webp", // ← set to undefined/null to hide
    link: null,     // ← optional external link
  },
  {
    id: 2,
    period: "2024 — 2025",
    role: "Brewszilla Website",
    company: "Brewszilla Technologies Private Limited",
    description:
      "Developed the main marketing website for the BrewsZilla brand, optimized for lightning-fast load times and high conversion rates. Also worked on a dedicated meetup platform that connects like-minded singles, enabling meaningful interactions through curated events, ice-breaker activities, and a welcoming social environment.",
    tags: ["React", "Next.js", "TypeScript", "Golang", "PostgreSQL"],
    side: "left",
    image: "/meetup.webp", // ← set to undefined/null to hide
    link: "https://brewszilla.com/meetup",     // ← optional external link
  },
  {
    id: 3,
    period: "2023 — 2024",
    role: "CMIS (Cocoa management information system)",
    company: "Brewszilla Technologies Private Limited",
    description:
      "Internal management information system for tracking cocoa framer metrics and farmer group details. Implemented offline-first data sync.",
    tags: ["Flutter", "Dart", "PostgreSQL", "sqlite"],
    side: "right",
    image: "/cocoa.webp",
    link: null,
  },
  {
    id: 4,
    period: "2023 — 2024",
    role: "Brewszilla Mobile App",
    company: "Brewszilla Technologies Private Limited",
    description:
      "Built the core mobile experience using Flutter with a focus on performance, smooth animations, and reliable offline support. Also worked on backend services in Golang, integrating Razorpay for payments and Firebase for real-time push notifications.",
    tags: ["Flutter", "Dart", "Golang", "GraphQL", "Hasura", "Keycloak", "PostgreSQL"],
    side: "left",
    image: "/brewszilla.webp",
    link: "https://brewszilla.com/",
  },
  {
    id: 5,
    period: "2018 — 2022",
    role: "Mechanical Engineer",
    company: "Sri Krishna College of Engineering and Technology",
    description:
      "Completed a four-year program in Mechanical Engineering with a focus on design, manufacturing, and thermal systems. Participated in SAE collegiate competitions and led the robotics club",
    tags: [],
    side: "right",
    image: "/skcet.webp",
    link: "https://skcet.ac.in/",
  },
];

// ── Card ──────────────────────────────────────────────────────
function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Auto-assign color from palette, cycling if more cards than colors
  const color = PALETTE[index % PALETTE.length];

  return (
    <div
      ref={ref}
      className={`flex items-center gap-0 md:gap-8 ${
        milestone.side === "right" ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col`}
    >
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: milestone.side === "right" ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 150,
          delay: index * 0.15,
        }}
        className="md:w-5/12 w-full"
      >
        <div className="relative rounded-2xl bg-[#0d1020] border border-[#1e2442] overflow-hidden group card-hover">

          {/* ── Project image (only if provided) ── */}
          {milestone.image && (
            <div className="relative w-full h-44 overflow-hidden">
              <img
                src={milestone.image}
                alt={`${milestone.role} at ${milestone.company}`}
                width={480}
                height={176}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Hide broken image gracefully
                  (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                }}
              />
              {/* Gradient fade into card body */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 40%, #0d1020 100%)",
                }}
              />
              {/* Optional external link chip */}
              {milestone.link && (
                <a
                  href={milestone.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm transition-opacity duration-200 opacity-80 hover:opacity-100"
                  style={{
                    background: `${color}25`,
                    color,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <ExternalLink size={9} />
                  Visit
                </a>
              )}
            </div>
          )}

          {/* ── Content ── */}
          <div className="relative p-6">
            {/* Left accent line */}
            <div
              className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full"
              style={{
                background: `linear-gradient(to bottom, ${color}, transparent)`,
              }}
            />

            {/* Period badge */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                style={{
                  color,
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Calendar size={10} className="inline mr-1.5 mb-0.5" />
                {milestone.period}
              </span>

              {/* Link icon — shown when no image but link exists */}
              {!milestone.image && milestone.link && (
                <a
                  href={milestone.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project"
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{
                    color,
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            <h3
              className="font-display font-bold text-xl text-white mb-1 transition-colors duration-200"
              style={{ ["--hover-color" as string]: color }}
            >
              <span className="group-hover:text-[var(--hover-color)] transition-colors duration-200">
                {milestone.role}
              </span>
            </h3>
            <p className="text-sm font-medium mb-3" style={{ color }}>
              {milestone.company}
            </p>
            <p className="text-sm text-[#8892b0] leading-relaxed mb-4">
              {milestone.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {milestone.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#111428] border border-[#1e2442] text-[#8892b0] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Centre dot ── */}
      <div className="md:w-2/12 hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            delay: index * 0.15 + 0.1,
          }}
          className="w-4 h-4 rounded-full border-2 bg-[#08091a] relative z-10"
          style={{
            borderColor: color,
            boxShadow: `0 0 12px ${color}60`,
          }}
        >
          <div
            className="absolute inset-1 rounded-full"
            style={{ background: color }}
          />
        </motion.div>
      </div>

      {/* ── Spacer ── */}
      <div className="md:w-5/12 hidden md:block" />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
export default function CareerMilestones() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
  id="experience"
  ref={sectionRef}
  style={{ position: 'relative' }}
  className="relative py-28 px-6 overflow-hidden"
>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(59,130,246,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Career <span className="text-gradient">Milestones</span>
          </h2>
          <p className="text-[#8892b0] text-base">
            A journey of continuous learning and building impactful solutions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Track line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block bg-[#1e2442]" />
          {/* Animated fill */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] hidden md:block overflow-hidden">
            <motion.div
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #3b82f6, #06b6d4)",
                width: "1px",
              }}
              className="origin-top"
            />
          </div>

          <div className="flex flex-col gap-16">
            {milestones.map((milestone, i) => (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}