"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import React from "react";

const roles = [
  "Software Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Open Source Dev",
];

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];

    if (paused) {
      const t = setTimeout(() => {
        setDeleting(true);
        setPaused(false);
      }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        60,
      );
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      setPaused(true);
      return;
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span className="text-gradient font-display font-bold">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-[#3b82f6] ml-1 align-middle animate-pulse rounded-sm" />
    </span>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1e244280 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diag"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="#3b82f6"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>
      {/* Left glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-10"
        style={{ background: "#3b82f6" }}
      />
      {/* Right glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-8"
        style={{ background: "#06b6d4" }}
      />
      {/* Centre top glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-8"
        style={{
          background:
            "radial-gradient(circle, #3b82f6 0%, #06b6d4 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{ position: "relative" }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden"
    >
      <GridBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto w-full"
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d1020] border border-[#1e2442]"
            style={{ boxShadow: "0 0 24px rgba(59,130,246,0.1)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-white">
              Available for new roles
            </span>
          </div>
        </motion.div>

        {/* Hi label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 150,
          }}
          className="text-[#4a5580] text-sm font-semibold tracking-widest uppercase -mb-4"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            type: "spring",
            damping: 22,
            stiffness: 130,
          }}
          className="font-display font-bold text-white leading-[1.0]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
        >
          Magizhan
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="h-10 flex items-center justify-center"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
        >
          <TypewriterRole />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.36,
            type: "spring",
            damping: 25,
            stiffness: 150,
          }}
          className="text-[#8892b0] text-base leading-relaxed max-w-xl"
        >
          Mechanical engineer turned software developer. I build scalable
          digital experiences with clean code, modern technologies, and a
          relentless focus on performance and user experience.
        </motion.p>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.44,
            type: "spring",
            damping: 25,
            stiffness: 150,
          }}
          className="flex flex-wrap justify-center gap-2"
        >
          {[
            "React",
            "Next.js",
            "Node.js",
            "TypeScript",
            "Flutter",
            "GoLang",
          ].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5 + i * 0.05,
                type: "spring",
                damping: 20,
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-[#0d1020] border border-[#1e2442] text-[#8892b0] font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.54,
            type: "spring",
            damping: 25,
            stiffness: 150,
          }}
          className="flex flex-wrap justify-center gap-3 pt-1"
        >
          <motion.a
            href="#experience"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 36px rgba(59,130,246,0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#3b82f6] text-white font-semibold text-sm hover:bg-[#2563eb] transition-colors duration-200"
          >
            View Experience
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#1e2442] text-[#8892b0] hover:text-white hover:border-[#3b82f6]/40 font-semibold text-sm transition-all duration-200"
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65,
            type: "spring",
            damping: 25,
            stiffness: 150,
          }}
          className="flex items-center gap-2 pt-4"
        >
          {[
            { value: "2+", label: "Years Exp.", color: "#3b82f6" },
            { value: "20+", label: "Projects", color: "#06b6d4" },
            { value: "10+", label: "Clients", color: "#a78bfa" },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              <div
                key={s.label}
                className="flex flex-col items-center gap-0.5 px-6"
              >
                <span
                  className="font-display font-bold text-2xl"
                  style={{ color: s.color }}
                >
                  {s.value}
                </span>
                <span className="text-xs text-[#4a5580] font-semibold uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="w-[1px] h-8 bg-[#1e2442]" />}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-[#2a3050] font-semibold uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-[#1e2442] flex items-center justify-center text-[#4a5580]"
        >
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  );
}
