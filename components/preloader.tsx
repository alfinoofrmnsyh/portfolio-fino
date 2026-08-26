"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = "unset"
    }, 3500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-fino-dark text-fino-accent"
        >
          {/* Container dibuat tanpa overflow-hidden */}
          <div className="relative flex items-center justify-center pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-center justify-center"
            >
              {/* Teks Loading berada presisi di atas tengah */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-7 md:-top-12 left-1/2 -translate-x-1/2 font-brier text-xl md:text-3xl font-[family-name:var(--font-oswald)]  whitespace-nowrap"
              >
                SOFTWARE ENGINEER
              </motion.span>

              {/* Teks Nama Utama */}
              <motion.span
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="font-brier text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter bg-gradient-to-r from-fino-accent via-white via-50% to-fino-accent bg-[length:200%_auto] bg-clip-text text-transparent select-none"
              >
                ALFINO FIRMANSYAH
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}