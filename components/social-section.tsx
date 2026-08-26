// app/components/social-section.tsx

"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

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
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null)

  const dragContainerRef = useRef<HTMLDivElement>(null)
  const dragContentRef = useRef<HTMLDivElement>(null)
  const [dragConstraint, setDragConstraint] = useState(0)

  // Measure carousel drag width
  useEffect(() => {
    const measure = () => {
      if (dragContainerRef.current && dragContentRef.current) {
        const containerWidth = dragContainerRef.current.offsetWidth
        const contentWidth = dragContentRef.current.scrollWidth
        setDragConstraint(Math.max(contentWidth - containerWidth, 0))
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
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

  const centerIndex = (projectCards.length - 1) / 2

  return (
    <section id="social-section" className="relative bg-[#111111] text-white py-16 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        
        {/* Animated Hand Icon */}
        <div className="relative h-12 mb-2 flex items-center justify-center">
          <div className="relative h-full w-auto max-h-[40px] aspect-square">
            {handIcons.map((icon, index) => (
              <div
                key={icon}
                className={`absolute inset-0 transition-opacity duration-0 ${
                  index === currentIconIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img src={icon || "/placeholder.svg"} className="h-full w-full object-contain" alt="Animated hand icon" />
              </div>
            ))}
          </div>
        </div>

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">My Featured</h2>
          <h3 className="text-3xl md:text-5xl font-brier mt-1 text-zinc-400">Projects</h3>
        </motion.div>

        {/* Main Cards Layout */}
        <div className="relative mb-12">
          
          {/* Mobile Layout: Draggable Carousel */}
          <div ref={dragContainerRef} className="md:hidden overflow-hidden touch-pan-y">
            <motion.div
              ref={dragContentRef}
              className="flex gap-4 px-4 py-4 w-max cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -dragConstraint, right: 0 }}
              dragElastic={0.08}
              dragTransition={{ power: 0.2, timeConstant: 200 }}
              whileTap={{ cursor: "grabbing" }}
            >
              {projectCards.map((project, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedProject(project)}
                  className="shrink-0 w-[280px] h-[400px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col cursor-pointer select-none"
                >
                  <div className="relative w-full h-[52%] bg-zinc-950 pointer-events-none">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      draggable={false}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow bg-zinc-900">
                    <div>
                      <h4 className="font-bold text-base text-white uppercase tracking-tight line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-medium mt-0.5 line-clamp-2">{project.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.map((tech, idx) => (
                        <TechBadge key={idx} label={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Pagination Indicators */}
            <div className="flex justify-center gap-1.5 mt-2">
              {projectCards.map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-white/20" />
              ))}
            </div>
          </div>

          {/* Desktop Layout: Animated Fan Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden md:flex relative h-[580px] items-center justify-center"
          >
            {projectCards.map((project, i) => {
              const offset = i - centerIndex

              return (
                <motion.div
                  key={i}
                  onClick={() => setSelectedProject(project)}
                  initial={{ opacity: 0, rotate: 0, scale: 0 }}
                  whileInView={{
                    opacity: 1,
                    rotate: offset * 4.5,
                    scale: 1 - Math.abs(offset) * 0.025,
                    x: offset * 95,
                    y: Math.abs(offset) * 18,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.08,
                    type: "spring",
                    stiffness: 60,
                    damping: 12,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                    zIndex: 40,
                    y: -30,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute w-[330px] h-[430px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden cursor-pointer origin-bottom flex flex-col"
                  style={{ zIndex: 20 - Math.round(Math.abs(offset)) }}
                >
                  <div className="relative w-full h-[52%] bg-zinc-950">
                    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow bg-zinc-900">
                    <div>
                      <h4 className="font-bold text-lg text-white uppercase tracking-tight line-clamp-1">
                        {project.title}
                      </h4>
                      <p className="text-sm text-zinc-400 font-medium mt-0.5 line-clamp-2">{project.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.techStack.map((tech, idx) => (
                        <TechBadge key={idx} label={tech} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-64 bg-zinc-950">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-6 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">{selectedProject.title}</h3>
                  <p className="text-sm text-zinc-300 font-medium mt-2 leading-relaxed">{selectedProject.subtitle}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
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