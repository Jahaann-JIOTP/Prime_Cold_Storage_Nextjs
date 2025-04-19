"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faGear,
  faProjectDiagram,
  faArrowTrendUp,
  faBell,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleTabClick }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-[#1F5897] text-white mx-0 my-2 mt-0 flex text-sm w-full" >
      {/* Small screen dropdown button */}
      <div className="lg:hidden flex justify-between items-center px-4 py-2">
        <p className="text-lg font-bold">Menu</p>
        <button onClick={toggleDropdown} aria-label="Toggle menu">
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "1.5em" }} />
        </button>
      </div>

      {/* Dropdown menu for small screens */}
      <nav
        className={`${
          isDropdownOpen ? "block" : "hidden"
        }  bg-[#1F5897] lg:flex w-full`}
      >
        <Link  className={`py-[8px] px-4`} href="/dashboard" onClick={() => handleTabClick("Home")}>
          <p
             className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              pathname === "/dashboard" || pathname === "/status_table" || pathname === "/Sanky" ? "bg-white text-black" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faDashboard}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            DASHBOARD
          </p>
        </Link>
        {/* <Link className={`py-[8px] px-4`} href="#" onClick={() => handleTabClick("Custom")}>
          <p
           className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              ["/dash_1", "/dash_2", "/dash_3", "/dash_4", "/dash_5", "/dash_6"].includes(
                pathname
              )
                ? "bg-white text-black"
                : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faDashboard}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            CUSTOM DASHBOARD
          </p>
        </Link> */}
        <Link className={`py-[8px] px-4`} href="/sld" onClick={() => handleTabClick("Diagram")}>
          <p
            className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              pathname === "/sld" ||  pathname === "/sld_meters" || pathname === "/Logs" || pathname === "/log_detail" ? "bg-white text-black" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faProjectDiagram}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            DIAGRAM
          </p>
        </Link>
        <Link className={`py-[8px] px-4`} href="/custom_trend" onClick={() => handleTabClick("Trends")}>
          <p
            className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              ["/custom_trend", "/comparison_trends"].includes(pathname)
                ? "bg-white text-black"
                : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faArrowTrendUp}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            TRENDS
          </p>
        </Link>
        <Link className={`py-[8px] px-4`} href="/All_Alarms" onClick={() => handleTabClick("Alarms")}>
          <p
            className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              pathname === "/alarms" || pathname === "/All_Alarms" || pathname === "/Recent_Alarms" ? "bg-white text-black" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faBell}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            ALARMS
          </p>
        </Link>
        <Link className={`py-[8px] px-4`} href="/energy_cost" onClick={() => handleTabClick("Reports")}>
          <p
            className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              pathname === "/energy_cost" || pathname === "/energy_usage" || pathname === "/energy_shift" ? "bg-white text-black" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faBell}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            REPORTS
          </p>
        </Link>
        <Link className="py-2 px-1" href="/add_roles" onClick={() => handleTabClick("Setting")}>
          <p
            className={`px-3 py-1 cursor-pointer rounded-lg flex gap-1 ${
              pathname === "/add_roles" ? "bg-white text-black" : ""
            }`}
          >
            <FontAwesomeIcon
              icon={faGear}
              style={{ fontSize: "1.1em", width: "1.1em", height: "1.1em" }}
            />
            SETTING
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
