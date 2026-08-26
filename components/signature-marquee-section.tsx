// signature-marquee-section.tsx

"use client"

import { motion } from "framer-motion"

export default function SignatureMarqueeSection() {
  const marqueeContent = "PUSH THE LIMIT PUSH THE LIMIT PUSH THE LIMIT PUSH THE LIMIT "
  const marqueeContent2 = "NEVER STOP TO LEARN NEVER STOP TO LEARN NEVER STOP TO LEARN NEVER STOP TO LEARN "

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-fino-text-light z-0 overflow-hidden">
      <div className="w-full flex flex-col gap-4 md:gap-8 py-10 select-none pointer-events-none">
        
        {/* Top Line - Moving Right to Left */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {/* Duplikasi 2 kali agar loop mulus tanpa patah */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <h2 className="font-[family-name:var(--font-brier)] text-[12vw] md:text-[8vw] text-fino-text-light leading-[0.9] tracking-tight px-4">
                  {marqueeContent}
                </h2>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Line - Moving Left to Right */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {/* Duplikasi 2 kali agar loop mulus tanpa patah */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                <h2 className="font-[family-name:var(--font-oswald)] font-bold uppercase text-[12vw] md:text-[8vw] text-fino-text-light leading-[0.9] tracking-tighter px-4">
                  {marqueeContent2}
                </h2>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}