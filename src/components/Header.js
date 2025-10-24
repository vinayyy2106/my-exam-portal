import { useState, useEffect, useContext } from 'react'
import Logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Profile from '../assets/gifs/profile.gif';
import { Initialavatars } from './Initialavatars';
import { UserContext } from '../context/UserContext';
import { CiLogout } from "react-icons/ci";
import { FaBars, FaTimes } from 'react-icons/fa';

export const Header = ({ setSidebarOpen }) => {
    const { userData,role } = useContext(UserContext);
    // const profileImageUrl = null;
    // const active = "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    // const notActive = "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || true);
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        darkMode === true ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    }, [darkMode])
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const queryTerm = e.target.search.value;
        e.target.reset();
        navigate(`/search?q=${queryTerm}`);
    }
    const handleLogout = () => {
        sessionStorage.clear();
        console.log("Loggingout..");
        navigate("/", { replace: true });
        window.location.reload();// hard reload to clear any cached state still present
    }
    return (
        <header>
            <nav className="bg-white border-b border-white dark:bg-gray-900 dark:border-gray-900">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={Logo} className="h-8" alt="ExamPortal Logo" />
                        <span className="self-center text-2xl italic font-bold whitespace-nowrap dark:text-blue-400">
                            ExamPortal
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="search" id="search-navbar"
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    autoComplete="off" placeholder="Search..." />
                            </form>
                        </div>
                        {role!="ADMIN" && <button
                            className="md:hidden text-2xl px-3 text-white"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <FaBars />
                        </button>}
                        <button
                            onClick={handleLogout}
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                        >
                            <CiLogout />
                            <span className="pl-2 hidden md:block">Logout</span>
                        </button>
                        <Initialavatars name={userData?.fullName || "Guest User"} imageUrl={null} size={32} />
                    </div>
                </div>
            </nav>
        </header>



    )
}
export default Header


