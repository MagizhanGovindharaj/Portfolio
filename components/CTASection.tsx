'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Code2, Zap, Terminal } from 'lucide-react'

// ── Brand SVGs ────────────────────────────────────────────────
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socialLinks = [
  { icon: <GitHubIcon />, label: "GitHub", href: "https://github.com/MagizhanGovindharaj" },
  { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/in/magizhan-govindharaji-2k26/" },
  { icon: <XIcon />, label: "", href: "https://x.com/MagizhanGovind" },
];

const floatingBadges = [
  { icon: <Code2 size={12} />, text: 'Clean Code', color: '#3b82f6', position: '-left-6 top-6', delay: 0 },
  { icon: <Zap size={12} />, text: 'Fast Delivery', color: '#06b6d4', position: '-right-6 bottom-20', delay: 0.2 },
  { icon: <Sparkles size={12} />, text: 'Great UX', color: '#a78bfa', position: 'left-6 -bottom-5', delay: 0.4 },
]

// ── Terminal lines config ────────────────────────────────────
const terminalLines = [
  { type: 'cmd', text: 'whoami', delay: 300 },
  { type: 'out', text: 'Alex Nexus — Software Engineer', delay: 700, color: '#4ade80' },
  { type: 'cmd', text: 'cat skills.json | head -5', delay: 1200 },
  { type: 'out', text: '[ "React", "Next.js", "Node.js",', delay: 1600, color: '#8892b0' },
  { type: 'out', text: '  "TypeScript", "PostgreSQL" ]', delay: 1900, color: '#8892b0' },
  { type: 'cmd', text: 'git log --oneline -3', delay: 2400 },
  { type: 'out', text: 'a1b2c3d  feat: launch portfolio v3', delay: 2800, color: '#fbbf24' },
  { type: 'out', text: 'e4f5g6h  fix: optimise LCP score', delay: 3050, color: '#fbbf24' },
  { type: 'out', text: 'i7j8k9l  chore: clean up codebase', delay: 3300, color: '#fbbf24' },
  { type: 'cmd', text: 'echo $STATUS', delay: 3800 },
  { type: 'out', text: '✅  Available for new opportunities', delay: 4200, color: '#4ade80' },
]

// ── Animated terminal ────────────────────────────────────────
function TerminalWindow({ visible }: { visible: boolean }) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!visible) return
    let timeouts: ReturnType<typeof setTimeout>[] = []

    terminalLines.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1)
      }, terminalLines[i].delay)
      timeouts.push(t)
    })

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v)
    }, 530)

    return () => {
      timeouts.forEach(clearTimeout)
      clearInterval(cursorInterval)
    }
  }, [visible])

  return (
    <div className="rounded-2xl bg-[#0d1020] border border-[#1e2442] overflow-hidden w-full"
      style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.08)' }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111428] border-b border-[#1e2442]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 text-[#4a5580]">
          <Terminal size={12} />
          <span className="text-xs font-mono">nexus ~ portfolio</span>
        </div>
        <div className="w-16" />
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-xs leading-relaxed min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2 mb-1"
          >
            {line.type === 'cmd' ? (
              <>
                <span className="text-[#3b82f6] select-none flex-shrink-0">❯</span>
                <span className="text-white">{line.text}</span>
              </>
            ) : (
              <>
                <span className="w-3 flex-shrink-0" />
                <span style={{ color: line.color ?? '#8892b0' }}>{line.text}</span>
              </>
            )}
          </motion.div>
        ))}

        {/* Blinking cursor on last cmd line */}
        {visibleLines < terminalLines.length && (
          <div className="flex items-center gap-2">
            <span className="text-[#3b82f6]">❯</span>
            <span
              className="inline-block w-2 h-4 bg-[#3b82f6] rounded-sm"
              style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </div>
        )}

        {/* Final cursor after all lines */}
        {visibleLines >= terminalLines.length && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#3b82f6]">❯</span>
            <span
              className="inline-block w-2 h-4 bg-[#3b82f6] rounded-sm"
              style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
            />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#3b82f6] text-white">
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <span>NORMAL</span>
          <span className="opacity-60">|</span>
          <span>portfolio.tsx</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span>Available</span>
        </div>
      </div>
    </div>
  )
}

