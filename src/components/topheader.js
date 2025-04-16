import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TopHeader = () => {
  const [alarms, setAlarms] = useState([]); // Stores the alarms
  const [isNotificationVisible, setNotificationVisible] = useState(false); // Notification dropdown visibility
  const [bellIcon, setBellIcon] = useState("whitebell.jpg"); // Default bell icon
  const [newAlarmCount, setNewAlarmCount] = useState(0); // Count of new alarms
  const [error, setError] = useState(null);
  const acknowledgedAlarms = useRef([]); // Track acknowledged alarms

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
        setBellIcon("whitebell.jpg"); // Show white bell if no alarms
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
    setBellIcon("whitebell.jpg"); // Reset bell to white
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
    <header className="h-12 flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src="./Prime_logo.png" className="h-14" alt="Logo" />
      </div>
      <div className="header-right flex items-center space-x-4">
        {/* Bell Icon */}
        <div className="relative">
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
        <span>|</span>
        <a
          href="/"
          className="user-link text-[14px] bg-red-500 font-semibold text-white px-3 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </a>
      </div>
    </header>
  );
};

export default TopHeader;
