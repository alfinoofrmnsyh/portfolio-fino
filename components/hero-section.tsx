
"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import InteractivePortrait from "./interactive-portrait"
import SignatureMarqueeSection from "./signature-marquee-section"
import AnimatedSvgPath from "./signature"
import MissionSection from "./mission-section"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 1. Animasi Hero Keluar Lebih Cepat (Pertengahan Scroll)
  const scale = useTransform(smoothProgress, [0, 0.3], [1, 0.45])
  const textOpacity = useTransform(smoothProgress, [0.05, 0.25], [0, 1])
  const exitY = useTransform(smoothProgress, [0.35, 0.6], ["0%", "-100%"])
  const exitOpacity = useTransform(smoothProgress, [0.4, 0.65], [1, 0])

  // 2. Animasi Mission Section Masuk di Tengah-tengah Scroll
  const missionY = useTransform(smoothProgress, [0.45, 0.7], ["100%", "0%"])
  const missionOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1])

  return (
    <section id="home" ref={containerRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen h-[100dvh] min-h-[100dvh] w-full overflow-hidden flex items-center justify-center transform-gpu">
        
        {/* Background Text Layer */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{ y: exitY, opacity: exitOpacity }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center opacity-0"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>
        </motion.div>

        {/* Foreground Portrait Layer (pointer-events-none DIHAPUS agar interaktif kembali) */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          style={{ scale: scale, y: exitY, opacity: exitOpacity }}
        >
          {isReady && <InteractivePortrait />}
        </motion.div>

        {/* Animated SVG Path */}
        <AnimatedSvgPath scrollYProgress={smoothProgress} />

        {/* Mission Section Masuk Otomatis di Tengah Scroll */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto"
          style={{
            y: missionY,
            opacity: missionOpacity,
          }}
        >
          <div className="w-full min-h-screen flex items-center justify-center py-12">
            <MissionSection />
          </div>
        </motion.div>

      </div>
    </section>
  )
}