// ── Main Section ─────────────────────────────────────────────
export default function CTASection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section ref={sectionRef} style={{ position: 'relative' }} className="relative py-32 px-6 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 border-t border-[#1e2442]/40 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
      <motion.div
        style={{ y: y1, background: 'rgba(59,130,246,0.1)' }}
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2, background: 'rgba(6,182,212,0.08)' }}
        animate={{ opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 130 }}
            className="flex flex-col gap-6 items-center md:items-start"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, type: 'spring', damping: 25, stiffness: 200 }}
              className="flex items-center gap-2 justify-center md:justify-start"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">
                Open to Opportunities
              </span>
            </motion.div>

            {/* Staggered headline */}
            <div className="flex flex-col text-center md:text-left">
              {[
                { text: "Let's build", delay: 0.15 },
                { text: 'something', delay: 0.22 },
                { text: 'extraordinary', delay: 0.29, highlight: true },
                { text: 'together.', delay: 0.36 },
              ].map(({ text, delay, highlight }) => (
                <motion.h2
                  key={text}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay, type: 'spring', damping: 22, stiffness: 130 }}
                  className="font-display font-bold leading-[1.08]"
                  style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                >
                  {highlight ? (
                    <span className="relative inline-block">
                      <span
                        className="absolute inset-x-0 bottom-1 h-[30%] rounded-sm pointer-events-none"
                        style={{
                          background: 'linear-gradient(90deg, rgba(59,130,246,0.2), rgba(6,182,212,0.12))',
                        }}
                      />
                      <span className="text-gradient relative">{text}</span>
                    </span>
                  ) : (
                    <span className="text-gradient">{text}</span>
                  )}
                </motion.h2>
              ))}
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42, type: 'spring', damping: 25, stiffness: 150 }}
              className="text-[#8892b0] text-base leading-relaxed max-w-md text-center md:text-left"
            >
              Have a project in mind or just want to chat? I&apos;m always open to
              discussing new opportunities, creative ideas, or ways to collaborate.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, type: 'spring', damping: 25, stiffness: 150 }}
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(59,130,246,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#3b82f6] text-white font-semibold text-sm hover:bg-[#2563eb] transition-colors duration-200"
              >
                Start a Conversation
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 pt-1 justify-center md:justify-start"
            >
              <span className="text-xs text-[#4a5580] font-medium">Find me on</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.65 + i * 0.08, type: 'spring', damping: 20, stiffness: 200 }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-[#0d1020] border border-[#1e2442] flex items-center justify-center text-[#8892b0] hover:text-white hover:border-[#3b82f6]/40 transition-all duration-200"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Terminal window ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, type: 'spring', damping: 22, stiffness: 120 }}
            className="relative hidden md:block"
          >
            {/* Glow behind terminal */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
            />

            <div className="relative">
              <TerminalWindow visible={inView} />

              {/* Floating badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1, y: [0, -5, 0] }
                      : {}
                  }
                  transition={{
                    opacity: { delay: 1.2 + badge.delay, duration: 0.3 },
                    scale: { delay: 1.2 + badge.delay, type: 'spring', damping: 20 },
                    y: {
                      delay: 2 + badge.delay,
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className={`absolute ${badge.position} flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1020] text-xs font-semibold z-10`}
                  style={{
                    color: badge.color,
                    border: `1px solid ${badge.color}30`,
                    boxShadow: `0 4px 16px ${badge.color}20`,
                  }}
                >
                  <span style={{ color: badge.color }}>{badge.icon}</span>
                  {badge.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}