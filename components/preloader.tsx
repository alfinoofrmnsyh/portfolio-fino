"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    // Jeda dinaikkan agar animasi loading berjalan lebih lama dan tenang
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVisible(false)
            document.body.style.overflow = "unset"
          }, 800) // Jeda sejenak saat mencapai 100% sebelum zoom out
          return 100
        }
        const diff = Math.floor(Math.random() * 3) + 1
        return Math.min(prev + diff, 100)
      })
    }, 55)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = "unset"
    }
  }, [])

  // Kalkulasi ketinggian air bergelombang (posisi Y dari 320 down to 40)
  const waveY = 320 - (progress / 100) * 260

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1 }}
          /* Animasi Zoom Out & Fade Reveal saat Loading Selesai */
          exit={{
            scale: 2.5,
            opacity: 0,
            filter: "blur(14px)",
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b] px-3 sm:px-6 overflow-hidden select-none"
        >
          <div className="relative flex items-center justify-center w-full max-w-7xl">
            <svg
              viewBox="0 0 1400 350"
              className="w-full h-auto overflow-visible select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Mask Teks menggunakan class font-brier dan ukuran diperbesar */}
                <mask id="preloader-text-mask">
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    className="font-brier font-bold uppercase tracking-tighter"
                    style={{ fontSize: "115px" }}
                  >
                    ALFINO FIRMANSYAH
                  </text>
                </mask>

                {/* Gradasi warna tema (Lime #a3e635 ke Hijau & Putih) */}
                <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#4d7c0f" />
                </linearGradient>
              </defs>

              {/* 1. Teks Base Redup / Unfilled Outline */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(255, 255, 255, 0.07)"
                stroke="rgba(163, 230, 53, 0.15)"
                strokeWidth="1.5"
                className="font-brier font-bold uppercase tracking-tighter"
                style={{ fontSize: "115px" }}
              >
                ALFINO FIRMANSYAH
              </text>

              {/* 2. Layer Ombak Cairan (Multi-layer Liquid Waves) */}
              <g mask="url(#preloader-text-mask)">
                {/* Ombak Belakang (Deep Wave Layer) */}
                <motion.path
                  animate={{
                    x: [0, -350, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.6,
                    ease: "easeInOut",
                  }}
                  d={`M -400 ${waveY} 
                     C -200 ${waveY - 35} -100 ${waveY + 35} 100 ${waveY} 
                     C 300 ${waveY - 35} 400 ${waveY + 35} 600 ${waveY} 
                     C 800 ${waveY - 35} 900 ${waveY + 35} 1100 ${waveY} 
                     C 1300 ${waveY - 35} 1400 ${waveY + 35} 1600 ${waveY} 
                     C 1800 ${waveY - 35} 1900 ${waveY + 35} 2100 ${waveY} 
                     V 400 H -400 Z`}
                  fill="rgba(255, 255, 255, 0.35)"
                />

                {/* Ombak Tengah (Mid Wave Layer) */}
                <motion.path
                  animate={{
                    x: [-350, 0, -350],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.7,
                    ease: "easeInOut",
                  }}
                  d={`M -400 ${waveY} 
                     C -250 ${waveY + 30} -120 ${waveY - 30} 50 ${waveY} 
                     C 220 ${waveY + 30} 350 ${waveY - 30} 520 ${waveY} 
                     C 690 ${waveY + 30} 820 ${waveY - 30} 990 ${waveY} 
                     C 1160 ${waveY + 30} 1290 ${waveY - 30} 1460 ${waveY} 
                     C 1630 ${waveY + 30} 1760 ${waveY - 30} 1930 ${waveY} 
                     V 400 H -400 Z`}
                  fill="rgba(163, 230, 53, 0.6)"
                />

                {/* Ombak Depan Utama (Front Fill Liquid Layer) */}
                <motion.path
                  animate={{
                    x: [0, -400, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.1,
                    ease: "easeInOut",
                  }}
                  d={`M -400 ${waveY} 
                     C -200 ${waveY - 25} 0 ${waveY + 25} 200 ${waveY} 
                     C 400 ${waveY - 25} 600 ${waveY + 25} 800 ${waveY} 
                     C 1000 ${waveY - 25} 1200 ${waveY + 25} 1400 ${waveY} 
                     C 1600 ${waveY - 25} 1800 ${waveY + 25} 2000 ${waveY} 
                     V 400 H -400 Z`}
                  fill="url(#liquidGrad)"
                />
              </g>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}