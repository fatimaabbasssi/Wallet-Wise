import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main content box */}
      <div className="flex-1  overflow-y-auto">
        {/* small screen toggle*/}
        <div className="bg-gray-800 text-black p-3 md:hidden top-nav">
          <button onClick={toggleSidebar} className="toggleBtn text-2xl">
            ☰ 
          </button>
        </div>

        <div className="p-6 main-box">
          {/*other content*/}
          <Outlet />
        </div>
      </div>
    </div>
  );

};

export default Layout;