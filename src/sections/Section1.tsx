import React, { useRef } from 'react';
import logo from '../assets/CCS-PPV-LOGO.webp';
import portrait from '../assets/PPV.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { SpotlightBackground } from '../components/ui/spotlight';

const Section1: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <section className="h-screen w-full relative flex items-center justify-center overflow-hidden font-montserrat">
      <SpotlightBackground className="absolute inset-0" speed={2} imageRef={imageRef} />

      {/* Header Container - Logo & Language Selector Aligned */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-8 z-10">
        {/* Logo - Responsive Sizing based on Reference (w160 at 2xl) */}
        <div className="w-[106px] xl:w-[133px] 2xl:w-[160px] 3xl:w-[200px] 4xl:w-[266px] 5xl:w-[400px]">
          <img src={logo} alt="CCS PPV Logo" className="w-full h-auto select-none" draggable="false" />
        </div>

        {/* Language Selector */}
        <div className="text-white font-semibold text-[16px] xl:text-[20px] 2xl:text-[24px]">
          <span>EN | ES</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center relative z-0">

        {/* Text Content - Centered relative to container - Moved up slightly (-mt) */}
        <div className="flex flex-col justify-center items-start z-10 mb-8 md:mb-0 md:w-1/2 md:pl-10 lg:pl-20 md:-mt-12">

          {/* Row 1: Hola, soy - Medium Weight */}
          <span className="text-white font-medium block leading-none whitespace-nowrap
            mb-[10px] xl:mb-[13px] 2xl:mb-4 3xl:mb-5 4xl:mb-[27px] 5xl:mb-10
            text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]
            xl:text-[40px] 
            2xl:text-[48px] 
            3xl:text-[60px] 
            4xl:text-[80px] 
            5xl:text-[120px]">
            Hola, soy
          </span>

          {/* Row 2 & 3: Name - Semibold Weight */}
          <h1 className="text-white font-semibold leading-[0.9] flex flex-col">
            {/* Pedro Ponce - Forced to single line */}
            <span className="block whitespace-nowrap
              text-[42px] sm:text-[52px] md:text-[64px] lg:text-[72px]
              xl:text-[80px] 
              2xl:text-[96px] 
              3xl:text-[120px] 
              4xl:text-[160px] 
              5xl:text-[240px]">
              Pedro Ponce
            </span>
            {/* Vergara - Forced to single line */}
            <span className="block text-white whitespace-nowrap
              text-[42px] sm:text-[52px] md:text-[64px] lg:text-[72px]
              xl:text-[80px] 
              2xl:text-[96px] 
              3xl:text-[120px] 
              4xl:text-[160px] 
              5xl:text-[240px]">
              Vergara
            </span>
          </h1>

          {/* Row 4: Title - Light Weight - Accent Color #34AEFA */}
          <span className="text-accent-blue font-light block leading-none whitespace-nowrap
            mt-[10px] xl:mt-[13px] 2xl:mt-4 3xl:mt-5 4xl:mt-[27px] 5xl:mt-10
            text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px]
            xl:text-[30px] 
            2xl:text-[36px] 
            3xl:text-[45px] 
            4xl:text-[60px] 
            5xl:text-[90px]">
            FULLSTACK DEVELOPER
          </span>

          {/* CTA & Social Icons Row */}
          <div className="flex items-center gap-4 mt-16 xl:mt-24 2xl:mt-32 3xl:mt-40">
            {/* Download CV Button */}
            <a href="#" className="bg-accent-blue text-primary-dark font-bold rounded-full transition-transform hover:scale-105 flex items-center justify-center
              px-6 py-2 text-sm
              xl:px-8 xl:py-3 xl:text-base
              2xl:px-10 2xl:py-4 2xl:text-lg
              3xl:px-12 3xl:py-5 3xl:text-xl">
              Descarga mi CV
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="text-white hover:scale-110 transition-transform flex items-center justify-center">
                <FontAwesomeIcon icon={faGithub} className="text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl" />
              </a>
              <a href="#" className="text-white hover:scale-110 transition-transform flex items-center justify-center">
                <FontAwesomeIcon icon={faLinkedin} className="text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Portrait Image */}
        <div className="h-[55vh] md:h-[85vh] w-auto md:w-1/2 flex items-end justify-center md:justify-end">
          <img
            ref={imageRef}
            src={portrait}
            alt="Pedro Ponce Vergara"
            className="h-full w-auto object-contain max-w-none select-none"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default Section1;
