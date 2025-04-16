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
                            ? 'border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2'
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
                            ? 'border-t border-b border-[#1f5897] bg-[#95bfed] text-gray-800 font-semibold shadow-md mx-2'
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
