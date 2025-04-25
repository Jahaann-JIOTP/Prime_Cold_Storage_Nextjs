"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const DiagramMenu = () => {
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
    const [showPlantSubMenu, setShowPlantSubMenu] = useState(false);

    const toggleDashboardSubMenu = () => {
        setShowDashboardSubMenu(!showDashboardSubMenu);
    };

    const toggleReportsSubMenu = () => {
        setShowReportsSubMenu(!showReportsSubMenu);
    };
    const togglePlantSubMenu = () => {
        setShowPlantSubMenu(!showPlantSubMenu);
    };
    const pathname = usePathname();
    useEffect(() => {
        // Check if the current pathname matches the expected active route
        if (pathname === '/sld' ||  pathname === "/sld_meters" || pathname === "/Logs" || pathname === "/log_detail") {
          setShowDashboardSubMenu(true);
        } else if(pathname === '#'){
            setShowReportsSubMenu(true);
        } else if(pathname === '#'){
            setShowPlantSubMenu(true);
        }
    }, [pathname]);
    return (
        <div>

            <nav className={`mt-4 text-gray-600s text-lg `}>
                <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded" onClick={toggleDashboardSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'> Single Line Diagram </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform ${showDashboardSubMenu ? "transform rotate-180" : ""
                            }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>

                {showDashboardSubMenu && (
                    <ul className="bg-[#fff] ml-8 text-black rounded slide-from-right mr-5 text-[14px]">
                        <li>
                            <Link href="/sld" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "/sld" ||  pathname === "/sld_meters" || pathname === "/Logs" || pathname === "/log_detail" ? 'ice-effect text-white' : ''}`}>
                                - Oneline
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'ice-effect text-white' : ''}`}>
                                - Meter Diagram
                            </Link>
                        </li> */}
                    </ul>
                )}

                {/* <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded" onClick={toggleReportsSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'> Sankey Diagram </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform  ${showReportsSubMenu ? "transform rotate-180" : ""
                            }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link> */}
                {/* {showReportsSubMenu && (
                    <ul className="bg-[#fff] ml-8 text-black rounded slide-from-right mr-5 text-[14px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'ice-effect text-white' : ''}`}>
                                - Plant
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'ice-effect text-white' : ''}`}>
                                - Office
                            </Link>
                        </li>
                    </ul>
                )} */}
                {/* <Link href="#" className="flex items-center py-3 px-4 hover:bg-[#E5E5E5] rounded" onClick={togglePlantSubMenu}>
                    <p className='flex-grow text-[14px] slide-from-right'> Heat Map </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-5 w-5 transition-transform  ${showPlantSubMenu ? "transform rotate-180" : ""
                            }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
                {showPlantSubMenu && (
                    <ul className="bg-[#fff] ml-8 text-black rounded slide-from-right mr-5 text-[14px]">
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'ice-effect text-white' : ''}`}>
                                - Plant
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "#" ? 'ice-effect text-white' : ''}`}>
                                - Office
                            </Link>
                        </li>
                    </ul>
                )} */}
            </nav>
        </div>
    );
};

export default DiagramMenu;
