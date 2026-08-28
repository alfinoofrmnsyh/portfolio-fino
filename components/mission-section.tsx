// mission-section.tsx

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1.2, 1, 0.2])
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -200])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0])

  // Varian untuk container: mengatur jeda antar elemen anak (stagger)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  }

  // Varian untuk tiap baris judul: muncul dari bawah dengan blur halus, "float" masuk & keluar
  const lineVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const buttonGroupVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="aboutme"
      ref={sectionRef}
      className="relative min-h-screen text-fino-text-light flex items-center justify-center px-4"
    >
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-balance leading-[1.1] xl:text-7xl">
          <motion.span variants={lineVariants} className="block">
            <span className="text-fino-accent font-brier leading-[1.1] text-6xl md:text-8xl">ENTERPRISE</span> ARCHITECT,
          </motion.span>
          <motion.span variants={lineVariants} className="block">
            BUILDING <span className="text-fino-accent font-brier leading-[1.1]">SCALABLE</span> SYSTEMS,
          </motion.span>
          <motion.span variants={lineVariants} className="block">
            DRIVING DIGITAL <span className="text-fino-accent font-brier leading-[1.1]">GOVERNMENT</span> INNOVATION.
          </motion.span>
        </h2>

        {/* Ringkasan Profile */}
        <motion.p
          variants={fadeUpVariants}
          className="mt-8 text-sm md:text-lg text-gray-400 max-w-3xl mx-auto font-light tracking-wide"
        >
          IT Professional & Technical Consultant at Bekasi Regency &bull; ERP & Mobile Specialist &bull; BNSP Certified Database Programmer & DCNA.
        </motion.p>

        {/* Tombol Aksi: Download CV & View Project */}
        <motion.div
          variants={buttonGroupVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="/Alfino Firmansyah -  CV.pdf"
            download="Alfino Firmansyah - CV.pdf"
            className="px-8 py-4 bg-fino-accent text-black font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-lg"
          >
            <span>Download CV</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </motion.svg>
          </motion.a>

          <motion.a
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#masonry-gallery"
            className="px-8 py-4 border border-fino-accent text-fino-accent font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 group"
          >
            <span>View Project</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              variants={{ hover: { x: 6 } }}
              whileHover="hover"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}