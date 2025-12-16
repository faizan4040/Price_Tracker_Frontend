import { useState } from "react";
import { Login } from "./pages/Login";
import HeroSection from "./pages/user/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
// import Product from "./pages/user/Product";
import DownloadeApp from "./pages/user/DownloadeApp";
import CuponStore from "./pages/user/CuponStore";
import Sales from "./pages/user/Sales";
import Feature from "./pages/user/Feature";
import Deals from "./pages/user/Deals";
import Faq from "./pages/user/Faq";
import Profile from "./pages/user/Profile";
import MyShopList from "./pages/user/MyShopList";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import ProductTable from "./pages/admin/ProductLink/ProductTable";
import FetchProduct from "./pages/user/FetchProduct";
import AddProduct from "./pages/admin/ProductLink/AddProduct";
import { AdminRoute, isAuthenticatedUser as AuthenticatedUser, ProtectedRoutes } from "./components/ProtectedRoutes";
import ProductDetails from "./pages/user/ProductDetails";

const App = () => {
  
  const [products, setProducts] = useState([]); 

  
  const handleProductAdded = (product) => {
    setProducts((prev) => {
      
      const index = prev.findIndex((p) => p._id === product._id || p.id === product.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = product;
        return updated;
      }
      return [product, ...prev];
    });
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection onAdded={handleProductAdded} />
              <FetchProduct products={products}/>
              {/* <ProductList/> */}


              {/* <Product/> */}
              <DownloadeApp />
              <CuponStore />
              <Sales />
              <Feature />
              <Deals />
              <Faq />
            </>
          ),
        },
        
        {
          path: "login",
          element:<AuthenticatedUser> <Login/> </AuthenticatedUser> ,
        },
        {
          path: "profile",
          element: <ProtectedRoutes><Profile/></ProtectedRoutes> ,
        },
        {
          path: "myshoplist",
          element: <ProtectedRoutes><MyShopList/></ProtectedRoutes> ,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },

        // Admin routes
        {
          path: "admin",
          element:
            <AdminRoute>
              <Sidebar/>
            </AdminRoute> ,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "product",
              element: <ProductTable />,
            },
            {
              path: "product/create",
              element: <AddProduct/>,
            },
            {
              path: "product/edit/:id",     
              element: <AddProduct/>,   
            },
          ],
        },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
};

export default App;
