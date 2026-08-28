"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

const careerData = [
  {
    id: "01",
    company: "Dinas Kominfo Kab. Bekasi",
    role: "Software Engineer - Technical Consultant",
    period: "BEKASI, JUNI 2025 - PRESENT",
    quote: "Developed & upgraded Bekasi's One Map (Satu Peta) platform with GeoJSON datasets, built EPSS app, and led One Data across 37 OPDs.",
    image: "/images/clients/diskominfo.png",
    tags: ["Satu Peta (One Map)", "Web Developer", "Data Engineer", "Implementation Systems", "Project Management", "Leadership"],
    size: "xl",
    offset: "lg:mt-0",
    align: "text-left",
  },
  {
    id: "02",
    company: "PT. Gaido Cito Ekakurindo",
    role: "IT Lead",
    period: "DEPOK, MAR 2023 - MEI 2025",
    quote: "Led multi-branch ERP rollouts with 100% on-time delivery, developed Ionic courier app, and boosted site PageSpeed to 98.",
    image: "/images/clients/gaido.jpeg",
    tags: ["ERP Developer", "Mobile", "UAT", "Leadership", "Implementation Systems", "Project Management", "Infrastructure IT"],
    size: "sm",
    offset: "lg:mt-24",
    align: "text-left",
  },
  {
    id: "03",
    company: "PT. Mitra Utama Trading",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2026",
    quote: "Engineered a complete logistics PWA in 2 weeks featuring order booking, job routing, cost pooling, and access control.",
    image: "/images/clients/mutrans.jpeg",
    tags: ["Mobile Developer", "Logistics System", "Implementation Systems", "Project Management"],
    size: "xl",
    offset: "lg:-mt-4",
    align: "text-left",
  },
  {
    id: "04",
    company: "PT. Key Lock Indonesia",
    role: "Web Developer & Digital Marketing Strategist",
    period: "PROJECT, 2026",
    quote: "Built SEO-optimized web profile and executed Google Ads & GBP campaigns, generating Rp150+ million sales in month one.",
    image: "/images/clients/keylock.jpeg",
    tags: ["Web Developer", "Google Ads", "Digital Marketing"],
    size: "sm",
    offset: "lg:mt-32",
    align: "text-right",
  },
  {
    id: "05",
    company: "Dinas Ketahanan Pangan",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2025",
    quote: "Launched SPBE-compliant government web profile in 3 weeks using Vue.js and Strapi CMS for decoupled content updates.",
    image: "/images/clients/DKP.png",
    tags: ["Vue.js", "Strapi CMS", "SPBE Initiative"],
    size: "sm",
    offset: "lg:mt-4",
    align: "text-left",
  },
  {
    id: "06",
    company: "PT. Hutama Karya Anugerah Persada",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2024",
    quote: "Built web HRIS from scratch covering attendance, payroll, employee loan tracking, and company operational finances.",
    image: "/images/clients/hkap.jpeg",
    tags: ["HRIS", "Payroll System", "Web Developer"],
    size: "sm",
    offset: "lg:mt-16",
    align: "text-left",
  },
  {
    id: "07",
    company: "PT. Telkom Indonesia",
    role: "GIS & Web Developer (Internship)",
    period: "KARAWANG, 2021",
    quote: "Mapped 7,000+ West Java regions using Google Earth and built native PHP/Bootstrap web asset & inventory tracking system.",
    image: "/images/clients/telkom.jpeg",
    tags: ["GIS Mapping", "PHP Native", "Bootstrap"],
    size: "xl",
    offset: "lg:mt-28",
    align: "text-right",
  },
  {
    id: "08",
    company: "BUMDES Kalijati",
    role: "Freelance VB.NET Developer",
    period: "SUBANG, 2020",
    quote: "Developed integrated desktop system for financial accounting, POS, and inventory management using VB.NET and SQL Server.",
    image: "/images/clients/bumdes.jpeg",
    tags: ["VB.NET", "SQL Server", "POS & Inventory"],
    size: "sm",
    offset: "lg:mt-8",
    align: "text-left",
  },
]

