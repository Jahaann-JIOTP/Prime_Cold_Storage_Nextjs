"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    // const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
    // const [showPlantSubMenu, setShowPlantSubMenu] = useState(false);

    const toggleDashboardSubMenu = () => {
        setShowDashboardSubMenu(!showDashboardSubMenu);
    };

    // const toggleReportsSubMenu = () => {
    //     setShowReportsSubMenu(!showReportsSubMenu);
    // };

    // const togglePlantSubMenu = () => {
    //     setShowPlantSubMenu(!showPlantSubMenu);
    // };

    const pathname = usePathname();

    useEffect(() => {
        // Check if the current pathname matches the expected active route
        if (pathname === '/dashboard' || pathname === '/status_table' || pathname === '/Sanky') {
            setShowDashboardSubMenu(true);
        }
    }, [pathname]);

    return (
        <div>
            <nav className={`mt-4 text-gray-600 text-lg`}>
                <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]" onClick={toggleDashboardSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'>1- Plant Energy </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform ${showDashboardSubMenu ? "transform rotate-180" : ""}`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>

                {showDashboardSubMenu && (
                    <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
                        <li>
                            <Link href="/dashboard" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "/dashboard" ? 'border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Plant Summary
                            </Link>
                        </li>
                        <li>
                            <Link href="/status_table" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "/status_table" ? 'border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Status Table
                            </Link>
                        </li>

                        {/* <li>
                            <Link href="/Sanky" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "/Sanky" ? 'border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Sanky
                            </Link>
                        </li> */}
                    </ul>
                )}

                {/* <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded" onClick={toggleReportsSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'>2- Plant Process Energy </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform ${showReportsSubMenu ? "transform rotate-180" : ""}`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
                {showReportsSubMenu && (
                    <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "#" ? 'bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Primary Utilities
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "#" ? 'bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Secondary Utilities
                            </Link>
                        </li>
                    </ul>
                )}

                <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded" onClick={togglePlantSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'>3. Power Quality</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform ${showPlantSubMenu ? "transform rotate-180" : ""}`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
                {showPlantSubMenu && (
                    <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "#" ? 'bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Power Quality Overview
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname === "#" ? 'bg-[#B4D5F8] text-gray-800 font-semibold shadow-md mx-2' : ''}`}>
                                - Power Quality Details
                            </Link>
                        </li>
                    </ul>
                )} */}
            </nav>
        </div>
    );
};

export default DashboardMenu;
