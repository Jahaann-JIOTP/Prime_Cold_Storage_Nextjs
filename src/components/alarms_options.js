"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const AlarmMenu = () => {

    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-black text-lg slide-from-right`}>


                {/* <Link href="/alarms" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/alarms" ? 'ice-effect text-white' : ''}`}>
                1- Configure Alarms
                </Link> */}
                <Link href="/All_Alarms" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/All_Alarms" ? 'ice-effect text-white' : ''}`}>
                1- All Alarms
                
                </Link>
                <Link href="/Recent_Alarms" className={`block py-3 px-4 hover:bg-[#E5E5E5] text-[14px] rounded ${pathname == "/Recent_Alarms" ? 'ice-effect text-white' : ''}`}>
                2- Recent Alarms
                
                </Link>
                

            </nav>
        </div>
    );
};

export default AlarmMenu;

