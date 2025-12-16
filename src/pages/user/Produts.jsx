import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const Produts = () => {

 const isLoading = false; 

  return (

    <div>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
  <div className="relative">
    <img
      src="https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-t-shirt/l/y/t/xl-sh408a-austiz-original-imaggkp5mezhkkha.jpeg?q=70"
      alt="products"
      className="w-full h-auto object-contain rounded-t-lg -mt-6"
    />

  </div>

  <CardContent className="space-y-3">
    <h1 className="hover:underline font-bold text-lg truncate">
      Men Typography Round Neck Cotton Blend Yellow T-Shirt
    </h1>

    <div className="flex items-center gap-3">
      <span className="font-semibold text-lg">₹700</span>
      <span className="text-gray-500 line-through text-base">₹1000</span>
      <span className="text-green-600 font-medium text-base">64% off</span>
    </div>
    <div className="flex item-center gap-2">
      <Clock size={24}></Clock>
      <span>7 sec ago</span>
    </div>

    <div className="flex gap-3 mt-4">
      <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
        Get Deal
      </Button>

      <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
        Price history
      </Button>
    </div>
  </CardContent>
    </Card>

    </div>

    



  );
};

export default Produts;
