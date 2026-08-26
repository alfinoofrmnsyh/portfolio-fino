"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
  xl: "text-3xl sm:text-4xl md:text-5xl",
  sm: "text-2xl sm:text-3xl md:text-4xl",
}

export default function CareerJourney() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"])

  return (
    <section ref={targetRef} className="relative h-[350vh] text-[#e2e8f0]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Fixed Header Top Left */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] text-white/90">
            Career{" "}
            <span className="italic font-serif font-normal text-[#a3e635]">Chronicles</span>
          </h2>
          <p className="mt-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/40">
            A journey of growth and impact
          </p>
        </div>

        {/* Fixed Header Top Right */}
        <div className="absolute top-10 right-6 md:right-12 z-20 hidden md:block text-right">
          <span className="font-mono text-xs tracking-widest text-[#a3e635]">TIMELINE</span>
          <p className="font-mono text-[10px] text-white/40 tracking-widest mt-0.5">2020 - PRESENT</p>
        </div>

        {/* Horizontal Track - Ditambahkan pt-36 md:pt-44 agar kartu berada di bawah header */}
        <motion.div style={{ x }} className="flex items-start gap-16 md:gap-24 pl-6 md:pl-12 pr-28 pt-40 md:pt-48">
          {careerData.map((item) => (
            <div
              key={item.id}
              className={`group relative flex flex-col ${item.align} w-[80vw] sm:w-[440px] md:w-[520px] shrink-0 ${item.offset}`}
            >
              <span className="pointer-events-none select-none font-mono text-[13vw] sm:text-8xl md:text-9xl font-black text-white/[0.04] absolute -top-10 md:-top-16 left-0 leading-none -z-10">
                {item.id}
              </span>

              <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#a3e635] uppercase">
                {item.period}
              </span>

              <h4
                className={`${sizeMap[item.size]} font-black uppercase tracking-tight leading-[0.92] text-white mt-1 mb-3`}
              >
                {item.company}
              </h4>

              <div className={`flex items-center gap-3 ${item.align === "text-right" ? "justify-end" : ""}`}>
                <img 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.company} 
                  className="h-54 md:h-72 w-auto object-contain grayscale opacity-50 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>

              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-5">
                {item.role}
              </span>

              <p
                className={`italic font-serif text-white/70 leading-relaxed mt-5 ${
                  item.size === "xl" ? "text-lg md:text-xl max-w-[85%]" : "text-sm md:text-base max-w-[90%]"
                } ${item.align === "text-right" ? "ml-auto" : ""}`}
              >
                {item.quote}
              </p>

              <div
                className={`mt-4 font-mono text-[10px] uppercase tracking-widest text-white/35 ${
                  item.align === "text-right" ? "text-right" : ""
                }`}
              >
                {item.tags.map((tag, i) => (
                  <span key={tag}>
                    <span className="group-hover:text-[#a3e635] transition-colors">{tag}</span>
                    {i < item.tags.length - 1 && <span className="mx-2 text-white/15">·</span>}
                  </span>
                ))}
              </div>

              <div className={`mt-6 h-px w-16 bg-[#a3e635]/30 ${item.align === "text-right" ? "ml-auto" : ""}`} />
            </div>
          ))}

          <div className="flex flex-col justify-center w-[260px] shrink-0 lg:mt-8">
            <span className="font-mono text-xs text-[#a3e635] uppercase tracking-[0.25em] mb-3">
              What is next?
            </span>
            <h4 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6">
              Ready for the next race
            </h4>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors w-fit"
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