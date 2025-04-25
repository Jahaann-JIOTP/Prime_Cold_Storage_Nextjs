"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const TrendMenu = () => {
    const pathname = usePathname();

    return (
        <div>
            <nav className={`mt-4 text-gray-600 text-lg slide-from-right`}>
                {/* Customized Trend */}
                <Link
                    href="/custom_trend"
                    className={`block py-3 px-4 rounded transition-colors duration-300 text-[14px] ${
                        pathname === "/custom_trend"
                            ? 'ice-effect text-white'
                            : 'hover:bg-[#E5E5E5] text-gray-600'
                    }`}
                >
                    1- Customized Trend
                </Link>

                {/* Comparison Trend */}
                {/* <Link
                    href="/comparison_trend"
                    className={`block py-3 px-4 rounded transition-colors duration-300 text-[14px] ${
                        pathname === "/comparison_trend"
                            ? 'ice-effect text-white'
                            : 'hover:bg-[#E5E5E5] text-gray-600'
                    }`}
                >
                    2- Comparison Trend
                </Link> */}
            </nav>
        </div>
    );
};

export default TrendMenu;
