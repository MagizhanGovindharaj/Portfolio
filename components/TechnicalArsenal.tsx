'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Monitor, Server, Wrench, ChevronRight } from 'lucide-react'

const categories = [
  {
    id: 'frontend',
    icon: <Monitor size={16} />,
    title: 'Frontend',
    color: '#3b82f6',
    description: 'Building pixel-perfect, performant user interfaces',
    skills: [
      { name: 'React / Next.js', level: 95, icon: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'TypeScript', level: 90, icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
      { name: 'Tailwind CSS', level: 88, icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { name: 'Flutter', level: 82, icon: 'https://cdn.simpleicons.org/flutter/02569B' },
    ],
    techs: ['React', 'Next.js', 'Flutter', 'TypeScript', 'Tailwind', 'Framer Motion', 'Redux', 'GraphQL', 'Vite', 'Hasura'],
  },
  {
    id: 'backend',
    icon: <Server size={16} />,
    title: 'Backend',
    color: '#06b6d4',
    description: 'Architecting scalable server-side systems and APIs',
    skills: [
      { name: 'Node.js', level: 90, icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Golang', level: 75, icon: 'https://cdn.simpleicons.org/go/00ADD8' },
      { name: 'PostgreSQL', level: 85, icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'GraphQL', level: 80, icon: 'https://cdn.simpleicons.org/graphql/E10098' },
    ],
    techs: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Golang', 'REST APIs', 'GraphQL',],
  },
  {
    id: 'devops',
    icon: <Wrench size={16} />,
    title: 'Tools & DevOps',
    color: '#a78bfa',
    description: 'Streamlining development workflows and deployments',
    skills: [
      { name: 'Git / GitHub', level: 95, icon: 'https://cdn.simpleicons.org/github/ffffff' },
      { name: 'Docker', level: 80, icon: 'https://cdn.simpleicons.org/docker/2496ED' },
      { name: 'Figma', level: 70, icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    ],
    techs: ['Git', 'Docker', 'Firebase', 'Vercel', 'CI/CD', 'Figma', 'Postman'],
  },
]

// ── Skill bar ────────────────────────────────────────────────
function SkillBar({
  skill,
  color,
  delay,
}: {
  skill: { name: string; level: number; icon: string }
  color: string
  delay: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <img
            src={skill.icon}
            alt={skill.name}
            width={16}
            height={16}
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="text-sm text-[#8892b0] font-medium group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[#1e2442] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        >
          {/* Shimmer */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.5s linear infinite',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

// ── Category card ────────────────────────────────────────────
function CategoryCard({
  cat,
  catIdx,
  isActive,
  onClick,
}: {
  cat: (typeof categories)[0]
  catIdx: number
  isActive: boolean
  onClick: () => void
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', damping: 25, stiffness: 150, delay: catIdx * 0.08 }}
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'border-opacity-60 bg-[#111428]'
          : 'border-[#1e2442] bg-[#0d1020] hover:border-[#2a3050]'
      }`}
      style={
        isActive
          ? { borderColor: `${cat.color}50`, boxShadow: `0 0 20px ${cat.color}10` }
          : {}
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${cat.color}18`,
              color: cat.color,
              border: `1px solid ${cat.color}30`,
            }}
          >
            {cat.icon}
          </div>
          <div>
            <p className="font-display font-bold text-sm text-white">{cat.title}</p>
            <p className="text-xs text-[#4a5580] mt-0.5">{cat.skills.length} skills</p>
          </div>
        </div>
        <ChevronRight
          size={14}
          className="transition-transform duration-200"
          style={{
            color: isActive ? cat.color : '#4a5580',
            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
      </div>
    </motion.button>
  )
}

// ── Section ──────────────────────────────────────────────────
export default function TechnicalArsenal() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const [activeIdx, setActiveIdx] = useState(0)
  const activeCat = categories[activeIdx]

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 border-t border-b border-[#1e2442]/40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-[#3b82f6]" />
            <span className="text-xs font-semibold text-[#3b82f6] tracking-widest uppercase">
              What I Work With
            </span>
            <div className="h-[1px] w-8 bg-[#3b82f6]" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-[#8892b0] text-base max-w-md mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Left: category tabs */}
          <div className="flex flex-col gap-3">
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                catIdx={i}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}

            {/* Total skills count */}
            <div className="mt-2 p-4 rounded-xl bg-[#0d1020] border border-[#1e2442] text-center">
              <p className="font-display font-bold text-2xl text-white">
                {categories.reduce((a, c) => a + c.techs.length, 0)}+
              </p>
              <p className="text-xs text-[#4a5580] font-semibold uppercase tracking-wider mt-0.5">
                Technologies
              </p>
            </div>
          </div>

          {/* Right: active category detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0d1020] border border-[#1e2442]"
              style={{ boxShadow: `0 0 40px ${activeCat.color}08` }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${activeCat.color}18`,
                      color: activeCat.color,
                      border: `1px solid ${activeCat.color}30`,
                    }}
                  >
                    {activeCat.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {activeCat.title}
                    </h3>
                    <p className="text-sm text-[#8892b0] mt-0.5">
                      {activeCat.description}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full hidden sm:block"
                  style={{
                    color: activeCat.color,
                    background: `${activeCat.color}18`,
                    border: `1px solid ${activeCat.color}30`,
                  }}
                >
                  {activeCat.skills.length} core skills
                </span>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-5 mb-8">
                {activeCat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={activeCat.color}
                    delay={i * 0.08}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[#1e2442] mb-6" />

              {/* Tech pills */}
              <div>
                <p className="text-xs text-[#4a5580] font-semibold uppercase tracking-widest mb-3">
                  Also familiar with
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCat.techs.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, type: 'spring', damping: 25, stiffness: 200 }}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#111428] border border-[#1e2442] text-[#8892b0] hover:text-white hover:border-[#2a3050] transition-all duration-150 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}