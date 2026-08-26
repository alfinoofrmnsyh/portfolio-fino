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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-fino-dark text-fino-accent px-4 overflow-hidden"
        >
          <div className="relative flex items-center justify-center pt-4 sm:pt-6 w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-center justify-center w-full"
            >


              {/* Nama Utama: Ukuran font disesuaikan dari text-2xl/3xl pada mobile */}
              <motion.span
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="font-brier text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter bg-gradient-to-r from-fino-accent via-white via-50% to-fino-accent bg-[length:200%_auto] bg-clip-text text-transparent select-none whitespace-nowrap text-center"
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