"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, Bounds, Center } from "@react-three/drei"
import Helmet3DModel from "./helmet-3d-model"

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 16, 16]} />
      <meshStandardMaterial color="#1a1f1a" wireframe />
    </mesh>
  )
}

export default function Footer() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("https://formsubmit.co/ajax/alfinofrmnsyh@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject || `Portfolio Inquiry from ${name}`,
          message,
          _captcha: "false",
        }),
      })

      if (response.ok) {
        setStatus("success")
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <footer id="contact" className="bg-fino-accent pt-0 px-3 sm:px-6 md:px-8 min-h-screen flex flex-col justify-end relative pb-5 overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-48 md:h-90 bg-gradient-to-b from-[#111111] to-fino-accent z-0" />

      {/* Main Dark Card Container */}
      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-6 md:mt-12 z-10 min-h-[85vh] justify-between bg-[#111111] md:bg-transparent rounded-3xl md:rounded-none overflow-hidden">
        
        {/* SVG Background Mask - DESKTOP */}
        <div
          className="hidden md:block absolute inset-0 w-full h-full z-0 bg-[#111111] overflow-hidden"
          style={{
            maskImage: 'url("/images/footer-mask.svg")',
            WebkitMaskImage: 'url("/images/footer-mask.svg")',
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute inset-0 w-full h-full opacity-30"
            style={{
              backgroundImage: 'url("/images/curv.svg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex flex-col justify-between h-full px-5 sm:px-8 md:px-16 py-8 md:py-16 text-white flex-1 mx-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center flex-1">
            
            {/* SISI KIRI: Form Direct Email (Mobile: Rata Tengah, Desktop: Rata Kiri) */}
            <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-5 lg:pl-6 w-full">
              <div className="space-y-2 md:space-y-3 flex flex-col items-center md:items-start">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                  HI, I’M ALFINO. <br />
                  LET’S BUILD <span className="text-fino-accent">SOMETHING GREAT.</span>
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 max-w-lg leading-relaxed mx-auto md:mx-0">
                  I think software isn't just about lines of code; it’s about how tools can drive operational efficiency and tangibly boost a company's conversions. I’m always enthusiastic about tackling new challenges. Have an open position or want to collaborate? Let’s chat!
                </p>
              </div>

              {/* FormSubmit.co Form */}
              <form onSubmit={handleSubmit} className="space-y-3 max-w-xl w-full flex flex-col items-center md:items-stretch">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <input
                    type="text"
                    placeholder="Nama / Perusahaan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-fino-accent transition-colors min-h-[44px]"
                  />
                  <input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-fino-accent transition-colors min-h-[44px]"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subjek (mis. Penawaran Kerjasama / Rekrutmen)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-fino-accent transition-colors min-h-[44px]"
                />

                <textarea
                  rows={3}
                  placeholder="Tuliskan pesan atau detail pekerjaan di sini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-fino-accent transition-colors resize-none"
                />

                <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 pt-1 w-full">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto bg-fino-accent text-fino-dark font-black uppercase px-8 py-3.5 rounded-xl text-xs tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 min-h-[44px]"
                  >
                    {status === "loading" ? "SENDING..." : "SEND EMAIL"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>

                  {status === "success" && (
                    <span className="text-xs text-fino-accent font-semibold text-center md:text-left">
                      ✓ Pesan berhasil terkirim!
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-xs text-red-400 font-semibold text-center md:text-left">
                      ✕ Gagal mengirim. Silakan coba lagi.
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* SISI KANAN: 3D Model & Action Bar */}
            <div className="md:col-span-6 flex flex-col items-center justify-between h-full space-y-2 md:space-y-4">
              
              {/* Container 3D Model tanpa potongan */}
              <div className="relative w-full h-[220px] xs:h-[260px] sm:h-[350px] md:h-[550px] lg:h-[650px] z-10 flex items-center justify-center overflow-visible">
                <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[10, 10, 5]} intensity={1.6} />
                  <pointLight position={[-10, -10, -5]} intensity={0.8} color="#CFFF04" />
                  <Suspense fallback={<LoadingFallback />}>
                    <Bounds fit observe margin={1.00}>
                      <Center>
                        <Helmet3DModel modelPath="/3d/computer.glb" />
                      </Center>
                    </Bounds>
                  </Suspense>
                  <Environment preset="city" />
                </Canvas>
              </div>

              {/* Action Box: CV Download & Social Icons */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <a
                  href="/images/Alfino Firmansyah - CV.pdf"
                  target="_blank"
                  className="w-full sm:w-auto border border-white/20 text-white font-bold uppercase px-6 py-3.5 rounded-xl text-xs tracking-wider hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  DOWNLOAD CV (PDF)
                </a>

                <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
                  <a
                    href="mailto:alfinofrmnsyh@gmail.com"
                    aria-label="Email"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-fino-accent hover:border-fino-accent/40 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/alfino-firmansyah-b8b71017a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-fino-accent hover:border-fino-accent/40 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>

                  <a
                    href="https://github.com/alfinoofrmnsyh"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-fino-accent hover:border-fino-accent/40 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full max-w-[1688px] mx-auto px-4 md:px-12 relative z-20 pt-6 md:pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-fino-dark text-[11px] md:text-xs font-bold tracking-wider uppercase text-center md:text-left gap-2 md:gap-0">
          <p>© 2026 Alfino Firmansyah. All rights reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-60 transition-opacity">PRIVACY POLICY</a>
            <a href="#" className="hover:opacity-60 transition-opacity">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  )
}