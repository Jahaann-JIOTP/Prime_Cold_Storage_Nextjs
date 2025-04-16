"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const meterMapping = {
    "Solar 1": "G2_U20",
    "Solar 2": "U_27",
    "Tranformer 1": "U_24",
    "Tranformer 2": "U_25",
    "Main Genset": "G1_U16",
    "Genset 1": "G1_U17",
    "Genset 2": "G1_U18",
    "Genset 3": "G1_U19",
    "Air Compressors-1": "U_17",
    "Auto Packing": "U_5",
    "Ball Mills-1": "U_23",
    "Ball Mills-2": "U_15",
    "Ball Mills-4": "U_2",
    "Belt 200 Feeding": "U_11",
    "Belt 300 Feeding": "U_10",
    "Colony D.B": "U_7",
    "DPM-2": "U_6",
    "Glaze Line-1": "U_12",
    "Glaze Line-2": "U_4",
    "Glaze Ball Mill": "U_20",
    "Kiln Blower Fan - (R.V.E)": "U_9",
    "Kiln Loading Machine": "U_19",
    "Laboratory": "U_16",
    "Light D.B # 01": "U_18",
    "Light D.B # 02": "U_8",
    "Lighting (Plant)": "U_22",
    "Masjid": "U_3",
    "Prekiln": "U_13",
    "Press PH4300": "U_21",
    "Layer Dryer": "U_14",
    "Polishing Line 5": "G1_U2",
    "Polishing Line 6": "G1_U3",
    "Glaze Ball Mill  13500L-2": "G1_U4",
    "Polishing Line 7": "G1_U5",
    "Air Compressor-2": "G1_U6",
    "Glaze Ball Mill 9500L-3": "G1_U7",
    "G1_U8": "G1_U8",
    "G1_U10": "G1_U10",
    "5 Layer Dryer": "G1_U11",
    "5 Layer Dryer Unloading Machine": "G1_U12",
    "Rental Genset": "G1_U13",
    "Water Treatment Area": "G1_U14",
    "G1_U15": "G1_U15",
    "G1_U16": "G1_U16",
    "Press PH  4300/1750-1": "G2_U2",
    "Ball Mills -3": "G2_U3",
    "Hard Materials": "G2_U4",
    "Polishing Line-1": "G2_U7",
    "Polishing Line-2": "G2_U8",
    "Fan for Spray Dryer ": "G2_U9",
    "Slip Piston Pumps & Transfer Tank": "G2_U10",
    "Glaze Tank-1": "G2_U11",
    "Coal Stove & Coal Conveyer ": "G2_U12",
    "ST Motor & Iron Remove ": "G2_U13",
    "Polishing Line -3 ": "G2_U14",
    "Polishing Line -4  ": "G2_U15",
    "Belt 100 Feeding to BM500 ": "G2_U16",
    "No Combustion System ": "G2_U17",
    "Digital Printing Machine  ": "G2_U18",
    "G2_U5 ": "G2_U5",
    "Air Compressor 3  ": "G2_U19",
    "Air Compressor 4  ": "G2_U6",
};

function Status_table() {
  const [meterData, setMeterData] = useState([]);

  const fetchData = () => {
      axios
        .get('http://13.234.241.103:1880/latestgcl1')
        .then((response) => {
          const apiData = response.data;
          const tableData = Object.keys(meterMapping).map((meterName, index) => {
            const tag = meterMapping[meterName];
            
            // Fetch and round values to 2 decimal places
            const current = parseFloat((apiData[`${tag}_CURRENT_TOTAL_A`] || 0).toFixed(2));
            const voltage = parseFloat((apiData[`${tag}_VOLTAGE_L_L_AVG_V`] || 0).toFixed(2));
            let power = parseFloat((apiData[`${tag}_ACTIVE_POWER_TOTAL_KW`] || 0).toFixed(2));
    
            // Divide power by 1000 for Transformer 1 and Transformer 2
            if (meterName === "Tranformer 1" || meterName === "Tranformer 2") {
              power = parseFloat((power / 1000).toFixed(2));
            }
    
            return {
              id: index + 1,
              source: meterName,
              current,
              voltage,
              power,
              status: calculateStatus(current, voltage, power),
            };
          });
          setMeterData(tableData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set interval to refresh data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const calculateStatus = (current, voltage, power) => {
    if (current === 0 && voltage === 0 && power === 0) {
      return 'red'; // All tags are 0
    }
    if (current === 0 || power === 0) {
      return 'yellow'; // Current and power are 0
    }
    return 'green'; // Default to green
  };

  return (
      <div className="relative flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] border-2 border-[grey] border-t-[4px] border-t-[#1d5999]">
        <div className="absolute inset-0 bg-[#f2f2f2]" style={{ opacity: 0.5 }}></div>
      <h1 className="text-lg font-bold text-gray-700 mb-4 relative z-10">Meters Indication</h1>
      <div className="h-[95%]  overflow-x-auto relative z-10">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-3 text-left font-medium">No.</th>
              <th className="px-4 py-3 text-left font-medium">Sources</th>
              <th className="px-4 py-3 text-center font-medium">Current Avg (A)</th>
              <th className="px-4 py-3 text-center font-medium">Voltage L-L Avg (V)</th>
              <th className="px-4 py-3 text-center font-medium">Real Power (kW)</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {meterData.map((meter, index) => (
              <tr
                key={meter.id}
                className={`text-sm ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-3">{meter.id}</td>
                <td className="px-4 py-3">{meter.source}</td>
                <td className="px-4 py-3 text-center">{meter.current}</td>
                <td className="px-4 py-3 text-center">{meter.voltage}</td>
                <td className="px-4 py-3 text-center">{meter.power}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      meter.status === 'green'
                        ? 'bg-green-500'
                        : meter.status === 'yellow'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Status_table;

  
 
