import meesho from "@/assets/BrandLogo/meesho.webp";
import croma from "@/assets/BrandLogo/croma.webp";
import jiomart from "@/assets/BrandLogo/jiomart.webp";
import myntra from "@/assets/BrandLogo/myntra.webp";
import reliancedegital from "@/assets/BrandLogo/reliancedegital.webp";
import pepperfry from "@/assets/BrandLogo/pepperfry.webp";
import amazon from "@/assets/BrandLogo/amazon.webp";
import tatacliq from "@/assets/BrandLogo/tatacliq.webp";
import ajio from "@/assets/BrandLogo/ajio.webp";

export const logos = [
  meesho,
  croma,
  jiomart,
  myntra,
  reliancedegital,
  pepperfry,
  amazon,
  tatacliq,
  ajio,
];

const BrandSlider = () => {
  return (
    <div className="w-full overflow-hidden py-8">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .marquee {
            display: flex;
            gap: 3rem;
            animation: marquee 10s linear infinite;
            will-change: transform;
          }

          .marquee img {
            height: 4rem;
            transition: transform 0.3s ease;
          }

          .marquee img:hover {
            transform: scale(1.2);
          }

          .slider-wrapper:hover .marquee {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="slider-wrapper flex justify-center w-full overflow-hidden">
        <div className="marquee">
          {/* Repeat logos for infinite scrolling */}
          {[...logos, ...logos, ...logos].map((src, i) => (
            <img
              key={i}
              src={src}
              className="object-contain opacity-90 h-12 sm:h-14 md:h-16 lg:h-20"
              alt="brand"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
