import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet, } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
        <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5  h-screen">
      <div className="mt-24 space-y-4">
        <Link to="dashboard" className="flex items-center gap-2">
          <ChartNoAxesColumn size={22} />
          <h1>Dashboard</h1>
        </Link>

        <Link to="product" className="flex items-center gap-2">
          <SquareLibrary size={22} />
          <h1>Add Product</h1>
        </Link>
      </div>
    </div>
    <div className="flex-1 pt-[120px] md:p-18 mt-12">
       <Outlet/>
    </div>
    </div>
  );
};

export default Sidebar;
