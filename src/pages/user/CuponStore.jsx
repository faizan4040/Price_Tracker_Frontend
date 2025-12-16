import cleartrip_store from "@/assets/BrandLogo/cleartrip_store.webp";
import caffine_store from "@/assets/BrandLogo/caffine_store.webp";
import makemytrip_store from "@/assets/BrandLogo/makemytrip_store.webp";
import myntra from "@/assets/BrandLogo/myntra.webp";
import nykaa_store from "@/assets/BrandLogo/nykaa_store.webp";
import tatacliq from "@/assets/BrandLogo/tatacliq.webp";
import grocery from "@/assets/BrandLogo/grocery.gif"

const storeCards = [
  { name: "cleartrip", img: cleartrip_store },
  { name: "caffine", img: caffine_store },
  { name: "makemytrip_store", img: makemytrip_store },
  { name: "Myntra", img: myntra },
  { name: "nykaa", img: nykaa_store },
  { name: "TataCliq", img: tatacliq },
];

const CuponStore = () => {
  return (
    <div className="bg-gray-50 py-20">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={grocery} className="h-9 w-10 -mr-2 " /> Stores
        </h1>
      </div>

      {/* Subtitle + Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="font-bold lg:text-5xl text-2xl text-center mb-12">
          Discount coupons from top online stores
        </h2>

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
            gap-8
            w-full
          "
        >
          {storeCards.map((store, i) => (
            <div
              key={i}
              className="
                bg-white
                shadow-xl
                rounded-3xl
                px-4
                py-4
                flex
                flex-col
                items-center
                justify-center
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                cursor-pointer
                w-full
                h-full
              "
            >
              <img
                src={store.img}
                alt={store.name}
                className="h-20 w-40 object-contain mb-4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuponStore;
