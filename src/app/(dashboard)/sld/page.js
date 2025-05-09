"use client";
import React, { useState, useEffect } from "react";
import Solar from "@/components/Solar";

export default function SLDPage() {
  const [data, setData] = useState(null);

  // Define meterMapping within the component
  const meterMapping = {
    Machine1: {
      prefix: "U_24",
      position: { top: "170px", left: "418px" },
      link: "sld_meters?id=T_1&&meter=U_24",
      lightPosition: { top: "435px", left: "30px" },
    },

    Machine2: {
      prefix: "G2_U20",
      position: { top: "86px", left: "5px" },
      link: "sld_meters?id=T_1&meter=G2_U20",
      lightPosition: { top: "435px", left: "252px" },
      clickableSize: { width: "90px", height: "80px" }, // Custom size for Machine2
    },

    Machine3: {
      prefix: "G2_U20",
      position: { top: "86px", left: "5px" },
      link: "sld_meters?id=T_1&meter=G2_U20",
      lightPosition: { top: "435px", left: "458px" },
      clickableSize: { width: "90px", height: "80px" }, // Custom size for Machine3
    },
    
    Solar2: {
      prefix: "U_27",
      position: { top: "86px", left: "195px" },
      link: "sld_meters1?id=T_1&meter=U_27",
      lightPosition: { top: "215px", left: "360px" },
      clickableSize: { width: "90px", height: "80px" }, // Custom size for Solar2
    },
    
    TR_2: {
      prefix: "U_25",
      position: { top: "170px", left: "612px" },
      link: "sld_meters?id=T_1&&meter=U_25",
      lightPosition: { top: "215px", left: "130px" },
    },
  };

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const res = await fetch("http://13.234.241.103:1880/latestgcl1");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  // Function to check if data is stale (older than 5 minutes)
  const isDataStale = () => {
    if (!data || !data.timestamp) return true; // No data or no timestamp = stale

    const currentTime = Date.now(); // Current system time in milliseconds
    const dataTime = new Date(data.timestamp).getTime(); // Convert `timestamp` to milliseconds

    const differenceInMinutes = (currentTime - dataTime) / (1000 * 60); // Difference in minutes

    return differenceInMinutes > 5; // If more than 5 minutes old, data is stale
  };

  // Function to get the value, return 0 if data is stale
  const getValue = (key) => {
    if (isDataStale()) {
      return "0"; // Data stale, so return 0
    }

    if (!data) return "Loading"; // If data is still loading
    const sanitizedKey = key.trim();
    const value = data[sanitizedKey];

    return value !== undefined
      ? typeof value === "number"
        ? value.toFixed(2) // Format numbers
        : value // Return non-number values as-is
      : "00"; // Key not found
  };

  // Function to render meter data
  const renderMeterData = (
    prefix,
    { position, link, lightPosition, clickableSize = {} }
  ) => {
    if (!data) return null;

    // Construct keys using the prefix
    const voltageKey = `${prefix}_VOLTAGE_L_L_AVG_V`;
    const currentKey = `${prefix}_CURRENT_TOTAL_A`;
    const powerKey = `${prefix}_ACTIVE_POWER_TOTAL_KW`;

    // Retrieve values from data
    const voltage = data[voltageKey];
    const current = data[currentKey];
    const power = data[powerKey];

    // Log values for debugging
    console.log(`Meter Prefix: ${prefix}`);
    console.log(`Voltage (${voltageKey}):`, voltage);
    console.log(`Current (${currentKey}):`, current);
    console.log(`Power (${powerKey}):`, power);

    // Determine light color and size
    let imageSrc;
    let lightSize;

    if (isDataStale()) {
      // 🔴 Stale data - show red light
      imageSrc = "/red.gif";
      lightSize = { height: "16px", width: "16px" };
    } else if (voltage === undefined || voltage === 0) {
      // 🔴 Voltage missing or zero - red light
      imageSrc = "/red.gif";
      lightSize = { height: "16px", width: "16px" };
    } else if (power === undefined || power === 0) {
      // 🟠 Power missing or zero, but voltage present - orange light
      imageSrc = "/yellow.png";
      lightSize = { height: "14px", width: "14px" };
    } else {
      // 🟢 Normal operation - green light
      imageSrc = "/green.gif";
      lightSize = { height: "21px", width: "21px" };
    }

    return (
      <div key={prefix}>
        {/* Light Indicator */}
        <img
          src={imageSrc}
          alt="Status Light"
          style={{
            position: "absolute",
            ...lightPosition,
            ...lightSize,
          }}
        />

        {/* Clickable Meter Link */}
        <a
          href={link}
          style={{
            position: "absolute",
            ...position,
            display: "block",
            width: clickableSize.width || "50px",
            height: clickableSize.height || "35px",
            background: "rgba(255, 255, 255, 0)", // Transparent
          }}
        >
          <div style={{ width: "100%", height: "100%" }}></div>
        </a>
      </div>
    );
  };

  return (
    <div className="relative overflow-auto bg-white flex justify-center w-full h-[39.5vw] rounded-[8px] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] bg-center bg-contain bg-no-repeat">
    {/* Background layer with opacity */}
    <div className="absolute inset-0 bg-white" style={{ opacity: 1 }}></div>
  
    {/* Content layer (foreground) */}
    <div className="relative z-10">
      <div className=" relative h-[550px] mt-[1vw] text-left">
          <img src="/sld.png" alt="Ghani Ceramics SLD" className="h-full" />
        {/* Dynamic meter rendering */}
        {Object.entries(meterMapping).map(([meterName, config]) =>
          renderMeterData(config.prefix, config)
        )}
  
        {/* WAPDA */}

          <div className="absolute left-[190px] top-[240px] text-[14px] font-bold text-[#167fe4]">
          <p> {(getValue("U_25_ACTIVE_POWER_TOTAL_KW") / 1000).toFixed(2)} kW</p>
            <p className="">
              {" "}
              {getValue("U_25_VOLTAGE_L_L_AVG_V")} V
            </p>
          <p> {getValue("U_25_CURRENT_TOTAL_A")} A</p>
          </div>
  
        {/* Solar */}
          <div className="absolute left-[420px] top-[240px] text-[14px] font-bold text-[#167fe4]">
            <p> {getValue("U_27_ACTIVE_POWER_TOTAL_KW")} kW</p>
            <p className="">
              {" "}
              {getValue("U_27_VOLTAGE_L_L_AVG_V")} V
            </p>
            <p> {getValue("U_27_CURRENT_AVG_A")} A</p>
          </div>
          {/* M1 */}
          <div className="absolute left-[90px] top-[460px] text-[14px] font-bold text-[#167fe4]">
            <p>
              {" "}
              {(getValue("U_24_ACTIVE_POWER_TOTAL_KW") / 1000).toFixed(2)} kW
            </p>
            <p className="">
              {" "}
              {getValue("U_24_VOLTAGE_L_L_AVG_V")} V
            </p>
            <p> {getValue("U_24_CURRENT_TOTAL_A")} A</p>
          </div>
          {/* M2 */}
          <div className="absolute left-[315px] top-[460px] text-[14px] font-bold text-[#167fe4]">
            <p>
              {" "}
              {getValue("G2_U20_ACTIVE_POWER_TOTAL_KW")} kW
            </p>
            <p className="">
              {" "}
              {getValue("G2_U20_VOLTAGE_L_L_AVG_V")} V
            </p>
            <p> {getValue("G2_U20_CURRENT_TOTAL_A")} A</p>
            </div>
            {/* M3 */}
          <div className="absolute left-[520px] top-[460px] text-[14px] font-bold text-[#167fe4] w-[120px]">
            <p>
              {" "}
              {getValue("G2_U20_ACTIVE_POWER_TOTAL_KW")} kW
            </p>
            <p className="">
              {" "}
              {getValue("G2_U20_VOLTAGE_L_L_AVG_V")} V
            </p>
            <p> {getValue("G2_U20_CURRENT_TOTAL_A")} A</p>
            </div>
        </div>
      </div>
    </div>
  
  );
}
