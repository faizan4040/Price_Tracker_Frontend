import Produts from "./Produts";
import myshoplist from "@/assets/BrandLogo/myshoplist.gif";

const MyShopList = () => {
  const isLoading = false;
  const myProdut = []; // EMPTY → will show empty UI

  return (
    <div className="max-w-4xl mx-auto my-32 px-4 md:px-0">
      <h1 className="font-bold text-2xl mb-6">My ShopList</h1>

      <div className="my-5">
        {isLoading ? (
          <MyProductSkeleton />
        ) : myProdut.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center text-center py-10">
            <img
              src={myshoplist}
              alt="Empty Wishlist"
              className="w-120 h-100 mb-4 opacity-90"
            />

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Empty Wishlist
            </h1>

            <p className="text-gray-500 dark:text-gray-300 mt-2 text-lg">
              You have no items in your wishlist. Start adding!
            </p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myProdut.map((item, index) => (
              <Produts key={index} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyShopList;

const MyProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
