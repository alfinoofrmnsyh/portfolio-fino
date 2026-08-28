"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  // Navigasi disesuaikan dengan section di app/page.tsx
  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT ME", href: "#aboutme" },
    { name: "JOURNEY", href: "#journey" },
    { name: "MOTTO", href: "#motto" },
    { name: "PROJECT", href: "#project" },
    { name: "CONTACT", href: "#contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-fino-dark/80 backdrop-blur-md py-3" : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Nama Utama Responsif */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-start mix-blend-difference z-50"
          >
            <h1 className="font-brier text-xl xs:text-2xl sm:text-3xl md:text-4xl leading-none tracking-tight font-bold text-white whitespace-nowrap">
              ALFINO FIRMANSYAH
            </h1>
          </motion.div>

          {/* Tombol Hamburger Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mix-blend-difference z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 sm:p-2.5 bg-fino-dark/80 border border-white/30 hover:bg-fino-dark rounded-lg transition-colors text-white flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Overlay Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-fino-dark/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center px-6 h-[100dvh] overflow-y-auto"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="text-center w-full max-w-lg my-auto py-12"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.ul className="space-y-4 sm:space-y-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      open: { opacity: 1, y: 0, rotate: 0 },
                      closed: { opacity: 0, y: 20, rotate: -5 },
                    }}
                  >
                    <a
                      href={item.href}
                      className="inline-block hover:text-fino-accent transition-colors duration-300 hover:scale-105 transform active:scale-95"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}