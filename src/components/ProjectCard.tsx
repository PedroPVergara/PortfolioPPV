import { useState, useRef, useEffect, type ReactNode } from 'react';
import { VideoModal } from './ui/VideoModal';
import { ImageModal } from './ui/ImageModal';

interface ProjectCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  projectType?: 'work' | 'personal';
  demoLink?: string;
  technologies?: { name: string; icon: string }[];
  images?: { url: string; desc: string }[];
}

export const ProjectCard = ({ title, description, children, projectType = 'personal', demoLink = "#", technologies = [], images = [] }: ProjectCardProps) => {
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Slider State
  const [activeStep, setActiveStep] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setShowTopGradient(scrollTop > 0);
      setShowBottomGradient(scrollHeight - scrollTop > clientHeight + 1); // +1 buffer for precision
    }
  };

  useEffect(() => {
    handleScroll(); // Initial check
    // Re-check when description changes
  }, [description]);

  // Slider Logic
  const handleNext = () => {
    if (activeStep < images.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header Row: Title + Badge (Left) and Nav Buttons (Right) */}
      <div className="w-full flex justify-between items-center px-0">
        {/* Left: Badge + Title + Demo Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {projectType === 'work' ? (
              <span className="material-symbols-outlined text-[#DD9F2D] text-2xl md:text-3xl">award_star</span>
            ) : (
              <span className="material-symbols-outlined text-[#ACACAC] text-2xl md:text-3xl">verified</span>
            )}
            <h3 className="text-white text-sm md:text-base font-bold font-montserrat tracking-wide">
              {title || "Project Title"}
            </h3>
          </div>

          {/* Demo Button */}
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="flex items-center gap-2 bg-[#E6E6E6] hover:bg-white text-[#0D1127] px-4 py-1.5 rounded-full transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">open_in_new</span>
            <span className="text-xs md:text-sm font-semibold font-montserrat">ver demo</span>
          </button>
        </div>

        {/* Right: Navigation Buttons */}
        <div className="flex items-center gap-2">
          {images.length > 0 && (
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="w-8 h-8 rounded-full bg-[#1D293D] flex items-center justify-center hover:bg-[#2A3B55] transition-colors mr-2 cursor-pointer"
              title="Ver imagen completa"
            >
              <span className="material-symbols-outlined text-white text-lg font-bold">open_in_full</span>
            </button>
          )}
          <button
            onClick={handlePrev}
            disabled={activeStep === 0 || !images.length}
            className={`w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors ${activeStep === 0 || !images.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
          >
            <span className="material-symbols-outlined text-[#0D1127] text-lg font-bold">chevron_left</span>
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === images.length - 1 || !images.length}
            className={`w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors ${activeStep === images.length - 1 || !images.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 cursor-pointer'}`}
          >
            <span className="material-symbols-outlined text-[#0D1127] text-lg font-bold">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="w-full bg-[#1D293D] rounded-[8px] flex overflow-hidden border border-[#1D293D] min-h-[450px]">
        {/* Left Column (40%) - Description Only */}
        <div className="w-[40%] flex flex-col p-8 text-white relative">
          <div className="relative w-full">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="max-h-[220px] overflow-y-auto pr-2 custom-scrollbar-minimal overscroll-contain"
            >
              <p
                className="text-sm md:text-base leading-relaxed opacity-90 font-light font-montserrat pb-4"
              >
                {description || "Project description goes here..."}
              </p>
            </div>

            {showTopGradient && (
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#1D293D] to-transparent pointer-events-none z-10" />
            )}

            {showBottomGradient && (
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#1D293D] to-transparent pointer-events-none z-10" />
            )}
          </div>

          {/* Technology Pills - Flex wrap with auto width */}
          <div className="mt-8 flex flex-wrap gap-3 w-full">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#0D1127] rounded-full px-3 py-1.5 border border-[#34AEFA]/30 hover:border-[#34AEFA] transition-colors group w-fit"
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-5 h-5 object-contain flex-shrink-0"
                />
                <span className="text-xs md:text-sm font-medium font-montserrat text-white/90 group-hover:text-white whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (60%) */}
        <div className="w-[60%] p-1 bg-[#1D293D]">
          {/* Subcontainer for Image Viewer */}
          <div
            className="w-full h-full rounded-[6px] overflow-hidden relative border border-[#34AEFA] bg-[#0F172A] min-h-[300px]"
          >
            {images.length > 0 ? (
              images.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${activeStep === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <div className="w-full h-full bg-[#0F172A] flex items-center justify-center relative">
                    <img
                      src={item.url}
                      alt={`Project screenshot ${index + 1}`}
                      className="w-full h-full object-contain select-none"
                      draggable="false"
                    />

                    {/* Vignette & Description */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end">
                      <p className="text-white text-sm md:text-base font-medium font-montserrat text-center opacity-90">
                        {item.desc}
                      </p>
                    </div>

                    {/* Top Vignette for balance */}
                    <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  </div>
                </div>
              ))
            ) : (
              /* Image Viewer Placeholder */
              children
            )}
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={demoLink}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={images.map(img => img.url)}
        currentIndex={activeStep}
        onIndexChange={setActiveStep}
      />
    </div>
  );
};
