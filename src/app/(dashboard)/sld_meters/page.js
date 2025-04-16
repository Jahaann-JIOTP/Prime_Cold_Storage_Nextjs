"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const [currentTitle, setCurrentTitle] = useState("");
  const [meterData, setMeterData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("volts");
  const [link, setLink] = useState("");

  const meter = searchParams.get("meter") || "Unknown";
  const id = searchParams.get("id") || "Default_ID";

  // Dynamically generate the href for the current tab
  const getHrefForAction = () =>
    `/Logs?type=${activeTab}&&id=${id}&&meter=${meter}`;

  // Set the title based on the meter
  useEffect(() => {
    const meterTitles = {
      G2_U20: "Solar 1",
      G1_U16: "Main Genset",
      U_24: " Trafo1",
      U_25: "Trafo2",
      U_2: "Ball Mill 4",
      U_3: "Masjid",
      U_4: " glaze line 2",
      U_5: "Sorting & Packing Line",
      U_6: "Digital Printing Machine",
      U_7: "Colony D.B",
      U_8: "Light D.B # 02",
      U_9: "Kiln Blower Fan - (R.V.E)",
      U_10: "Belt 300 Feeding to Press PH4300",
      U_11: "Belt 200 Feeding to Silo",
      U_12: "Glaze Line 1",
      U_13: "Perklin + Kiln",
      U_14: "Layer Dryer",
      U_15: "Spare 01",
      U_16: "Laboratory",
      U_17: "Air Compressor 1",
      U_18: "Light D.B 1",
      U_19: "Kiln Loading Machine with Compensation",
      U_20: "Glaze Ball Mill 13500L-2/9500L-1",
      U_21: "Press PH 4300/1750-2",
      U_22: "Lightning Plant",
      U_23: "Ball Mill 1",
      G1_U2: "Polishing Line 5",
      G1_U3: " Polishing Line 6",
      G1_U4: "Glaze Ball Mill 13500L-2",
      G1_U5: "Polishing Line 7",
      G1_U6: "Air Compressor 2",
      G1_U7: "Glaze Ball Mill 9500L-3",
      G1_U8: "Spare 02",
      G1_U10: "Spare 04",
      G1_U11: "5 Layer Dryer",
      G1_U12: "5 Layer Dryer Unloading Machine",
      G1_U13: "Rental Genset",
      G1_U14: "Water Treatment Area",
      G1_U15: "Spare 05",
      // G1_U16: "Spare 06",
      
      
     
    
      G2_U2: "Press PH 4300/1750-1",
      G2_U3: "Ball Mills 03",
      G2_U4: "Hard Material",
      G2_U7: "Polishing Line 1",
      G2_U8: "Polishing Line 2",
      G2_U9: "Fan for Spray Dryer",
      G2_U10: "Slip Piston Pumps & Transfer Tanks",
      G2_U12: "Coal Stove & Coal Conveyor",
      G2_U13: "ST Motor & Iron Remove",
      G2_U14: "Polishing Line 3",
      G2_U11: "Gaze Tank-1",
      G2_U15: "Polishing Line 4",
      G2_U16: "Belt 100 Feeding to BM500",
      G2_U17: "No Combustion System*",
      G2_U18: "Digital Printing Machine",
      G2_U5: "Spare 07",
      G2_U19: "Air Compressor 3",
      G2_U6: "Air Compressor 4",
      G1_U16: "Main Genset",
    };
    setCurrentTitle(meterTitles[meter] || "Unknown Meter");
  }, [meter]);

  // Fetch data from the backend
  useEffect(() => {
    if (!link) return;

    const fetchData = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.authorized && data.meter) {
          setMeterData(data.meter);
          setError(null);
        } else {
          setMeterData(null);
          setError("No data available for this meter.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMeterData(null);
        setError("Failed to fetch meter data.");
      }
    };

    // Fetch data initially and refresh every 5 seconds
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [link]);

  // Update the API endpoint link when the meter changes
  useEffect(() => {
    setLink(`http://15.206.128.214/Test_Api/volts_data.php?meter=${meter}`);
  }, [meter]);
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    if (tab === "volts") {
      setLink(`http://15.206.128.214/Test_Api/volts_data.php?meter=${meter}`);
    } else if (tab === "power") {
      setLink(`http://15.206.128.214/Test_Api/power_data.php?meter=${meter}`);
    } else if (tab === "energy") {
      setLink(`http://15.206.128.214/Test_Api/energy_data.php?meter=${meter}`);
    } else {
      setLink(""); // Handle other cases if needed
    }
  };

  // Render the tags with their respective positions and data
  const renderTagsWithPosition = () => {
    if (!meterData) return null;

    const tagPositions =
      activeTab === "volts"
        ? {
            VOLTAGE_LINE_3_1_V: { left: "62pt", top: "157pt", unit: "V ca" },
            VOLTAGE_LINE_2_3_V: { left: "168pt", top: "118pt", unit: "V bc" },
            VOLTAGE_LINE_1_2_V: { left: "170pt", top: "188pt", unit: "V ab" },
            VOLTAGE_L_L_AVG_V: { left: "165pt", top: "372pt", unit: "V" },
            VOLTAGE_LINE_1_V: { left: "522pt", top: "316pt", unit: "V AN" },
            VOLTAGE_LINE_2_V: { left: "622pt", top: "316pt", unit: "V BN" },
            VOLTAGE_LINE_3_V: { left: "724pt", top: "316pt", unit: "V CN" },
            VOLTAGE_L_N_AVG_V: { left: "838pt", top: "341pt", unit: "V" },
            CURRENT_LINE_1_A: { left: "270pt", top: "70pt", unit: "A c" },
            CURRENT_LINE_2_A: { left: "270pt", top: "153pt", unit: "A b" },
            CURRENT_LINE_3_A: { left: "270pt", top: "230pt", unit: "A a" },
            // CURRENT_TOTAL_A: { left: "270pt", top: "330pt", unit: "A " },
           
                  CURRENT_TOTAL_A: { left: "270pt", top: "330pt", unit: "A " },
              
            ACTIVE_POWER_P1_KW: { left: "400pt", top: "70pt", unit: "kW c" },
            ACTIVE_POWER_P2_KW: { left: "400pt", top: "153pt", unit: "kW b" },
            ACTIVE_POWER_P3_KW: { left: "400pt", top: "230pt", unit: "kW a" },
            ACTIVE_POWER_TOTAL_KW: { left: "398pt", top: "280pt", unit: "kW" },
            REACTIVE_POWER_TOTAL_KVAR: {
              left: "400pt",
              top: "330pt",
              unit: "kVAR",
            },
            APPARENT_POWER_TOTAL_KVA: {
              left: "400pt",
              top: "372pt",
              unit: "kVA",
            },
            FREQUENCY_F: { left: "835pt", top: "125pt", unit: "Hz" },
            POWER_FACTOR_TOTAL: { left: "830pt", top: "170pt", unit: "" },
            POWER_FACTOR_PF1: { left: "830pt", top: "213pt", unit: "" },
            POWER_FACTOR_PF2: { left: "830pt", top: "255pt", unit: "" },
            POWER_FACTOR_PF3: { left: "830pt", top: "298pt", unit: "" },
          }
        : activeTab === "power"
        ? {
            HARMONICS_I1_THD: { left: "130pt", top: "195pt" },
            HARMONICS_I2_THD: { left: "130pt", top: "255pt" },
            HARMONICS_I3_THD: { left: "130pt", top: "314pt" },
            HARMONICS_V1_THD: { left: "390pt", top: "195pt" },
            HARMONICS_V2_THD: { left: "390pt", top: "255pt" },
            HARMONICS_V3_THD: { left: "390pt", top: "310pt" },
            ACTIVE_POWER_P1_KW: { left: "630pt", top: "197pt" },
            ACTIVE_POWER_P2_KW: { left: "630pt", top: "257pt" },
            ACTIVE_POWER_P3_KW: { left: "630pt", top: "317pt" },
            ACTIVE_POWER_TOTAL_KW: { left: "630pt", top: "377pt" },
            REACTIVE_POWER_Q1_KVAR: { left: "740pt", top: "197pt" },
            REACTIVE_POWER_Q2_KVAR: { left: "740pt", top: "257pt" },
            REACTIVE_POWER_Q3_KVAR: { left: "740pt", top: "317pt" },
            REACTIVE_POWER_TOTAL_KVAR: { left: "740pt", top: "377pt" },
            APPARENT_POWER_S1_KVA: { left: "860pt", top: "197pt" },
            APPARENT_POWER_S2_KVA: { left: "860pt", top: "257pt" },
            APPARENT_POWER_S3_KVA: { left: "860pt", top: "317pt" },
            APPARENT_POWER_TOTAL_KVA: { left: "860pt", top: "377pt" },
          }
        : {
          ACTIVE_ENERGY_IMPORT_KWH: { left: "292pt", top: "145pt" },
          ACTIVE_ENERGY_EXPORT_KWH: { left: "292pt", top: "210pt" },

          REACTIVE_ENERGY_IMPORT_KVARH: { left: "460pt", top: "145pt" },
          REACTIVE_ENERGY_EXPORT_KVARH: { left: "460pt", top: "210pt" },
         
          APPARENT_ENERGY_IMPORT_KVAH: { left: "630pt", top: "145pt" },
          APPARENT_ENERGY_EXPORT_KVAH: { left: "630pt", top: "210pt" },
           
            

            // //ye tags nai ha that is used to showing N/A
            ActiveEnergy_DelmRec_Wh: { left: "280pt", top: "275pt" },
            ReactiveEnergy_DelmRec_VARh: { left: "450pt", top: "275pt" },
            ApparentEnergy_DelmRec_VAh: { left: "620pt", top: "275pt" },
            ActiveEnergy_DelpRec_Wh: { left: "280pt", top: "335pt" },
            ReactiveEnergy_DelpRec_VARh: { left: "450pt", top: "335pt" },
            ApparentEnergy_DelpRec_VAh: { left: "620pt", top: "335pt" },
            // ACTIVE_ENERGY1_EXPORT_KWH: { left: "292pt", top: "210pt" },
            // APPARENT1_ENERGY_EXPORT_KVAH: { left: "630pt", top: "210pt" },
            // REACTIVE1_ENERGY_EXPORT_KVARH: { left: "460pt", top: "210pt" },
          };

    return Object.entries(tagPositions).map(([tag, position]) => {
      const value = meterData[tag] ?? "N/A";
      return (
        <div
          key={tag}
          style={{
            position: "absolute",
            left: position.left,
            top: position.top,
            fontWeight: "bold",
            color: "#000",
            fontSize: "12px",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
        >
          <p>
            {value} <b>{position.unit}</b>
          </p>
        </div>
      );
    });
  };

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-2xl font-bold mb-4">{currentTitle}</h1>

      <div className="relative w-[1500px] h-[600px]">
        <img
          src={
            activeTab === "volts"
              ? "01_volts.png"
              : activeTab === "power"
              ? "Power_1.png"
              : "Energy_log1.png"
          }
          alt={activeTab}
          useMap="#workmap"
        />
        <Link href="/sld">
          <img
            src="back.jpg"
            className="absolute top-[41px] left-[1056px] h-[57px] border-transparent rounded-3xl"
          />
        </Link>
        {/* Unified Map */}
        <map name="workmap">
          {/* Tab Switching Areas */}
          <area
            shape="rect"
            coords="3,2,227,70"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("volts")}
          />
          <area
            shape="rect"
            coords="228,2,450,70"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("power")}
          />
          <area
            shape="rect"
            coords="451,2,700,59"
            style={{ cursor: "pointer" }}
            onClick={() => handleTabSwitch("energy")}
          />

          {/* Action Area for Current Tab */}
          <area
            shape="rect"
            coords="180,400,30,639"
            href={getHrefForAction()} // Dynamically set URL based on activeTab
            style={{ cursor: "pointer" }}
          />
        </map>
        {renderTagsWithPosition()}
        {error && <p className="mt-5 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

const MainPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};

export default MainPage;
