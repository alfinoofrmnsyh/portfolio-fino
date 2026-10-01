// app/components/social-section.tsx

"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import FlexCarousel, { FlexCarouselHandle, FlexCarouselItem } from "@/components/flex-carousel"

interface ProjectCard {
  image: string
  title: string
  subtitle: string
  techStack: string[]
}

const projectCards: ProjectCard[] = [
  {
    image: "/images/lofan/3.png",
    title: "HRIS & Financial System",
    subtitle:
      "An advanced HRIS platform tailored for PT. Hutama Karya Anugerah Persada to automate human resource workflows including attendance tracking, payroll, performance evaluation, and leave management.",
    techStack: ["Laravel", "MySQL", "Bootstrap", "Tailwind"],
  },
  {
    image: "/images/lofan/4.png",
    title: "Gaido Mobile Apps Courier & Tracking",
    subtitle:
      "Cross-platform mobile app providing clients instant access to logistics services, real-time shipment tracking, delivery quotes, and account management.",
    techStack: ["Ionic", "JavaScript", "Angular"],
  },
  {
    image: "/images/lofan/2.png",
    title: "ERP SCM System PT. Gaido Cito Ekakurindo",
    subtitle:
      "A robust ERP system designed to optimize supply chain operations from inventory tracking to distribution with integrated automated reporting tools.",
    techStack: ["Python", "MariaDB", "Flask", "DevExtreme"],
  },
  {
    image: "/images/lofan/5.png",
    title: "Company Profile & CMS PT. Key Lock Indonesia",
    subtitle:
      "Customized CMS and corporate site with real-time portfolio management, responsive layout, and SEO-optimized architecture.",
    techStack: ["Next.js", "Laravel", "TypeScript", "MySQL", "Livewire"],
  },
  {
    image: "/images/lofan/6.png",
    title: "MU Trans Logistics System",
    subtitle:
      "Mobile-based logistics application featuring automated reporting, shipment tracking, and resource management tools to enhance operational efficiency.",
    techStack: ["Laravel", "Vue.js", "PostgreSQL", "Inertia.js"],
  },
  {
    image: "/images/lofan/1.png",
    title: "Company Profile & SPBE Dinas Ketahanan Pangan",
    subtitle:
      "Official institutional profile platform integrated with a content management system to streamline public information management and SPBE standards.",
    techStack: ["Strapi", "MariaDB", "ReactJS", "TypeScript"],
  },
  {
    image: "/images/lofan/8.png",
    title: "Bekasi One Map System",
    subtitle:
      "End-to-end interactive GIS mapping platform engineered to centralize, analyze, and visualize geospatial data for Diskominfo Pemkab Bekasi.",
    techStack: ["Python", "PostgreSQL", "Django", "Leaflet", "GeoJSON", "Tailwind"],
  },
  {
    image: "/images/lofan/9.png",
    title: "Assessment System EPSS",
    subtitle:
      "Automated digital assessment system designed to streamline compliance evaluation, auditing, and reporting for Sectoral Statistics.",
    techStack: ["Python", "MariaDB", "Flask", "DevExtreme"],
  },
  {
    image: "/images/lofan/7.png",
    title: "Desktop Financial & Inventory",
    subtitle:
      "Comprehensive desktop software developed for real-time inventory control, ledger management, and financial reporting for BUMDes Kalijati.",
    techStack: ["VB.NET", "SQL Server", "Inventory Control"],
  },
]

const handIcons = [
  "/images/icon/1.png",
  "/images/icon/2.png",
  "/images/icon/3.png",
  "/images/icon/4.png",
  "/images/icon/5.png",
  "/images/icon/6.png",
]

function TechBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] md:text-xs bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full font-mono">
      {label}
    </span>
  )
}

export default function SocialSection() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null)
  const [cardHeight, setCardHeight] = useState(0.35)
  const [gap, setGap] = useState(12)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<FlexCarouselHandle>(null)

  // Map projectCards to FlexCarousel items
  const carouselItems: FlexCarouselItem[] = projectCards.map((p) => ({
    src: p.image,
    alt: p.title,
    title: p.title,
    subtitle: p.subtitle,
    techStack: p.techStack,
    original: p,
  }))

  // Responsive cardHeight and gap for mobile vs tablet vs desktop
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w < 640) {
        setCardHeight(0.38)
        setGap(12)
        setIsMobile(true)
      } else if (w < 1024) {
        setCardHeight(0.40)
        setGap(16)
        setIsMobile(false)
      } else {
        setCardHeight(0.42)
        setGap(20)
        setIsMobile(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Icon animation interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % handIcons.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcut for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="project" className="relative bg-[#111111] text-white py-10 sm:py-16 overflow-hidden w-full">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 text-center mb-2 sm:mb-4">
        {/* Animated Hand Icon */}
        <div className="relative h-9 sm:h-12 mb-1 sm:mb-2 flex items-center justify-center">
          <div className="relative h-full w-auto max-h-[32px] sm:max-h-[40px] aspect-square">
            {handIcons.map((icon, index) => (
              <div
                key={icon}
                className={`absolute inset-0 transition-opacity duration-0 ${index === currentIconIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img src={icon || "/placeholder.svg"} className="h-full w-full object-contain" alt="Animated hand icon" />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">My Featured</h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-brier mt-0.5 sm:mt-1 text-zinc-400">Projects</h3>
          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-zinc-400 font-mono uppercase tracking-wider">
            Drag or scroll to explore • Tap any project to view details
          </p>
        </motion.div>
      </div>

      {/* React Bits Flex Carousel (Fullscreen Edge-to-Edge WebGL) */}
      <div className="relative w-full h-[360px] sm:h-[460px] md:h-[560px] lg:h-[660px] my-1 sm:my-2 overflow-hidden">
        <FlexCarousel
          ref={carouselRef}
          items={carouselItems}
          preset="ribbon"
          tilt={0}
          intro="rise"
          captions={false}
          cardHeight={cardHeight}
          gap={gap}
          radius={18}
          fit="natural"
          bend={isMobile ? 0.16 : 0.24}
          reach={isMobile ? 0.20 : 0.28}
          dispersion={isMobile ? 0.15 : 0.28}
          squeeze={isMobile ? 0.08 : 0.12}
          focusOnClick={false}
          captureWheel={false}
          onChange={(idx) => setActiveIndex(idx)}
          onSelect={(_, item) => setSelectedProject(item.original)}
        />

        {/* Floating Prev / Next Controls near screen edges */}
        <button
          onClick={() => carouselRef.current?.prev()}
          className="absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl backdrop-blur-md text-xs sm:text-base"
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={() => carouselRef.current?.next()}
          className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl backdrop-blur-md text-xs sm:text-base"
          aria-label="Next project"
        >
          →
        </button>
      </div>


      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center border border-white/10 transition-colors cursor-pointer text-sm"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-48 sm:h-64 bg-zinc-950 shrink-0">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 overflow-y-auto">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">{selectedProject.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1.5 sm:mt-2 leading-relaxed">{selectedProject.subtitle}</p>
                </div>

                <div>
                  <h4 className="text-[10px] sm:text-xs font-mono uppercase text-zinc-500 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <TechBadge key={idx} label={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}