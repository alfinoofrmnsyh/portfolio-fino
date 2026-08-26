"use client"

import { useState, useEffect } from "react"
import { InteractiveClean } from "@/components/interactive-clean"
import { motion } from "framer-motion"

interface AnimatedCounterProps {
  target: number
  label: string
  unit?: string
}

function AnimatedCounter({ target, label, unit = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="text-right">
      <div className="text-xs uppercase tracking-wider text-black/60 mb-2">{label}</div>
      <div className="text-6xl md:text-8xl font-black text-black">
        {count}
        {unit}
      </div>
    </div>
  )
}

export default function BikeShowcase() {
  return (
    <section className="relative px-4 sm:px-6 md:px-12 overflow-hidden pb-5">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-screen py-12 lg:py-0">
          
          {/* Text & Quote Content */}
          <div className="flex flex-col justify-center items-start lg:items-end lg:pr-4 order-2 lg:order-1 w-full">
            {/* Wrapper khusus agar dekorasi quote sejajar dan proporsional dengan blok teks rata kanan */}
            <div className="relative max-w-xl ml-auto w-full">
              {/* Large decorative quote */}
              <div
                className="absolute -left-4 sm:-left-8 -top-12 sm:-top-20 lg:-left-12 lg:-top-32 text-fino-accent opacity-30 text-[120px] sm:text-[200px] lg:text-[280px] leading-none pointer-events-none select-none simteste"
                style={{ fontFamily: "var(--font-alex-brush), cursive" }}
              >
                &ldquo;
              </div>

              {/* Main quote with responsive sizing - Rata Kanan */}
              <blockquote className="relative z-10">
                <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-fino-text-light leading-[1.1] tracking-tight mb-6 lg:mb-8 text-right">
                  <span className="text-fino-accent font-brier">PUSH THE</span> LIMITS,
                  <br />
                  <span className="inline-block">NEVER STOP TO <span className="text-fino-accent font-brier leading-[1.1]">LEARN</span>,</span>
                  <br />
                  BRINGING EVERYTHING IN
                  <br />
                  <span className="text-fino-accent font-brier leading-[1.1]">EVERY SENSE</span>
                </p>
              </blockquote>

              {/* Author attribution - Rata Kanan */}
              <div className="mt-2 sm:mt-4 text-right">
                <p className="text-sm sm:text-base font-medium font-mono md:text-lg text-accent">- Alfino Firmansyah</p>
              </div>
            </div>
          </div>

          {/* Interactive Component / Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[4/5] sm:aspect-square max-w-sm sm:max-w-lg mx-auto lg:mx-0 order-1 lg:order-2"
          >
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-l-4 border-[#CFFF04] rounded-tl-3xl z-20" />
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-r-4 border-[#CFFF04] rounded-tr-3xl z-20" />
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-l-4 border-[#CFFF04] rounded-bl-3xl z-20" />
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-r-4 border-[#CFFF04] rounded-br-3xl z-20" />
           
            <InteractiveClean />
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}