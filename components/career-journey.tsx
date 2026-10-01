"use client"

import { useRef, useState, useEffect } from "react"
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
  smoothProgress,
}: {
  item: (typeof careerData)[0]
  index: number
  totalItems: number
  smoothProgress: MotionValue<number>
}) {
  const triggerPoint = index / (totalItems - 1)
  const activeStart = Math.max(0, triggerPoint - 0.08)
  const activePeak = triggerPoint
  const activeEnd = Math.min(1, triggerPoint + 0.12)

  // Gabungan filter CSS valid (grayscale + drop-shadow) untuk performa halus di iOS
  const imageFilter = useTransform(
    smoothProgress,
    [activeStart, activePeak, activeEnd],
    [
      "grayscale(100%) drop-shadow(0 0 0px rgba(163,230,53,0))",
      "grayscale(0%) drop-shadow(0 0 16px rgba(163,230,53,0.7))",
      "grayscale(0%) drop-shadow(0 0 6px rgba(163,230,53,0.25))",
    ]
  )

  const imageOpacity = useTransform(
    smoothProgress,
    [activeStart, activePeak, activeEnd],
    [0.45, 1, 0.95]
  )

  const imageScale = useTransform(
    smoothProgress,
    [activeStart, activePeak, activeEnd],
    [0.96, 1.04, 1.0]
  )

  return (
    <div
      className={`group relative z-10 flex flex-col ${item.align} w-[78vw] sm:w-[420px] md:w-[500px] shrink-0 ${item.offset}`}
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

      {/* Gambar dengan Responsif Height & tanpa bentrok CSS transition yang menyebabkan stutter di iPhone */}
      <div className={`relative flex items-center gap-3 ${item.align === "text-right" ? "justify-end" : ""}`}>
        <motion.img
          src={item.image || "/placeholder.svg"}
          alt={item.company}
          style={{
            filter: imageFilter,
            opacity: imageOpacity,
            scale: imageScale,
          }}
          className="h-36 sm:h-52 md:h-64 w-auto object-contain will-change-transform"
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
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxScrollX, setMaxScrollX] = useState<number | null>(null)

  useEffect(() => {
    const calculateScroll = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        setMaxScrollX(Math.max(0, trackWidth - viewportWidth))
      }
    }

    calculateScroll()
    window.addEventListener("resize", calculateScroll)
    return () => window.removeEventListener("resize", calculateScroll)
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  // Pastikan progress clamped antara 0 dan 1 (aman dari momentum overscroll iOS Safari)
  const smoothProgress = useTransform(scrollYProgress, [0, 1], [0, 1], { clamp: true })

  // Mencegah munculnya round dot ganjil di awal scroll di iOS Safari
  const pathOpacity = useTransform(smoothProgress, [0, 0.008, 1], [0, 1, 1])

  // Mengatur pergeseran track horizontal dinamis agar kartu terakhir tampil penuh di layar apa pun (termasuk iPhone 13)
  const x = useTransform(
    smoothProgress,
    (p) => (maxScrollX !== null ? -p * maxScrollX : `-${p * 78}%`)
  )

  // Kurva snake 3D yang mengalir mulus, seimbang di tengah kartu dan tidak menabrak teks di HP maupun desktop
  const snakePath =
    "M 0,240 C 70,180 140,300 210,240 S 350,180 420,240 S 560,300 630,240 S 770,180 840,240 S 980,300 1050,240 S 1190,200 1250,240"

  return (
    <section ref={targetRef} id="journey" className="relative h-[320vh] sm:h-[350vh] text-[#e2e8f0]">
      <div className="sticky top-0 flex h-screen h-[100dvh] min-h-[100dvh] items-center overflow-hidden transform-gpu">
        
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
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative flex items-start gap-8 sm:gap-16 md:gap-24 pl-4 sm:pl-8 md:pl-12 pr-16 sm:pr-28 pt-28 sm:pt-36 md:pt-48 will-change-transform transform-gpu"
        >
          
          {/* --- GARIS 3D TUBE (Vector murni bergradasi, zero-lag, 100% kompatibel iOS Safari) --- */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible transform-gpu"
            style={{ willChange: "transform" }}
            viewBox="0 0 1250 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              {/* Gradasi silindris 3D realistis (atas terang, bawah bayangan) */}
              <linearGradient id="tubeGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ecfccb" />
                <stop offset="25%" stopColor="#bef264" />
                <stop offset="60%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#1a2e05" />
              </linearGradient>
            </defs>

            {/* 1. Track Panduan Putus-Putus Halus */}
            <path
              d={snakePath}
              stroke="#a3e635"
              strokeWidth="2"
              strokeOpacity="0.15"
              strokeDasharray="6 6"
            />

            {/* 2. Bayangan Jatuh 3D (Cast Drop Shadow ke bawah, tanpa filter bug) */}
            <motion.path
              d={snakePath}
              stroke="#000000"
              strokeWidth="22"
              strokeLinecap="round"
              strokeOpacity="0.45"
              transform="translate(0, 7)"
              style={{ pathLength: smoothProgress, opacity: pathOpacity }}
            />

            {/* 3. Outer Neon Ambient Glow (Pendaran hijau neon) */}
            <motion.path
              d={snakePath}
              stroke="#a3e635"
              strokeWidth="18"
              strokeLinecap="round"
              strokeOpacity="0.22"
              style={{ pathLength: smoothProgress, opacity: pathOpacity }}
            />

            {/* 4. Tabung Utama Gradasi Silinder 3D */}
            <motion.path
              d={snakePath}
              stroke="url(#tubeGradient3D)"
              strokeWidth="14"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress, opacity: pathOpacity }}
            />

            {/* 5. Inner Core Shadow (Kedalaman volume dalam tabung) */}
            <motion.path
              d={snakePath}
              stroke="#142304"
              strokeWidth="10"
              strokeLinecap="round"
              strokeOpacity="0.35"
              transform="translate(0, 1.5)"
              style={{ pathLength: smoothProgress, opacity: pathOpacity }}
            />

            {/* 6. Kilauan Cahaya Permukaan (Top Specular Highlight) */}
            <motion.path
              d={snakePath}
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.9"
              transform="translate(0, -2.5)"
              style={{ pathLength: smoothProgress, opacity: pathOpacity }}
            />
          </svg>

          {careerData.map((item, index) => (
            <CareerCard
              key={item.id}
              item={item}
              index={index}
              totalItems={careerData.length}
              smoothProgress={smoothProgress}
            />
          ))}

          {/* Kartu Penutup "What is Next?" */}
          <div className="relative z-10 flex flex-col justify-center w-[200px] sm:w-[260px] shrink-0 mt-4 sm:mt-8">
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