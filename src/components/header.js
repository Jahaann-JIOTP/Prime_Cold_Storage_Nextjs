"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
  const [alarms, setAlarms] = useState([]); // Stores the alarms
  const [isNotificationVisible, setNotificationVisible] = useState(false); // Notification dropdown visibility
  const [bellIcon, setBellIcon] = useState("basil_notification-solid.png"); // Default bell icon
  const [newAlarmCount, setNewAlarmCount] = useState(0); // Count of new alarms
  const [error, setError] = useState(null);
  const acknowledgedAlarms = useRef([]); // Track acknowledged alarms
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const fetchAlarms = async () => {
    setError(null);

    try {
      const response = await axios.get(
        "http://15.206.128.214/Test_Api/bell.php"
      );
      let newAlarms = response.data.alarms || [];
      const backendBellStatus = response.data.bell_status || "blue";

      // Filter out previously acknowledged alarms
      newAlarms = newAlarms.filter(
        (alarm) => !acknowledgedAlarms.current.includes(alarm.id)
      );

      const newAlarmIds = newAlarms.map((alarm) => alarm.id);

      // Update bell icon and count based on new alarms
      if (backendBellStatus === "red" || newAlarmIds.length > 0) {
        setBellIcon("redbell.gif"); // Show red bell for new alarms
        setNewAlarmCount(newAlarmIds.length); // Show count of new alarms
      } else {
        setBellIcon("basil_notification-solid.png"); // Show white bell if no alarms
        setNewAlarmCount(0); // Reset the alarm count
      }

      // Update alarms in the state
      setAlarms(newAlarms.slice(0, 5)); // Only display the latest 5 alarms
    } catch (err) {
      console.error("Error fetching alarms:", err);
      setError("Failed to fetch alarms.");
    }
  };

  const acknowledgeAlarms = () => {
    setBellIcon("basil_notification-solid.png"); // Reset bell to white
    setNewAlarmCount(0); // Reset the alarm count

    // Add current alarm IDs to acknowledged alarms
    acknowledgedAlarms.current = [
      ...acknowledgedAlarms.current,
      ...alarms.map((alarm) => alarm.id),
    ];

    setAlarms([]); // Clear current alarms
    setNotificationVisible(false); // Close the dropdown
  };

  useEffect(() => {
    fetchAlarms();
    const intervalId = setInterval(fetchAlarms, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const toggleNotificationVisibility = () => {
    setNotificationVisible(!isNotificationVisible);
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
      {/* Bell Icon */}
      <div className="relative mr-4 mt-1">
          <div className="relative inline-block">
            <img
              src={`./${bellIcon}`} // Dynamically change the bell icon
              alt="Bell Icon"
              className="ml-2 cursor-pointer w-8 h-8" // Bell size increased
              onClick={toggleNotificationVisibility}
            />
            {bellIcon === "redbell.gif" && newAlarmCount > 0 && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                style={{
                  transform: "translate(50%, -50%)", // Position directly above the bell
                  fontSize: "10px",
                }}
              >
                {/* {newAlarmCount} */}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {isNotificationVisible && (
            <div className="absolute top-full right-0 mt-2 w-80 p-6 bg-white shadow-lg border border-gray-300 rounded-lg z-10">
              <div className="font-semibold text-gray-700 flex justify-between items-center">
                <span>Alarms</span>
                <button
                  className="text-xs text-white bg-[#c1121f] px-2 py-1 rounded focus:outline-none hover:bg-[#e9a781]"
                  onClick={() => setNotificationVisible(false)}
                >
                  Close
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="px-3 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-sm uppercase tracking-wide rounded-md shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ml-[-120px]"
                  onClick={acknowledgeAlarms}
                >
                  Acknowledge
                </button>
              </div>
              <ul className="mt-4 text-sm text-gray-600">
                {error && <p>{error}</p>}
                {alarms.length > 0 ? (
                  alarms.map((alarm, index) => (
                    <li key={index} className="py-2 border-b flex items-center">
                      <div className="flex items-center mr-2">
                        <img
                          src="./yellowbell.gif" // Use yellow bell for dropdown alarms
                          alt="Alarm Icon"
                          className="w-6 h-6" // Increased dropdown bell size
                        />
                      </div>
                      <div className="flex flex-col text-[12px]">
                        <div>{alarm.source}</div>
                        <div>{alarm.status}</div>
                      </div>
                      <div className="text-right text-[12px] ml-auto">
                        {alarm.time}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-4 text-gray-500">
                    No alarms available.
                  </li>
                )}
                {/* Details link */}
                <li
                  className="text-center py-2 mt-2 text-blue-500 cursor-pointer hover:bg-gray-100 hover:text-blue-700 transition-all"
                  onClick={() => (window.location.href = "/Recent_Alarms")}
                >
                  Details
                </li>
              </ul>
            </div>
          )}
        </div>
    </header>
  );
};

export default Header;
