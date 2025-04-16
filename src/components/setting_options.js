"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingMenu = () => {
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(true);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(true);

  const toggleDashboardSubMenu = () => {
    setShowDashboardSubMenu(!showDashboardSubMenu);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
  };
  const pathname = usePathname();
  useEffect(() => {
    // Check if the current pathname matches the expected active route
    if (pathname === "/user") {
      setShowDashboardSubMenu(true);
    }
  }, [pathname]);
  return (
    <div>
      <nav className={`mt-4 text-gray-600 text-lg`}>
        <Link
          href="#"
          className="flex items-center py-3 px-4 hover:bg-[#E5E5E5]"
          onClick={toggleDashboardSubMenu}
        >
          <p className="flex-grow text-[14px] slide-from-right">
            {" "}
            1- User Managment
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 transition-transform ${
              showDashboardSubMenu ? "transform rotate-180" : ""
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
          <ul className="bg-[#fff] slide-from-right ml-8 text-gray-600 rounded mr-5 text-[13px]">
          <li>
              <Link href="/add_roles" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "/add_roles" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - Add Roles
              </Link>
          </li>
          <li>
              <Link href="/add_user" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "/add_user" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - Add User
              </Link>
          </li>
          <li>
              <Link href="/view_users" className={`block py-2 px-4 hover:bg-[#E5E5E5] rounded ${pathname == "/view_users" ? 'bg-[#B4D5F8] text-gray-600' : ''}`}>
                  - View User
              </Link>
          </li>
      </ul>
        )}

      </nav>
    </div>
  );
};

export default SettingMenu;