const sizeMap: Record<string, string> = {
  xl: "text-2xl sm:text-4xl md:text-5xl",
  sm: "text-xl sm:text-3xl md:text-4xl",
}

function CareerCard({
  item,
  index,
  totalItems,
  scrollYProgress,
}: {
  item: (typeof careerData)[0]
  index: number
  totalItems: number
  scrollYProgress: MotionValue<number>
}) {
  const triggerPoint = index / (totalItems - 1)
  const activeStart = Math.max(0, triggerPoint - 0.08)
  const activePeak = triggerPoint
  const activeEnd = Math.min(1, triggerPoint + 0.12)

  const filterGrayscale = useTransform(
    scrollYProgress,
    [activeStart, activePeak, activeEnd],
    ["grayscale(100%)", "grayscale(0%)", "grayscale(0%)"]
  )

  const imageOpacity = useTransform(
    scrollYProgress,
    [activeStart, activePeak, activeEnd],
    [0.4, 1, 1]
  )

  const imageScale = useTransform(
    scrollYProgress,
    [activeStart, activePeak, activeEnd],
    [0.96, 1.05, 1.01]
  )

  const glowFilter = useTransform(
    scrollYProgress,
    [activeStart, activePeak, activeEnd],
    [
      "drop-shadow(0 0 0px rgba(163,230,53,0))",
      "drop-shadow(0 0 18px rgba(163,230,53,0.75))",
      "drop-shadow(0 0 8px rgba(163,230,53,0.25))",
    ]
  )

  return (
    <div
      className={`group relative flex flex-col ${item.align} w-[78vw] sm:w-[420px] md:w-[500px] shrink-0 ${item.offset}`}
    >
      <span className="pointer-events-none select-none font-mono text-[14vw] sm:text-8xl md:text-9xl font-black text-white/[0.04] absolute -top-8 sm:-top-12 md:-top-16 left-0 leading-none -z-10">
        {item.id}
      </span>

      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] text-[#a3e635] uppercase">
        {item.period}
      </span>

      <h4
        className={`${sizeMap[item.size]} font-black uppercase tracking-tight leading-[0.95] text-white mt-1 mb-2 sm:mb-3`}
      >
        {item.company}
      </h4>

      {/* Gambar dengan Responsif Height */}
      <div className={`flex items-center gap-3 ${item.align === "text-right" ? "justify-end" : ""}`}>
        <motion.img
          src={item.image || "/placeholder.svg"}
          alt={item.company}
          style={{
            filter: filterGrayscale,
            opacity: imageOpacity,
            scale: imageScale,
            dropShadow: glowFilter,
          }}
          className="h-36 sm:h-52 md:h-64 w-auto object-contain transition-all duration-300 group-hover:!grayscale-0 group-hover:!opacity-100 group-hover:!scale-105"
        />
      </div>

      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-3 sm:mt-5">
        {item.role}
      </span>

      <p
        className={`italic font-serif text-white/70 leading-relaxed mt-3 sm:mt-5 ${
          item.size === "xl" ? "text-sm sm:text-lg md:text-xl max-w-[90%]" : "text-xs sm:text-sm md:text-base max-w-[95%]"
        } ${item.align === "text-right" ? "ml-auto" : ""}`}
      >
        {item.quote}
      </p>

      <div
        className={`mt-3 sm:mt-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/35 ${
          item.align === "text-right" ? "text-right" : ""
        }`}
      >
        {item.tags.map((tag, i) => (
          <span key={tag}>
            <span className="group-hover:text-[#a3e635] transition-colors">{tag}</span>
            {i < item.tags.length - 1 && <span className="mx-1.5 sm:mx-2 text-white/15">·</span>}
          </span>
        ))}
      </div>

      <div className={`mt-4 sm:mt-6 h-px w-12 sm:w-16 bg-[#a3e635]/30 ${item.align === "text-right" ? "ml-auto" : ""}`} />
    </div>
  )
}

