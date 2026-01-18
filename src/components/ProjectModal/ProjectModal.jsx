import React, { useState, useEffect } from 'react';
import { FiX, FiExternalLink, FiArrowLeft } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      // PERBAIKAN: Gunakan z-[9999] (dengan kurung siku) dan pastikan bg-opacity terlihat
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-start md:items-center z-[9999] p-0 md:p-4 transition-opacity duration-300 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        // PERBAIKAN: Pastikan class animasi animate-in sesuai dengan style di bawah
        className={`bg-zinc-900 border-x md:border border-violet-500/30 md:rounded-2xl shadow-2xl shadow-violet-500/40 w-full max-w-xl min-h-screen md:min-h-fit transform transition-all duration-300 mb-10 md:mb-0 ${
          isClosing ? 'animate-modal-out' : 'animate-modal-in'
        }`}
      >
        {/* Tombol Close Mobile */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full md:hidden"
        >
          <FiX size={20} />
        </button>

        {/* --- GAMBAR --- */}
        <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover md:rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>

        <div className="p-6 md:p-10 flex flex-col gap-5">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-2xl md:text-2xl font-bold text-white leading-tight">
              {project.title}
            </h2>
            <button
              onClick={handleClose}
              className="hidden md:block text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800"
            >
              <FiX size={28} />
            </button>
          </div>

          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            {project.fullDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4 pb-10 md:pb-0">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 font-bold bg-violet-600 hover:bg-violet-700 text-white p-4 rounded-xl transition-all active:scale-95"
            >
              <FiExternalLink size={18} />
              <span>View Project</span>
            </a>
            
            <button
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-2 font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-4 rounded-xl transition-all border border-zinc-700 active:scale-95"
            >
              <FiArrowLeft size={18} />
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes modalOut {
          from { transform: scale(1) translateY(0); opacity: 1; }
          to { transform: scale(0.9) translateY(20px); opacity: 0; }
        }
        .animate-modal-in {
          animation: modalIn 0.3s ease-out forwards;
        }
        .animate-modal-out {
          animation: modalOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;