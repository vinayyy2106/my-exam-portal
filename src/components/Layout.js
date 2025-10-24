import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userdata, role } = useContext(UserContext); 

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-100 dark:bg-gray-900">
        {role !== "ADMIN" && (
          <div className="w-full md:w-64 flex-shrink-0">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>
        )}
        <main
          className={`flex-1 w-full p-4 sm:p-6 bg-white dark:bg-gray-800 m-0 min-h-screen overflow-auto min-w-100 
            ${role === "ADMIN" ? "md:w-full min-w-full" : ""}`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};
