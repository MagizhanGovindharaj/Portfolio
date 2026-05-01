'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { GraduationCap, Calendar, ExternalLink, School } from 'lucide-react'

const tabs = [
  { id: 'university', label: 'University', icon: <GraduationCap size={14} /> },
  { id: 'schooling', label: 'Schooling', icon: <School size={14} /> },
]

const university = [
  {
    icon: <GraduationCap size={20} />,
    degree: 'B.E. Mechanical Engineering',
    major: 'Sri Krishna College of Engineering and Technology',
    period: '2018 — 2022',
    gpa: '8.11 / 10',
    color: '#3b82f6',
    highlights: [
      'Thermodynamics',
      'Fluid Mechanics',
      'CAD / CAM',
      'Manufacturing Processes',
      'Machine Design',
      'Heat Transfer',
    ],
    description:
      'Completed a four-year program in Mechanical Engineering with a focus on design, manufacturing, and thermal systems. Participated in SAE collegiate competitions and led the robotics club.',
  },
]

const schooling = [
  {
    icon: <School size={20} />,
    degree: 'Higher Secondary School (Class XII)',
    major: 'Sri Vijay Vidyalaya',
    period: '2017 — 2018',
    score: '81.08%',
    board: 'State Board',
    color: '#06b6d4',
    highlights: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Tamil'],
    description:
      'Completed higher secondary education with distinction in the Maths-Biology stream. Secured top ranks in Mathematics and Physics at the school level.',
  },
  {
    icon: <School size={20} />,
    degree: 'Secondary School (Class X)',
    major: 'ABC Senior Secondary School',
    period: '2015 — 2016',
    score: '89.8%',
    board: 'State Board',
    color: '#a78bfa',
    highlights: ['Science', 'Mathematics', 'Social Science', 'English', 'Tamil'],
    description:
      'Completed secondary education with high distinction. Ranked in the top 5% of the school batch with strong performance across all subjects.',
  },
]

function EducationCard({
  item,
  index,
  type,
}: {
  item: (typeof university)[0] | (typeof schooling)[0]
  index: number
  type: 'university' | 'schooling'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const schoolItem = item as (typeof schooling)[0]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', damping: 25, stiffness: 140, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${item.color}25, transparent)` }}
      />

      <div className="relative p-6 md:p-8 rounded-2xl bg-[#0d1020] border border-[#1e2442] transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start gap-6">

          {/* Icon */}
          <div className="flex-shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `${item.color}18`,
                color: item.color,
                border: `1px solid ${item.color}30`,
                boxShadow: `0 0 20px ${item.color}12`,
              }}
            >
              {item.icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Top row */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {type === 'university' && (
                    <>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          color: item.color,
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}25`,
                        }}
                      >
                        Bachelor&apos;s Degree
                      </span>
                      <span className="text-xs font-semibold text-[#4a5580] px-2.5 py-1 rounded-full bg-[#111428] border border-[#1e2442]">
                        CGPA: {(item as typeof university[0]).gpa}
                      </span>
                    </>
                  )}
                  {type === 'schooling' && (
                    <>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          color: item.color,
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}25`,
                        }}
                      >
                        {schoolItem.board}
                      </span>
                      <span className="text-xs font-semibold text-[#4a5580] px-2.5 py-1 rounded-full bg-[#111428] border border-[#1e2442]">
                        Score: {schoolItem.score}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-display font-bold text-xl text-white leading-tight">
                  {item.degree}
                </h3>
                <p className="text-sm font-medium mt-1" style={{ color: item.color }}>
                  {item.major}
                </p>
              </div>

              {/* Period */}
              <div className="flex items-center gap-1.5 text-xs text-[#4a5580] font-medium flex-shrink-0">
                <Calendar size={12} />
                {item.period}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#8892b0] leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Highlights */}
            <div>
              <p className="text-xs text-[#4a5580] font-semibold uppercase tracking-widest mb-2.5">
                Subjects
              </p>
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#111428] border border-[#1e2442] text-[#8892b0]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: item.color }}
                    />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState<'university' | 'schooling'>('university')

  const activeData = activeTab === 'university' ? university : schooling

  return (
    <section id="education" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-[#3b82f6]" />
            <span className="text-xs font-semibold text-[#3b82f6] tracking-widest uppercase">
              Academic Background
            </span>
            <div className="h-[1px] w-8 bg-[#3b82f6]" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            My <span className="text-gradient">Education</span>
          </h2>
          <p className="text-[#8892b0] text-base max-w-md mx-auto">
            The academic foundation that shaped my engineering mindset
          </p>
        </motion.div>

        {/* ── Tab switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, type: 'spring', damping: 25, stiffness: 150 }}
          className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0d1020] border border-[#1e2442] mb-8 w-fit mx-auto"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              suppressHydrationWarning
              onClick={() => setActiveTab(tab.id as 'university' | 'schooling')}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-[#4a5580] hover:text-[#8892b0]'
              }`}
            >
              {/* Active pill bg */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-[#3b82f6]"
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            className="flex flex-col gap-5"
          >
            {activeData.map((item, i) => (
              <EducationCard
                key={item.degree}
                item={item}
                index={i}
                type={activeTab}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, type: 'spring', damping: 25, stiffness: 150 }}
          className="mt-8 p-5 rounded-2xl bg-[#0d1020] border border-[#1e2442] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-[#4a5580]">
            Want to see my full academic record?
          </p>
          <a
            href="#contact"
            className="text-xs font-semibold text-[#3b82f6] hover:text-[#60a5fa] transition-colors flex items-center gap-1.5 flex-shrink-0"
          >
            Request Full Resume
            <ExternalLink size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}