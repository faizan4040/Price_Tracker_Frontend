import phone1 from "@/assets/BrandLogo/phone1.png";
import { Button } from "@/components/ui/button";

const DownloadeApp = () => {
  return (
    <div className="relative w-full bg-blue-600 py-16 md:py-24 overflow-hidden">
      
      {/* PHONE 2 (FRONT PHONE) */}
     <img
        src={phone1}
        alt="App Screen 1"
        className="
            hidden md:block
            absolute 
            right-52 
            top-1/2
            -translate-y-1/2
            w-[280px] md:w-[330px] lg:w-[380px]   /* wider */
            h-[520px] md:h-[580px] lg:h-[650px]   /* taller */
            object-cover
            rotate-[8deg]
            drop-shadow-2xl
        "
        />


      {/* LEFT TEXT */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-lg space-y-6 text-white md:py-10">
          <h3 className="text-xl md:text-2xl font-semibold">
            Deals | Price History | Price Alert
          </h3>

          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Download Our APP Now
          </h1>

          <p className="text-lg text-blue-100">
            Get real-time price history, instant alerts, deal notifications & smarter shopping tools—all in one app.
          </p>

          <Button className="bg-white text-blue-700 cursor-pointer font-semibold px-8 py-6 text-lg rounded-xl hover:bg-blue-100">
            Download App
          </Button>
        </div>
      </div>

    </div>
  );
};

export default DownloadeApp;
