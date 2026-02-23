import { useRef, useState, useEffect } from 'react';
import { BackgroundPattern } from '../components/ui/BackgroundPattern';
import { SpotlightBackground } from '../components/ui/spotlight';
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

const Home = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const images = [
      "/assets/LOGO-PPV.webp",
      "/assets/about-card.webp",
      "/assets/AboutMe_1.webp"
    ];

    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
      });
    };

    Promise.all(images.map(loadImage))
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true));
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#0D1127] to-[#020307] relative">
      {/* --- SECTION 1 --- */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden font-montserrat z-10">
        {/* Spotlight restricted to Section 1 with fade-out mask to prevent hard cut at bottom */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
          <SpotlightBackground className="absolute inset-0" speed={2} imageRef={imageRef} />
        </div>

        {/* Pattern Background */}
        <BackgroundPattern />

        {/* Content removed as per user request (Text and Profile Image) */}
      </section>

      {/* --- FLOATING CONTAINER (About Me) --- */}
      {/* Moved to top-[20vh] (lowered by 10% from previous 10vh) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-[20vh] left-0 right-0 mx-auto w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[65%] 2xl:max-w-[50%] 3xl:max-w-[36%] 4xl:max-w-[28%] z-20"
      >
        {/* Logo PPV - Small & Aligned Left above Image */}
        {/* Lowered by 5% from previous 0vh position (now at 5vh absolute: 20vh container - 15vh relative) */}
        {/* Increased size by 20% (from 40px to 48px) and responsive for 1440p+ */}
        <div className="absolute -top-[15vh] left-0 w-[48px] 3xl:w-[74px] 4xl:w-[108px] 5xl:w-[150px] z-30">
          <img src="/assets/LOGO-PPV.webp" alt="PPV Logo" className="w-full h-auto select-none" draggable="false" />
        </div>

        {/* Language Selector - Aligned Right above Image */}
        <div className="absolute -top-[15vh] right-0 z-30 flex items-center h-[48px] 3xl:h-[74px] 4xl:h-[108px] 5xl:h-[150px]">
          <span className="text-white font-montserrat text-sm 3xl:text-lg 4xl:text-2xl 5xl:text-3xl font-semibold tracking-widest cursor-pointer hover:text-[#34AEFA] transition-colors">
            EN | ES
          </span>
        </div>

        <img src="/assets/about-card.webp" alt="About Me Card" className="w-full h-auto select-none drop-shadow-2xl relative z-10" draggable="false" />

        {/* Buttons - CV, Github, Linkedin */}
        {/* Aligned 10% above the bottom of the container and aligned to the start (left) */}
        <div className="absolute bottom-[10%] left-0 z-30 flex items-center gap-4">
          <button className="bg-[#DD9F2D] text-black font-montserrat font-bold py-2 px-6 3xl:py-2.5 3xl:px-7 3xl:text-lg 4xl:py-4 4xl:px-8 4xl:text-xl rounded-[62px] hover:scale-105 transition-transform duration-300 cursor-pointer">
            Descarga mi CV
          </button>
          <a href="https://github.com/PedroPVergara" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform duration-300 text-[35px] 3xl:text-[36px] 4xl:text-[51px]">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/pedropvergara/" target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform duration-300 text-[35px] 3xl:text-[36px] 4xl:text-[51px]">
            <FaLinkedin />
          </a>
        </div>

        {/* Gradient Container below the card */}
        <div className="absolute top-[97%] left-0 w-full min-h-[75vh] bg-gradient-to-b from-[#1D293D] to-[#0D1127] border border-[#34AEFA] z-20 rounded-none p-8 md:p-12 3xl:p-32 4xl:p-40 flex items-center justify-center">
          <img src="/assets/AboutMe_1.webp" alt="About Me Content" className="w-full h-auto object-contain select-none" draggable="false" />
        </div>
      </motion.div>

      {/* --- SECTION 2 --- */}
      <section className="h-screen w-full flex items-center justify-center text-white relative z-0">

      </section>

      {/* --- SECTION 3 --- */}
      <section className="h-screen w-full flex items-center justify-center text-white relative z-0">
        <h1 className="text-4xl font-bold">Section 3</h1>
      </section>
    </main>
  );
};

export default Home;