export default function CareerJourney() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Mengatur pergeseran track horizontal yang halus di desktop & HP
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"])

  const snakePath =
    "M 0,220 C 80,80 160,360 260,150 S 420,400 540,130 S 680,380 780,160 S 900,410 1020,180 S 1150,360 1250,220"

  return (
    <section ref={targetRef} id="journey" className="relative h-[320vh] sm:h-[350vh] text-[#e2e8f0]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Header Kiri Atas - Responsive Spacing & Text */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-6 md:left-12 z-20">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white/90">
            Career{" "}
            <span className="italic font-serif font-normal text-[#a3e635]">Chronicles</span>
          </h2>
          <p className="mt-1 sm:mt-2 font-mono text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
            A journey of growth and impact
          </p>
        </div>

        {/* Header Kanan Atas */}
        <div className="absolute top-6 sm:top-10 right-4 sm:right-6 md:right-12 z-20 hidden sm:block text-right">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#a3e635]">TIMELINE</span>
          <p className="font-mono text-[9px] sm:text-[10px] text-white/40 tracking-widest mt-0.5">2020 - PRESENT</p>
        </div>

        {/* Track Horizontal */}
        <motion.div style={{ x }} className="relative flex items-start gap-8 sm:gap-16 md:gap-24 pl-4 sm:pl-8 md:pl-12 pr-16 sm:pr-28 pt-28 sm:pt-36 md:pt-48">
          
          {/* --- GARIS 3D TUBE (KETEBALAN LEBIH TIPIS & STYLISH) --- */}
          <svg
            className="absolute top-[-20px] sm:top-[-40px] left-0 w-[125%] h-[120%] pointer-events-none -z-10 overflow-visible"
            viewBox="0 0 1250 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="tubeGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ecfccb" />
                <stop offset="35%" stopColor="#a3e635" />
                <stop offset="70%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#3f6212" />
              </linearGradient>

              <filter id="tubeShadow3D" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="16" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1a2e05" floodOpacity="0.5" />
              </filter>

              <filter id="highlightBlur">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>

            {/* Track Putus-Putus Redup */}
            <path
              d={snakePath}
              stroke="#a3e635"
              strokeWidth="2"
              strokeOpacity="0.15"
              strokeDasharray="6 6"
            />

            {/* 1. Bayangan Dasar (Drop Shadow) - Tebal 34px (Sebelumnya 56px) */}
            <motion.path
              d={snakePath}
              stroke="#000000"
              strokeWidth="34"
              strokeLinecap="round"
              strokeOpacity="0.75"
              filter="url(#tubeShadow3D)"
              style={{ pathLength: scrollYProgress }}
            />

            {/* 2. Tabung Utama Gradasi (Main Volume Tube) - Tebal 28px (Sebelumnya 48px) */}
            <motion.path
              d={snakePath}
              stroke="url(#tubeGradient3D)"
              strokeWidth="28"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />

            {/* 3. Inner Shadow Tabung - Tebal 24px (Sebelumnya 44px) */}
            <motion.path
              d={snakePath}
              stroke="#1a2e05"
              strokeWidth="24"
              strokeLinecap="round"
              strokeOpacity="0.35"
              style={{ pathLength: scrollYProgress }}
            />

            {/* 4. Kilauan Cahaya (Specular Highlight) - Tebal 6px (Sebelumnya 12px) */}
            <motion.path
              d={snakePath}
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.85"
              filter="url(#highlightBlur)"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {careerData.map((item, index) => (
            <CareerCard
              key={item.id}
              item={item}
              index={index}
              totalItems={careerData.length}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* Kartu Penutup "What is Next?" */}
          <div className="flex flex-col justify-center w-[200px] sm:w-[260px] shrink-0 mt-4 sm:mt-8">
            <span className="font-mono text-[10px] sm:text-xs text-[#a3e635] uppercase tracking-[0.2em] mb-2 sm:mb-3">
              What is next?
            </span>
            <h4 className="text-xl sm:text-3xl md:text-4xl font-black uppercase text-white tracking-tight leading-[0.95] mb-4 sm:mb-6">
              Ready for the next race
            </h4>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors w-fit"
            >
              Get in touch
              <span className="inline-block translate-y-[1px]">-&gt;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}