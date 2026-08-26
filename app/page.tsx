// app/page.tsx

import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BikeShowcase from "@/components/bike-showcase"
import SocialSection from "@/components/social-section"
import Footer from "@/components/footer"
import { HistoricalResultsAccordion } from "@/components/historical-results-accordion"
import CareerJourney from "@/components/career-journey"

export default function Home() {
  return (
    <main className="relative bg-fino-dark ">
      {/* Background Curv.svg Global (Fixed di belakang seluruh section) */}
      <div
        className="fixed inset-0 w-full h-full opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("/images/curv.svg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Header />
      
      {/* HeroSection sekarang sudah membungkus Hero & MissionSection */}
      <HeroSection />
      
      <div className="relative z-10">
        <CareerJourney />
        <BikeShowcase />
         <SocialSection />
        {/* <HistoricalResultsAccordion /> */}
       
        <Footer />
      </div>
    </main>
  )
}