// app/components/historical-results-accordion.tsx

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Briefcase, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CareerResult {
  round: string
  company: string
  logoImage: string
  date: string
  role: string
  techOrImpact: string
}

interface YearData {
  year: string
  projectsCount: string
  level: string
  results: CareerResult[]
}

const careerData: YearData[] = [
  {
    year: "2026",
    projectsCount: "02",
    level: "FULLSTACK & STRATEGIST",
    results: [
      {
        round: "01",
        company: "PT MITRA UTAMA TRADING",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2026",
        role: "Fullstack Developer (Project Base)",
        techOrImpact: "Logistics System / PWA",
      },
      {
        round: "02",
        company: "PT. KEY LOCK INDONESIA",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2026",
        role: "Web Developer & Digital Marketing Strategist",
        techOrImpact: "SEO & Google Ads / Rp150M+ Deals",
      },
    ],
  },
  {
    year: "2025",
    projectsCount: "02",
    level: "SOFTWARE ENGINEER",
    results: [
      {
        round: "01",
        company: "DINAS KOMUNIKASI INFORMATIKA",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "JUN 2025 - PRESENT",
        role: "Software Engineer - Technical Consultant",
        techOrImpact: "One Data / One Map / EPSS",
      },
      {
        round: "02",
        company: "DINAS KETAHANAN PANGAN",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2025",
        role: "Fullstack Developer (Project Base)",
        techOrImpact: "Company Profile & SPBE",
      },
    ],
  },
  {
    year: "2023 - 2025",
    projectsCount: "01",
    level: "IT LEAD",
    results: [
      {
        round: "01",
        company: "PT. GAIDO CITO EKAKURINDO",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "MAR 2023 - MEI 2025",
        role: "IT Lead",
        techOrImpact: "ERP Supply Chain & Mobile App",
      },
    ],
  },
  {
    year: "2024",
    projectsCount: "01",
    level: "FULLSTACK DEVELOPER",
    results: [
      {
        round: "01",
        company: "PT. HUTAMA KARYA ANUGERAH PERSADA",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2024",
        role: "Fullstack Developer (Project Base)",
        techOrImpact: "HRIS & Financial System",
      },
    ],
  },
  {
    year: "2021",
    projectsCount: "01",
    level: "GIS & WEB DEVELOPER",
    results: [
      {
        round: "01",
        company: "PT. TELKOM INDONESIA",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2021",
        role: "GIS & Web Developer (Internship)",
        techOrImpact: "Network Mapping & SDI Division",
      },
    ],
  },
  {
    year: "2020",
    projectsCount: "01",
    level: "FREELANCE DEVELOPER",
    results: [
      {
        round: "01",
        company: "BUMDES KALIJATI",
        logoImage: "/images/flags/flag-Indonesia.svg",
        date: "2020",
        role: "Freelance VB.NET Developer",
        techOrImpact: "Desktop Financial & Inventory System",
      },
    ],
  },
]

export function HistoricalResultsAccordion() {
  const [activeYear, setActiveYear] = useState<string | null>("2026")

  return (
    <div className="w-full bg-[#F5F1E8] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="font-[family-name:var(--font-oswald)] text-4xl md:text-6xl font-bold uppercase leading-none text-black tracking-tighter">
              CAREER JOURNEY
            </h2>
            <h1 className="font-brier text-5xl text-zinc-400 leading-none md:-mt-2 md:text-7xl mt-2.5">
              Work & Experience
            </h1>
          </div>
          <p className="text-zinc-500 text-sm md:text-base max-w-xs md:text-right font-medium">
            Explore Alfino Firmansyah&#39;s professional milestones, roles, and project portfolios below.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {careerData.map((data) => (
            <div key={data.year} className="border-b border-black/10 last:border-none">
              <button
                onClick={() => setActiveYear(activeYear === data.year ? null : data.year)}
                className={cn(
                  "w-full flex items-center justify-between p-4 md:p-6 transition-all duration-300 ease-out group",
                  activeYear === data.year
                    ? "bg-fino-accent text-black"
                    : "bg-transparent text-black hover:bg-black/5",
                )}
              >
                <div className="flex items-center gap-6">
                  <ChevronDown
                    className={cn(
                      "w-6 h-6 md:w-8 md:h-8 transition-transform duration-300",
                      activeYear === data.year ? "rotate-180 text-black" : "text-black -rotate-90",
                    )}
                  />
                  <span className="font-[family-name:var(--font-oswald)] font-bold text-5xl md:text-7xl tracking-tighter leading-none">
                    {data.year}
                  </span>
                </div>

                <div className="flex items-center gap-8 md:gap-16 pr-4">
                  <div className="flex flex-col items-end">
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Level / Role</div>
                    <span className="font-[family-name:var(--font-oswald)] font-bold text-xl md:text-3xl italic leading-none">
                      {data.level}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs font-bold uppercase opacity-60 mb-1">Projects</div>
                    <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl md:text-4xl leading-none">
                      {data.projectsCount}
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {activeYear === data.year && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-zinc-900/30"
                  >
                    <div className="grid grid-cols-12 gap-4 py-4 px-6 text-[10px] md:text-xs font-bold text-black/30 uppercase tracking-widest border-b border-black/10">
                      <div className="col-span-1">No</div>
                      <div className="col-span-4">Company / Institution</div>
                      <div className="col-span-3 text-center">Period</div>
                      <div className="col-span-2 text-center">Position</div>
                      <div className="col-span-2 text-right">Key Scope</div>
                    </div>

                    <div className="p-0">
                      {data.results.map((result, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-4 py-4 px-6 border-b border-black/5 text-black hover:bg-black/5 transition-colors items-center group"
                        >
                          <div className="col-span-1 relative">
                            <span className="font-[family-name:var(--font-oswald)] font-bold text-2xl text-black/40 relative z-10">
                              {result.round}
                            </span>
                          </div>

                          <div className="col-span-4 flex items-center gap-3">
                            <Briefcase className="w-6 h-6 text-fino-accent shrink-0" />
                            <span className="font-[family-name:var(--font-oswald)] font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none">
                              {result.company}
                            </span>
                          </div>

                          <div className="col-span-3 text-center font-[family-name:var(--font-oswald)] font-bold text-lg md:text-xl text-black/70 uppercase">
                            {result.date}
                          </div>

                          <div className="col-span-2 text-center font-[family-name:var(--font-oswald)] font-bold text-lg md:text-2xl italic flex items-center justify-center gap-2">
                            <Award className="w-5 h-5 text-fino-accent shrink-0" />
                            <span className="text-fino-accent">
                              {result.role}
                            </span>
                          </div>

                          <div className="col-span-2 text-right font-[family-name:var(--font-oswald)] font-bold text-sm md:text-base text-black/80">
                            {result.techOrImpact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}