import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import LiquidEther from './components/LiquidEther/LiquidEther';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import GooeyNav from './components/GooeyNav/GooeyNav.jsx';
import CardSwap, {Card} from './components/CardSwap/CardSwap.jsx';
import TextPressure from "./components/TextPressure/TextPressure.jsx";


AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#project" },
    { label: "Contact", href: "#contact" },
  ];
  const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    
  const cardSwapRef = useRef(null);
  // Fungsi navigasi
  const handleNext = () => cardSwapRef.current?.next();
  const handlePrev = () => cardSwapRef.current?.prev();


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
  <>
    {/* NAVBAR CONTAINER */}
      <div className={`fixed top-2 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-[100%] px-2 py-1 rounded-full transition-all duration-500 ${
      scrolled 
      ? "bg-black/70 backdrop-blur-xl border border-white/10 shadow-xl" 
      : "bg-transparent border border-transparent shadow-none"
      }`}>
      <GooeyNav
          items={navItems}
          particleCount={window.innerWidth < 640 ? 6 : 12} // Kurangi jumlah partikel
          particleDistances={window.innerWidth < 640 ? [35, 5] : [90, 10]} // Jauh lebih rapat di mobile
          particleR={window.innerWidth < 640 ? 40 : 100} // Radius gooey lebih kecil
          initialActiveIndex={0}
          animationTime={500}
          timeVariance={200}
          colors={[1, 2, 3, 1, 2, 3]}
      />
    </div>
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 h-screen"> 
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      {/* HERO SECTION - Diubah menjadi flex-col dengan items-center & text-center */}
        <div className="hero flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <div className="animate__animated animate__fadeInUp animate__delay-1s max-w-4xl flex flex-col items-center">
            

            {/* Text Pressure Container - Pastikan lebar penuh untuk rata tengah */}
            <div style={{ position: 'relative', height: '180px', width: '100%' }} className="mb-5 mt-35">
              <TextPressure
                text="I'm Fino"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#ffffff"
                strokeColor="#5227FF"
                minFontSize={48}
              />
            </div>

            {/* Deskripsi - Menggunakan mx-auto agar box-nya di tengah */}
            <div className="max-w-2xl mb-12 mx-auto">
              <BlurText
                text="Programmer Expert at Diskominfosantik Kab. Bekasi. Full-Stack Developer specializing in ERP systems and impactful digital solutions for government SPBE projects."
                delay={50}
                animateBy="words"
                direction="top"
                className="text-lg md:text-xl text-zinc-400 leading-relaxed justify-center text-center"
              />
            </div>

            {/* Buttons - justify-center agar tombol di tengah */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a 
                href="/assets/cv-fino.pdf" 
                download="Alfino_Firmansyah_CV.pdf"
                className="group relative font-bold bg-white text-black p-3 px-8 rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-lg text-md"
              >
                Download CV
              </a>
              
              <a 
                href="#project" 
                className="font-bold bg-zinc-900 text-white p-3 px-8  rounded-full border border-zinc-700 hover:bg-zinc-800 transition-all active:scale-95 text-md"
              >
                <ShinyText text="View Projects" disabled={false} speed={3} />
              </a>
            </div>
          </div>
        </div>

        {/* ABOUT ME SECTION */}
        <div className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">About Me</h2>
                <BlurText text="I’m Alfino Firmansyah, An experienced IT professional specializing in ERP system development, mobile applications, and IT project management. Currently working as a Programmer Expert at Dinas Komunikasi, Informasi, Persandian, dan Statistik Kabupaten Bekasi, as well as a Full-Stack Developer for government SPBE (Electronic-Based Government System) projects at Dinas Ketahanan Pangan Kabupaten Bekasi.Proficient in Python, JavaScript, PHP, and VB.NET, with hands-on experience using mobile frameworks such as Ionic. Possesses additional competencies in networking (DCNA certified), security, and hardware maintenance. Certified as a BNSP Database Programmer, with strong capabilities in system analysis, cross-functional communication, and effective problem-solving." delay={150} className="text-base md:text-lg leading-relaxed mb-10 text-gray-300" />
                
                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 mb-4 w-full">
                  <div><h1 className="text-3xl md:text-4xl mb-1">20<span className="text-violet-500">+</span></h1><p>Project Finished</p></div>
                  <div><h1 className="text-3xl md:text-4xl mb-1">3<span className="text-violet-500">+</span></h1><p>Years of Experience</p></div>
                  <div><h1 className="text-3xl md:text-4xl mb-1">3.64<span className="text-violet-500">/4.00</span></h1><p>GPA</p></div>
                </div>
                <ShinyText text="Working with heart, creating with mind." speed={3} className="text-sm md:text-base text-violet-400" />
            </div>

           <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-visible flex justify-center items-center min-h-[70vh] md:min-h-[80vh]">
                <ProfileCard
                  name="Alfino Firmansyah"
                  title="Application and Web Developer"
                  avatarUrl="/assets/fino-profile.png"
                  enableTilt={true}
                  showUserInfo={true}
                />
            </div>
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div className="tools mt-32">
          <h1 className="text-4xl font-bold mb-4">Tools & Technologies</h1>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listTools.map((tool) => (
              <div key={tool.id} className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md">
                <img src={tool.gambar} className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg" />
                <div className="flex flex-col overflow-hidden">
                  <ShinyText text={tool.nama} className="text-lg font-semibold block" />
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

       {/* PROJECTS SECTION */}
        <div className="proyek mt-32 py-20 px-4 md:px-10 lg:px-20" id="project">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* BAGIAN KIRI: Teks & Navigasi */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My Featured <span className="text-[#8708a3ff]">Projects</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Berikut adalah beberapa proyek utama yang telah saya kerjakan. Klik pada kartu untuk melihat detail lebih lanjut.
              </p>
              
              {/* TOMBOL NAVIGASI (Back & Next) */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                <button 
                  onClick={handlePrev}
                  className="p-3 rounded-full border border-zinc-700 text-white hover:bg-[#8708a322] hover:border-[#8708a3ff] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                
                <button 
                  onClick={handleNext}
                  className="p-3 rounded-full border border-zinc-700 text-white hover:bg-[#8708a322] hover:border-[#8708a3ff] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>

              <a href="#contact" className="inline-block px-8 py-3 border border-[#8708a3ff] text-white rounded-full hover:bg-[#8708a3ff] transition-all duration-300">
                Let's Work Together
              </a>
            </div>

            {/* BAGIAN KANAN: CardSwap dengan Ref */}
            <div className="w-full lg:w-2/3">
              <div style={{ height: '200px', position: 'relative' }} className="flex justify-center items-center overflow-visible">
                <CardSwap
                  ref={cardSwapRef} 
                  cardDistance={60}
                  verticalDistance={40} 
                  delay={3000} 
                  pauseOnHover={true}
                >
                  {listProyek.map((proyek) => (
                    <Card key={proyek.id}>
                      <div 
                        className="relative w-[430px] md:w-[500px] bg-[#111] rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                        style={{ 
                          border: `1px solid #8708a388`,
                          boxShadow: `0 10px 30px -10px #8708a366`
                        }}
                        onClick={() => handleProjectClick(proyek)}
                      >
                        {/* Konten kartu Anda tetap sama */}
                        <div className="w-full aspect-video overflow-hidden relative">
                          <img src={proyek.image} alt={proyek.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90"></div>
                        </div>
                        <div className="p-6 bg-gradient-to-b from-zinc-900 to-black">
                          <h3 className="text-xl font-bold text-white mb-2">{proyek.title}</h3>
                          <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{proyek.subtitle}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider text-[#8708a3] border border-[#8708a344]">View Details</span>
                           
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="kontak mt-60 mb-20 sm:p-10 p-4" id="contact"> 
          <h1 className="text-4xl mb-12 font-bold text-center">
            Contact <span className="text-[#8708a3ff]"></span> Me
          </h1>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl">
              <form 
                action="https://formsubmit.co/alfinofrmnsyh@gmail.com" 
                method="POST" 
                className="bg-zinc-900/50 backdrop-blur-sm p-8 md:p-10 w-full rounded-3xl border border-zinc-700 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="group">
                    <label className="text-xs text-zinc-500 ml-2 mb-1 block uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      name="Name" 
                      placeholder="Enter your name" 
                      className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-[#8708a3ff] transition-all text-white" 
                      required 
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs text-zinc-500 ml-2 mb-1 block uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      name="Email" 
                      placeholder="example@mail.com" 
                      className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-[#8708a3ff] transition-all text-white" 
                      required 
                    />
                  </div>

                  <div className="group">
                    <label className="text-xs text-zinc-500 ml-2 mb-1 block uppercase tracking-widest">Message</label>
                    <textarea 
                      name="message" 
                      rows="5" 
                      placeholder="Message" 
                      className="w-full bg-zinc-800/50 border border-zinc-700 p-3 rounded-xl focus:outline-none focus:border-[#8708a3ff] transition-all text-white resize-none" 
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-4 bg-[#1a1a1a] hover:bg-[#8708a3ff] p-4 rounded-full border border-zinc-700 hover:border-white transition-all duration-300 group"
                  >
                    <ShinyText text="Send Message" speed={3} />
                  </button>
                </div>
              </form>
            </div>

            {/* Jika ChatRoom ingin diletakkan di bawah form secara vertikal */}
            {/* <div className="w-full max-w-2xl bg-zinc-800 p-6 rounded-md"><ChatRoom /></div> */}
          </div>
        </div>

      </main> 
    </div> 

    <ProjectModal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
  </>
);
}

export default App
