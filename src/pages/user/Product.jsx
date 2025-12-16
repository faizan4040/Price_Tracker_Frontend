import { Skeleton } from "@/components/ui/skeleton";
import Produts from "./Produts";
import loot_deal from "@/assets/BrandLogo/loot_deal.gif"
import { Button } from "@/components/ui/button";

const Products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Product = () => {
  const isLoading = false;

  return (
    <div id="loot-deals" className="bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto p-6 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={loot_deal} className="h-9 w-10 -mr-2" /> Loot Deals
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold lg:text-5xl text-xl text-center mb-10">
          Top deals with price history
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : Products.map((Products, index) => <Produts />)}
        </div>

         <div className="flex justify-center items-center w-full mt-8">
            <Button className="px-8 py-6 text-lg cursor-pointer">
              Explore More
            </Button>
          </div>
      </div>
    </div>
  );
};

export default Product;

const ProductSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="flex item-center justify-between" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
        <div>
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};
