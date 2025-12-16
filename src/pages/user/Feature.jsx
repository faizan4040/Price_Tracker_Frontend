import pricehistory from "@/assets/BrandLogo/pricehistory.gif"
import pricedown from "@/assets/BrandLogo/pricedown.gif"
import cupon from "@/assets/BrandLogo/cupon.gif"
import bell from "@/assets/BrandLogo/bell.gif"


const Feature = () => {
  const cards = [
    {
      img: pricehistory,
      title: "Price history tracker",
      desc: "With Flipshope you can monitor the prices of your favourite products effortlessly.",
    },
    {
      img: pricedown,
      title: "Price drop alert",
      desc: "Flipshope alerts you when the price of your desired product drops",
    },
    {
      img: cupon,
      title: "Discounts coupons",
      desc: "Discover amazing discounts coupons and big savings while shopping",
    },
  ];

  return (
    <div className="bg-gray-50 py-20">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={bell} className="h-9 w-10 -mr-2" /> Feature
        </h1>
      </div>

      {/* Subtitle */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="font-bold lg:text-5xl text-2xl text-center mb-12">
          See the magic behind our features
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="rounded-xl bg-white shadow-xl p-8 flex flex-col items-center text-center
                         transform transition duration-300 hover:shadow-2xl hover:scale-[1.03]"
            >
              
              <img
                src={card.img}
                alt={card.title}
                className="w-40 h-40 rounded-full object-cover mb-6"
              />

              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>

              <p className="text-gray-600 text-lg">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
