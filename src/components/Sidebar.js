import React from 'react'
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaFileAlt, FaListUl, FaUserCircle, FaCog, FaTimes } from "react-icons/fa";
export const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
   const linkClass = "flex items-center space-x-3 p-2 rounded-md hover:bg-gray-300 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white text-black dark:text-white transition";
const activeClass = "bg-gray-300 text-black dark:bg-gray-700 dark:text-white";

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
                onClick={() => setSidebarOpen(false)}
            />

            <div
                className={`fixed top-0 left-0 w-64 h-full z-50 transform transition-transform duration-300 md:static md:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <aside className="bg-white dark:bg-gray-900 text-white w-full md:h-full md:w-64 min-h-screen p-5 pt-2 flex flex-col space-y-1 border border-gray-700 rounded-sm">
                    <div className="flex justify-end mb-4 md:hidden">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-800 dark:text-gray-300 hover:text-white hover:bg-gray-700 rounded p-1 transition"
                            aria-label="Close sidebar"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col space-y-1">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => (isActive ? `${linkClass} ${activeClass}` : linkClass)}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaTachometerAlt size={15} />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/exams"
                            className={({ isActive }) => (isActive ? `${linkClass} ${activeClass}` : linkClass)}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaFileAlt size={15} />
                            <span>Exams</span>
                        </NavLink>

                        <NavLink
                            to="/results"
                            className={({ isActive }) => (isActive ? `${linkClass} ${activeClass}` : linkClass)}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaListUl size={15} />
                            <span>Results</span>
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) => (isActive ? `${linkClass} ${activeClass}` : linkClass)}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <FaUserCircle size={15} />
                            <span>Profile</span>
                        </NavLink>
                    </div>

                    <div className="mt-auto pt-4">
                        <button
                            onClick={() => alert("Account Settings clicked")}
                            className="flex items-center space-x-2 text-gray-800 hover:text-white hover:bg-gray-700 rounded px-2 py-2 w-full transition dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <FaCog size={16} />
                            <span className="text-xs">Account Settings</span>
                        </button>
                    </div>
                </aside>
            </div>
        </>



    )
}
export default Sidebar

