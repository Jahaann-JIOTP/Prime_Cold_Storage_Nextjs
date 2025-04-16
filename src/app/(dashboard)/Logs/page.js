"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const MeterDataComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allowedTypes = ["volts", "power", "energy"];
  const [type, setType] = useState(() => {
    const queryType = searchParams.get("type") || "volts";
    return allowedTypes.includes(queryType) ? queryType : "volts";
  });

  // Retrieve meter and id from URL or sessionStorage
  const meterFromStorage = sessionStorage.getItem("meter");
  const idFromStorage = sessionStorage.getItem("id");

  const meter = searchParams.get("meter") || meterFromStorage || "Unknown";
  const id = searchParams.get("id") || idFromStorage || "Unknown";

  // Store meter and id in sessionStorage
  useEffect(() => {
    if (meter !== "Unknown") {
      sessionStorage.setItem("meter", meter);
    }
    if (id !== "Unknown") {
      sessionStorage.setItem("id", id);
    }
  }, [meter, id]);

  // Allowed meters
  const allowedMeters = {
    G2_U20:"Solar 1",
    G1_U16: "Main Genset",
        U_27: "Solar 2",
        U_24: " Trafo1",
        U_25:"Trafo2",
        U_2:"Ball Mill 4",
        U_3:"Masjid",
        U_4:" glaze line 2",
        U_5:"Sorting & Packing Line",
       U_6:"Digital Printing Machine",
        U_7:"Colony D.B",
        U_8:"Light D.B # 02",
        U_9:"Kiln Blower Fan - (R.V.E)",
        U_10:"Belt 300 Feeding to Press PH4300",
        U_11:"Belt 200 Feeding to Silo",
        U_12:"Glaze Line 1",
        U_13:"Perklin + Kiln",
        U_14:"Layer Dryer",
        U_15:"Spare 01",
        U_16:"Laboratory",
        U_17:"Air Compressor 1",
        U_18:"Light D.B 1",
        U_19:"Kiln Loading Machine with Compensation",
        U_20:"Glaze Ball Mill 13500L-2/9500L-1",
        U_21:"Press PH 4300/1750-2",
        U_22:"Lightning Plant",
        U_23:"Ball Mill 1",
        G1_U2:"Polishing Line 5",
        G1_U3:" Polishing Line 6",
        G1_U4:"Glaze Ball Mill 13500L-2",
        G1_U5: "Polishing Line 7",
        G1_U6:"Air Compressor 2",
        G1_U7:"Glaze Ball Mill 9500L-3",
        G1_U8:"Spare 02",
        G1_U10:"Spare 04",
        G1_U11:"5 Layer Dryer",
        G1_U12:"5 Layer Dryer Unloading Machine",
        G1_U13:"Rental Genset",
        G1_U14:"Water Treatment Area",
        G1_U15:"Spare 05",
        G1_U16: "Main Genset",
        G1_U17: "Genset 1",
        G1_U18: "Genset 2",
        G1_U19: "Genset 3",
        G2_U2:"Press PH 4300/1750-1",
        G2_U3:"Ball Mills 03",
        G2_U4:"Hard Material",
        G2_U7:"Polishing Line 1",
        G2_U8:"Polishing Line 2",
        G2_U9:"Fan for Spray Dryer",
        G2_U10:"Slip Piston Pumps & Transfer Tanks",
        G2_U12:"Coal Stove & Coal Conveyor",
        G2_U13:"ST Motor & Iron Remove",
        G2_U14:"Polishing Line 3",
        G2_U11:"Gaze Tank-1",
        G2_U15:"Polishing Line 4",
        G2_U16:"Belt 100 Feeding to BM500",
        G2_U17:"No Combustion System*",
        G2_U18:"Digital Printing Machine",
        G2_U5:"Spare 07",
        G2_U19:"Air Compressor 3",
        G2_U6:"Air Compressor 4",
  };

  const isValidMeter = allowedMeters.hasOwnProperty(meter);

  const getImageSrc = () => {
    switch (type) {
      case "volts":
        return "Log.png";
      case "power":
        return "harmonics.png";
      case "energy":
        return "Log_2.png";
      default:
        return "";
    }
  };

  const getMapAreas = () => {
    switch (type) {
      case "volts":
        return [
          { coords: "690,280,790,200", href: `/log_detail?meter=${meter}&val=volt&type=volts` },
          { coords: "690,330,790,410", href: `/log_detail?meter=${meter}&val=current&type=current` },
          { coords: "690,550,790,470", href: `/log_detail?meter=${meter}&val=power_factor&type=power_factor` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      case "power":
        return [
          { coords: "690,220,810,150", href: `/log_detail?meter=${meter}&val=active_power&type=active_power` },
          { coords: "690,240,790,310", href: `/log_detail?meter=${meter}&val=reactive_power&type=reactive_power` },
          { coords: "690,440,790,370", href: `/log_detail?meter=${meter}&val=apparent_power&type=apparent_power` },
          { coords: "690,600,790,460", href: `/log_detail?meter=${meter}&val=harmonics&type=harmonics` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      case "energy":
        return [
          { coords: "690,280,790,200", href: `/log_detail?meter=${meter}&val=active_energy&type=active_energy` },
          { coords: "690,420,790,350", href: `/log_detail?meter=${meter}&val=reactive_energy&type=reactive_energy` },
          { coords: "690,580,790,480", href: `/log_detail?meter=${meter}&val=apparent_energy&type=apparent_energy` },
          { coords: "1000,100,1250,35", href: `/sld_meters?id=${id}&meter=${meter}` },
        ];
      default:
        return [];
    }
  };

  if (!isValidMeter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Invalid Meter: {meter}</h1>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#fff] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-2xl font-extrabold text-gray-700 mb-4">Logs</h1>

      <div
        className="relative overflow-x-auto overflow-y-hidden rounded"
        style={{ maxWidth: "1350px", maxHeight: "700px" }}
      >
        <img
          src={getImageSrc()}
          alt={`${type} Diagram`}
          useMap="#workmap"
          className="min-w-[1300px] h-[640px]" // Ensure the width is larger than the container for scrolling
        />

        <map name="workmap">
          {getMapAreas().map((area, index) => (
            <area
              key={index}
              shape="rect"
              coords={area.coords}
              href={area.href}
              onClick={(e) => {
                e.preventDefault();
                const newType = area.href.split("type=")[1];
                if (allowedTypes.includes(newType)) {
                  setType(newType);
                }
                router.push(area.href);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </map>
      </div>
    </div>
  );
};


const LogsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MeterDataComponent />
    </Suspense>
  );
};


export default LogsPage;