'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitBranch, Keyboard, Terminal, MapPin, Coffee, Sparkles, Mail } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { value: '2+', label: 'Years Exp.', color: '#3b82f6' },
  { value: '15+', label: 'Projects', color: '#06b6d4' },
  { value: '2+', label: 'Happy Clients', color: '#a78bfa' },
]

const tags = [
  { icon: <GitBranch size={12} />, text: 'Open Source' },
  { icon: <Coffee size={12} />, text: 'Coffee Driven' },
  { icon: <MapPin size={12} />, text: 'Remote Friendly' },
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 gap-16 items-center"
        >

          {/* ── LEFT: Image column ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 130 }}
            className="relative flex justify-center"
          >
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                transform: 'scale(0.85)',
              }}
            />

            {/* Decorative grid dots top-left */}
            <div className="absolute -top-6 -left-6 w-24 h-24 hidden md:block"
              style={{
                backgroundImage: 'radial-gradient(circle, #3b82f620 1.5px, transparent 1.5px)',
                backgroundSize: '10px 10px',
              }}
            />
            {/* Decorative grid dots bottom-right */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 hidden md:block"
              style={{
                backgroundImage: 'radial-gradient(circle, #06b6d420 1.5px, transparent 1.5px)',
                backgroundSize: '10px 10px',
              }}
            />

            {/* Main image frame */}
            <div className="relative w-full max-w-sm">
              {/* Outer glow border */}
              <div className="absolute -inset-[1px] rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(6,182,212,0.3), rgba(167,139,250,0.2))',
                  padding: '1px',
                  borderRadius: '1.5rem',
                }}
              />

              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[#0d1020] border border-[#1e2442]">
                <Image
                  src="/magi.png"
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,9,26,0.85) 0%, rgba(8,9,26,0.2) 40%, transparent 70%)',
                  }}
                />

                {/* Name tag at bottom of image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-display font-bold text-white text-xl leading-tight">
                    Magizhan Govindharaji
                  </p>
                  <p className="text-sm font-medium text-gradient">
                    Software Engineer
                  </p>
                </div>
              </div>

              {/* ── Floating: Available badge (top-right) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.4 }}
                className="absolute -top-4 -right-4 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0d1020] border border-[#1e2442] shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(59,130,246,0.15)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-white">Available</span>
              </motion.div>

              {/* ── Floating: XP card (bottom-left) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.5 }}
                animate-y={{ y: [0, -6, 0] }}
                className="absolute -bottom-9 -left-5 px-4 py-3 rounded-2xl bg-[#0d1020] border border-[#1e2442] shadow-xl"
                style={{ boxShadow: '0 8px 32px rgba(59,130,246,0.12)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/15 flex items-center justify-center">
                    <Sparkles size={14} className="text-[#3b82f6]" />
                  </div>
                  <div>
                    <p className="text-white font-display font-bold text-sm leading-none mb-0.5">
                      2+ Years
                    </p>
                    <p className="text-[#4a5580] text-xs">Experience</p>
                  </div>
                </div>
              </motion.div>

              {/* ── Floating: Projects card (right side) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 0.6 }}
                className="absolute top-1/3 -right-6 px-4 py-3 rounded-2xl bg-[#0d1020] border border-[#1e2442] shadow-xl hidden md:block"
                style={{ boxShadow: '0 8px 32px rgba(6,182,212,0.12)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#06b6d4]/15 flex items-center justify-center">
                    <Terminal size={14} className="text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-white font-display font-bold text-sm leading-none mb-0.5">
                      15+ Projects
                    </p>
                    <p className="text-[#4a5580] text-xs">Delivered</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: Text column ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 130, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-[#3b82f6]" />
              <span className="text-xs font-semibold text-[#3b82f6] tracking-widest uppercase">
                About Me
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-bold text-white leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Beyond the{' '}
              <span className="text-gradient">Terminal</span>
            </h2>

            {/* Body */}
            <div className="flex flex-col gap-4">
              <p className="text-[#8892b0] text-base leading-relaxed">
                I&apos;m a software engineer passionate about bridging the gap between
                complex backend logic and seamless user interfaces. With over 2 years
                of experience, I specialize in building robust web applications
                that scale gracefully.
              </p>
              <p className="text-[#8892b0] text-base leading-relaxed">
                When I&apos;m not debugging or optimizing performance, you can find me
                contributing to open-source projects, exploring new web technologies,
                or fine-tuning my mechanical keyboard layout.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 py-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                    delay: 0.3 + i * 0.08,
                  }}
                  className="flex flex-col items-center justify-center py-4 rounded-2xl bg-[#0d1020] border border-[#1e2442]"
                  style={{ boxShadow: `0 0 20px ${stat.color}0a` }}
                >
                  <span
                    className="font-display font-bold text-2xl leading-none mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-[#4a5580] font-semibold uppercase tracking-wider text-center">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#1e2442]" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                    delay: 0.5 + i * 0.06,
                  }}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-full bg-[#0d1020] border border-[#1e2442] text-[#8892b0] hover:border-[#3b82f6]/40 hover:text-white transition-all duration-200"
                >
                  <span className="text-[#3b82f6]">{tag.icon}</span>
                  {tag.text}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, type: 'spring', damping: 25, stiffness: 200 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl bg-[#3b82f6] text-white font-semibold text-sm hover:bg-[#2563eb] transition-colors duration-200"
            >
              <Mail size={15} />
              Let&apos;s Work Together
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}