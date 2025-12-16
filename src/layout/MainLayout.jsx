import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/pages/user/ScrollToTop';

const MainLayout = () => {
  return (
    <div>
      <Navbar />

      {/* ScrollToTop ensures every route starts at top */}
      <ScrollToTop />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
