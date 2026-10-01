"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion"

interface CareerItem {
  id: string
  company: string
  role: string
  period: string
  location: string
  type: string
  quote: string
  description: string
  achievements: string[]
  image: string
  tags: string[]
  size: "xl" | "sm"
  offset: string
  align: "text-left" | "text-right"
}

const careerData: CareerItem[] = [
  {
    id: "01",
    company: "Dinas Kominfo Kab. Bekasi",
    role: "Software Engineer - Technical Consultant",
    period: "BEKASI, JUNI 2025 - PRESENT",
    location: "Cikarang Pusat, Kab. Bekasi",
    type: "Government Technical Consultant",
    quote: "Developed & upgraded Bekasi's One Map (Satu Peta) platform with GeoJSON datasets, built EPSS app, and led One Data across 37 OPDs.",
    description: "Serving as a key technical consultant for the Department of Communication and Informatics (Diskominfo) Kabupaten Bekasi, responsible for modernizing government data infrastructure, integrating cross-departmental platforms, and implementing SPBE (Sistem Pemerintahan Berbasis Elektronik) standards.",
    achievements: [
      "Upgraded and maintained the Satu Peta (Bekasi One Map) GIS portal, centralizing spatial datasets across 37 regional apparatuses (OPD).",
      "Developed the Evaluasi Penyelenggaraan Statistik Sektoral (EPSS) application to streamline digital compliance auditing and reporting.",
      "Engineered robust GeoJSON pipelines, spatial indexing, and automated data synchronization between provincial and municipal databases.",
      "Provided technical leadership and consultative guidance for digital government initiatives and public service portal integrations."
    ],
    image: "/images/clients/diskominfo.png",
    tags: ["Satu Peta (One Map)", "GIS & GeoJSON", "EPSS System", "Data Engineering", "Technical Consultant", "Leadership"],
    size: "xl",
    offset: "lg:mt-0",
    align: "text-left",
  },
  {
    id: "02",
    company: "PT. Gaido Cito Ekakurindo",
    role: "IT Lead",
    period: "DEPOK, MAR 2023 - MEI 2025",
    location: "Depok, Jawa Barat",
    type: "Full-time (Head of IT)",
    quote: "Led multi-branch ERP rollouts with 100% on-time delivery, developed Ionic courier app, and boosted site PageSpeed to 98.",
    description: "Led the IT department overseeing multi-branch enterprise resource planning (ERP), supply chain management (SCM), digital operations, logistics mobile applications, and network infrastructure across all company branches nationwide.",
    achievements: [
      "Spearheaded enterprise-wide ERP SCM rollout across all regional distribution branches with a 100% on-time milestone delivery track record.",
      "Architected and launched the Gaido Mobile courier & live shipment tracking application using Ionic and Angular.",
      "Boosted corporate website performance and Google PageSpeed score to 98 through asset caching, image pipelines, and code-splitting.",
      "Managed IT infrastructure, automated database backups, cybersecurity hardening, and directed cross-functional team UAT."
    ],
    image: "/images/clients/gaido.jpeg",
    tags: ["IT Leadership", "ERP SCM", "Ionic / Angular", "Infrastructure", "UAT", "PageSpeed 98"],
    size: "sm",
    offset: "lg:mt-24",
    align: "text-left",
  },
  {
    id: "03",
    company: "PT. Mitra Utama Trading",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2026",
    location: "Jakarta (Project-based)",
    type: "Contract / Project-based",
    quote: "Engineered a complete logistics PWA in 2 weeks featuring order booking, job routing, cost pooling, and access control.",
    description: "Architected and delivered an end-to-end logistics progressive web application (PWA) under a tight 2-week turnaround, resolving complex operational bottlenecks in freight booking, dispatch, and cost pooling.",
    achievements: [
      "Delivered a fully operational logistics PWA in just 14 days, from initial requirements gathering to production deployment.",
      "Automated vehicle dispatch assignment, multi-leg job routing, and real-time shipment milestone updates for drivers and dispatchers.",
      "Designed dynamic cost pooling and ledger calculations to replace error-prone manual spreadsheets.",
      "Implemented granular role-based access control (RBAC) ensuring secure operations across dispatchers, drivers, and management."
    ],
    image: "/images/clients/mutrans.jpeg",
    tags: ["Logistics PWA", "Laravel & Vue", "Fast-track Delivery", "Cost Pooling", "RBAC"],
    size: "xl",
    offset: "lg:-mt-4",
    align: "text-left",
  },
  {
    id: "04",
    company: "PT. Key Lock Indonesia",
    role: "Web Developer & Digital Marketing Strategist",
    period: "PROJECT, 2026",
    location: "Bogor / Jakarta",
    type: "Project-based (Full Technical & Marketing)",
    quote: "Built SEO-optimized web profile and executed Google Ads & GBP campaigns, generating Rp150+ million sales in month one.",
    description: "Engineered a high-converting corporate web profile integrated with dynamic CMS and executed comprehensive search marketing campaigns that drove record revenue growth in the first month.",
    achievements: [
      "Architected an SEO-first corporate website with Next.js and Laravel, achieving high search rankings for targeted commercial keywords.",
      "Orchestrated targeted Google Ads campaigns and Google Business Profile optimization, generating Rp150+ million in verified sales in Month 1.",
      "Built an intuitive administration CMS allowing non-technical marketing teams to publish project case studies and manage customer inquiries.",
      "Implemented end-to-end conversion tracking, user heatmaps, and funnel analytics to maximize ad spend ROI."
    ],
    image: "/images/clients/keylock.jpeg",
    tags: ["Next.js", "Laravel CMS", "Google Ads ROI", "SEO Architecture", "Rp150M+ Month 1"],
    size: "sm",
    offset: "lg:mt-32",
    align: "text-right",
  },
  {
    id: "05",
    company: "Dinas Ketahanan Pangan",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2025",
    location: "Jawa Barat (Government Project)",
    type: "Government Digital Initiative",
    quote: "Launched SPBE-compliant government web profile in 3 weeks using Vue.js and Strapi CMS for decoupled content updates.",
    description: "Designed and developed an SPBE-compliant public information portal with headless CMS architecture for the Department of Food Security (Dinas Ketahanan Pangan) within an intensive 3-week delivery schedule.",
    achievements: [
      "Successfully completed and deployed the official public portal adhering strictly to Indonesian SPBE e-government standards in 3 weeks.",
      "Decoupled architecture using Strapi CMS for backend data governance and Vue.js for an ultra-fast, accessible public frontend.",
      "Configured automated data schemas for food commodity price indexes, regional harvest reserves, and public service notices.",
      "Delivered comprehensive documentation and conducted training sessions for agency staff to maintain digital assets independently."
    ],
    image: "/images/clients/DKP.png",
    tags: ["Vue.js", "Strapi CMS", "SPBE Compliance", "Public Portal", "Fast Delivery"],
    size: "sm",
    offset: "lg:mt-4",
    align: "text-left",
  },
  {
    id: "06",
    company: "PT. Hutama Karya Anugerah Persada",
    role: "Fullstack Developer (Project Base)",
    period: "PROJECT, 2024",
    location: "Bekasi / Jakarta",
    type: "Enterprise Solution",
    quote: "Built web HRIS from scratch covering attendance, payroll, employee loan tracking, and company operational finances.",
    description: "Built a comprehensive Human Resource Information System (HRIS) and financial ledger management platform from scratch to replace decentralized manual paperwork and streamline employee governance.",
    achievements: [
      "Engineered an all-in-one HRIS platform covering geo-tagged employee attendance, overtime approvals, leave requests, and automated payroll.",
      "Built employee loan and deduction ledger tracking with automated payslip generation and tax calculations.",
      "Integrated company operational expense tracking and budget reconciliation dashboards for executive stakeholders.",
      "Reduced payroll calculation time by over 70% while eliminating payroll calculation discrepancies."
    ],
    image: "/images/clients/hkap.jpeg",
    tags: ["HRIS", "Payroll Automation", "Financial Ledger", "Laravel / MySQL", "Enterprise"],
    size: "sm",
    offset: "lg:mt-16",
    align: "text-left",
  },
  {
    id: "07",
    company: "PT. Telkom Indonesia",
    role: "GIS & Web Developer (Internship)",
    period: "KARAWANG, 2021",
    location: "Karawang, Jawa Barat",
    type: "Technical Internship",
    quote: "Mapped 7,000+ West Java regions using Google Earth and built native PHP/Bootstrap web asset & inventory tracking system.",
    description: "Participated in network infrastructure planning and digital inventory tracking within Telkom Indonesia Regional West Java, combining geospatial mapping with web application development.",
    achievements: [
      "Digitized and mapped optical distribution points (ODP) and fiber network routes across 7,000+ regions throughout West Java.",
      "Engineered a native PHP and Bootstrap web application to track network hardware assets, spare parts, and field inspection tickets.",
      "Collaborated with senior field engineers to audit geographical coordinate accuracy and optical line status.",
      "Awarded high performance commendation for digitizing legacy documentation into structured relational database schemas."
    ],
    image: "/images/clients/telkom.jpeg",
    tags: ["GIS Mapping", "Google Earth", "PHP & Bootstrap", "Telco Infrastructure", "7,000+ Regions"],
    size: "xl",
    offset: "lg:mt-28",
    align: "text-right",
  },
  {
    id: "08",
    company: "BUMDES Kalijati",
    role: "Freelance VB.NET Developer",
    period: "SUBANG, 2020",
    location: "Subang, Jawa Barat",
    type: "Freelance Desktop Solution",
    quote: "Developed integrated desktop system for financial accounting, POS, and inventory management using VB.NET and SQL Server.",
    description: "Designed and built an integrated desktop Point of Sale (POS) and inventory management system for BUMDes (Badan Usaha Milik Desa) Kalijati to digitize village-owned retail and trading operations.",
    achievements: [
      "Developed a reliable offline-first desktop application utilizing VB.NET and Microsoft SQL Server for daily retail transactions.",
      "Implemented barcode scanning, thermal receipt printing, real-time stock deductions, and low-inventory reorder alerts.",
      "Constructed daily financial closing, cash drawer reconciliation, and profit/loss reporting modules for village administrators.",
      "Conducted on-site hands-on training for store cashiers and inventory keepers with zero previous software experience."
    ],
    image: "/images/clients/bumdes.jpeg",
    tags: ["VB.NET", "Microsoft SQL Server", "Desktop POS", "Inventory System", "BUMDes"],
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
  onSelect,
}: {
  item: CareerItem
  index: number
  totalItems: number
  smoothProgress: MotionValue<number>
  onSelect: (item: CareerItem) => void
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
      onClick={() => onSelect(item)}
      className={`group relative z-10 flex flex-col ${
        item.align === "text-right" ? "sm:text-right text-left" : "text-left"
      } w-[82vw] sm:w-[420px] md:w-[500px] shrink-0 ${item.offset} cursor-pointer transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]`}
    >
      <span className="pointer-events-none select-none font-mono text-[14vw] sm:text-8xl md:text-9xl font-black text-white/[0.04] absolute -top-8 sm:-top-12 md:-top-16 left-0 leading-none -z-10">
        {item.id}
      </span>

      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] text-[#a3e635] uppercase">
        {item.period}
      </span>

      <h4
        className={`${sizeMap[item.size]} font-black uppercase tracking-tight leading-[0.95] text-white mt-1 mb-2 sm:mb-3 group-hover:text-[#a3e635] transition-colors`}
      >
        {item.company}
      </h4>

      {/* Gambar dengan Responsif Height & tanpa bentrok CSS transition yang menyebabkan stutter di iPhone */}
      <div className={`relative flex items-center gap-3 ${item.align === "text-right" ? "sm:justify-end justify-start" : "justify-start"}`}>
        <motion.img
          src={item.image || "/placeholder.svg"}
          alt={item.company}
          style={{
            filter: imageFilter,
            opacity: imageOpacity,
            scale: imageScale,
          }}
          className="h-32 sm:h-52 md:h-64 w-auto object-contain will-change-transform"
        />
      </div>

      <span className="font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-3 sm:mt-5">
        {item.role}
      </span>

      <p
        className={`italic font-serif text-white/70 leading-relaxed mt-2.5 sm:mt-4 ${
          item.size === "xl" ? "text-xs sm:text-lg md:text-xl max-w-[95%] sm:max-w-[90%]" : "text-xs sm:text-sm md:text-base max-w-[95%]"
        } ${item.align === "text-right" ? "sm:ml-auto ml-0" : ""}`}
      >
        {item.quote}
      </p>

      <div
        className={`mt-3 sm:mt-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/35 ${
          item.align === "text-right" ? "sm:text-right text-left" : "text-left"
        }`}
      >
        {item.tags.map((tag, i) => (
          <span key={tag}>
            <span className="group-hover:text-[#a3e635] transition-colors">{tag}</span>
            {i < item.tags.length - 1 && <span className="mx-1.5 sm:mx-2 text-white/15">·</span>}
          </span>
        ))}
      </div>

      {/* Interactive Detail Badge */}
      <div className={`mt-3.5 sm:mt-5 flex items-center gap-2 ${item.align === "text-right" ? "sm:justify-end justify-start" : "justify-start"}`}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-[#a3e635]/60 group-hover:bg-[#a3e635]/15 text-white/60 group-hover:text-[#a3e635] text-[10px] sm:text-xs font-mono transition-all shadow-sm">
          <span>View Details</span>
          <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
        </span>
      </div>

      <div className={`mt-3 sm:mt-5 h-px w-12 sm:w-16 bg-[#a3e635]/30 ${item.align === "text-right" ? "sm:ml-auto ml-0" : ""}`} />
    </div>
  )
}

export default function CareerJourney() {
  const targetRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxScrollX, setMaxScrollX] = useState<number | null>(null)
  const [selectedCareer, setSelectedCareer] = useState<CareerItem | null>(null)

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

  // Keyboard shortcut ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCareer(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
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
            A journey of growth and impact • Tap card for details
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
              onSelect={(selected) => setSelectedCareer(selected)}
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

      {/* Career Chronicles Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedCareer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl sm:max-w-2xl bg-[#121214] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh]"
            >
              {/* Modal Header - Compact & Clean */}
              <div className="relative p-3.5 sm:p-5 border-b border-white/10 bg-white/[0.02] flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={selectedCareer.image || "/placeholder.svg"}
                      alt={selectedCareer.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className="font-mono text-[8px] sm:text-[10px] tracking-wider text-[#a3e635] uppercase font-semibold">
                        {selectedCareer.period}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-white/50 uppercase bg-white/5 px-1.5 py-0.5 rounded-full border border-white/5">
                        {selectedCareer.type}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-xl font-black uppercase text-white tracking-tight leading-tight">
                      {selectedCareer.company}
                    </h3>
                    <p className="font-mono text-[10px] sm:text-xs text-white/60 uppercase tracking-wide mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {selectedCareer.role} • <span className="text-white/40">{selectedCareer.location}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCareer(null)}
                  className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-full flex items-center justify-center border border-white/10 transition-colors cursor-pointer shrink-0 text-xs mt-0.5"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Modal Scrollable Body - Refined Typography & Smooth Scroll */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4 text-white/80 overscroll-contain">
                {/* Quote / Mission Highlight */}
                <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-2 border-l-[#a3e635]">
                  <p className="italic font-serif text-[11px] sm:text-sm text-white/90 leading-relaxed">
                    &ldquo;{selectedCareer.quote}&rdquo;
                  </p>
                </div>

                {/* Role Description */}
                <div>
                  <h4 className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-[#a3e635] mb-1 sm:mb-1.5">
                    Scope of Work & Responsibilities
                  </h4>
                  <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-sans">
                    {selectedCareer.description}
                  </p>
                </div>

                {/* Key Contributions & Impact */}
                <div>
                  <h4 className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-[#a3e635] mb-1.5 sm:mb-2">
                    Key Contributions & Impact
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {selectedCareer.achievements.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5"
                      >
                        <span className="text-[#a3e635] text-[10px] sm:text-xs mt-0.5 shrink-0 font-mono font-semibold">0{idx + 1}.</span>
                        <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Skills & Technologies */}
                <div>
                  <h4 className="text-[9px] sm:text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
                    Core Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {selectedCareer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between">
                <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">
                  Milestone {selectedCareer.id} of 0{careerData.length}
                </span>
                <button
                  onClick={() => setSelectedCareer(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
