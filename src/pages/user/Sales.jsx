import { BellDotIcon } from "lucide-react";
import buy1 from "@/assets/BrandLogo/buy1.webp";
import buy2 from "@/assets/BrandLogo/buy2.webp";
import buy3 from "@/assets/BrandLogo/buy3.webp";
import buy4 from "@/assets/BrandLogo/buy4.webp";
import bell from "@/assets/BrandLogo/bell.gif"

const Sales = () => {
  const cards = [buy1, buy2, buy3, buy4];

  return (
    <div className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={bell} className="h-9 w-10 -mr-2"  /> Sales
        </h1>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="font-bold lg:text-5xl text-2xl text-center mb-12">
          Discover exclusive sales today
        </h2>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {cards.map((img, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white shadow-xl transform transition duration-300 hover:shadow-2xl hover:scale-[1.03]"
            >
              <img
                src={img}
                alt={`Sale ${index + 1}`}
                className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sales;
