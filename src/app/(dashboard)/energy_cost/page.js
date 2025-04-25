"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import Preloader from "@/components/Preloader";

const ExamplePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeters, setSelectedMeters] = useState([]); // Array of selected meters
  const [rates, setRates] = useState(""); // State for rates input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks form submission
  const [loading, setLoading] = useState(false);

  const meters = [
    { id: "G2_U20", name: "Solar 1" },
    { id: "U_27", name: "Solar 2" },
    { id: "U_24", name: "Tranformer 1" },
    { id: "U_25", name: "Tranformer 2" },
    { id: "G1_U16", name: "Main Genset" },
    { id: "G1_U17", name: "Genset 1" },
    { id: "G1_U18", name: "Genset 2" },
    { id: "G1_U19", name: "Genset 3" },
    { id: "U_17", name: "Air Compressors-1" },
    { id: "U_5", name: "Auto Packing" },
    { id: "U_23", name: "Ball Mills-1" },
    { id: "U_15", name: "Ball Mills-2" },
    { id: "U_2", name: "Ball Mills-4" },
    { id: "U_11", name: "Belt 200 Feeding" },
    { id: "U_10", name: "Belt 300 Feeding" },
    { id: "U_7", name: "Colony D.B" },
    { id: "U_6", name: "DPM-2" },
    { id: "U_12", name: "Glaze Line-1" },
    { id: "U_4", name: "Glaze Line-2" },
    { id: "U_20", name: "Glaze Ball Mill" },
    { id: "U_9", name: "Kiln Blower Fan - (R.V.E)" },
    { id: "U_19", name: "Kiln Loading Machine" },
    { id: "U_16", name: "Laboratory" },
    { id: "U_18", name: "Light D.B # 01" },
    { id: "U_8", name: "Light D.B # 02" },
    { id: "U_22", name: "Lighting (Plant)" },
    { id: "U_3", name: "Masjid" },
    { id: "U_13", name: "Prekiln" },
    { id: "U_21", name: "Press PH4300" },
    { id: "U_14", name: "Layer Dryer" },

    { id: "G1_U2", name: "Polishing Line 5" },
    { id: "G1_U3", name: "Polishing Line 6" },
    { id: "G1_U4", name: "Glaze Ball Mill  13500L-2" },
    { id: "G1_U5", name: "Polishing Line 7" },
    { id: "G1_U6", name: "Air Compressor-2" },
    { id: "G1_U7", name: "Glaze Ball Mill 9500L-3" },
    { id: "G1_U8", name: "G1_U8" },
    { id: "G1_U10", name: "G1_U10" },
    { id: "G1_U11", name: "5 Layer Dryer" },
    { id: "G1_U12", name: "5 Layer Dryer Unloading Machine" },
    { id: "G1_U13", name: "Rental Genset" },
    { id: "G1_U14", name: "Water Treatment Area" },
    { id: "G1_U15", name: "G1_U15" },

    { id: "G2_U2", name: "Press PH  4300/1750-1" },
    { id: "G2_U3", name: "Ball Mills -3" },
    { id: "G2_U4", name: "Hard Materials" },
    { id: "G2_U7", name: "Polishing Line-1" },
    { id: "G2_U8", name: "Polishing Line-2" },
    { id: "G2_U9", name: "Fan for Spray Dryer " },
    { id: "G2_U10", name: "Slip Piston Pumps & Transfer Tank" },
    { id: "G2_U11", name: "Glaze Tank-1" },
    { id: "G2_U12", name: "Coal Stove & Coal Conveyer" },
    { id: "G2_U13", name: "ST Motor & Iron Remove " },
    { id: "G2_U14", name: "Polishing Line -3 " },
    { id: "G2_U15", name: "Polishing Line -4  " },
    { id: "G2_U16", name: "Belt 100 Feeding to BM500 " },
    { id: "G2_U17", name: "No Combustion System " },
    { id: "G2_U18", name: "Digital Printing Machine  " },
    { id: "G2_U5", name: "G2_U5 " },
    { id: "G2_U19", name: "Air Compressor 3  " },
    { id: "G2_U6", name: "Air Compressor 4  " },
  ];

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleMeterSelect = (meterId) => {
    if (selectedMeters.includes(meterId)) {
      // Deselect if already selected
      setSelectedMeters(selectedMeters.filter((id) => id !== meterId));
    } else {
      // Add new selection
      setSelectedMeters([...selectedMeters, meterId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all meters
      setSelectedMeters(meters.map((meter) => meter.id));
    } else {
      // Clear selection
      setSelectedMeters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate || selectedMeters.length === 0 || !rates) {
      alert("Please fill out all fields including rates.");
      return;
    }

    const suffix = "ACTIVE_ENERGY_IMPORT_KWH"; // Fixed suffix
    const apiUrl = `http://localhost:5000/energy-cost`;

    setLoading(true); // Show the preloader immediately

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          meterIds: selectedMeters,
          rates: rates,
          suffixes: suffix,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }

      const data = await response.json();
      console.log("Data fetched successfully:", data);

      setFetchedData(data); // Update the fetched data
      setIsSubmitted(true); // Transition to the report view
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    } finally {
      setLoading(false); // Ensure preloader is hidden
    }
  };

  if (loading) {
    return <Preloader />; // Always show the preloader while loading is true
  }
  const handleExport = () => {
    // Prepare data for Excel
    const headers = [
      "No",
      "Sources",
      "KWH",
      "Unit Price (PKR)",
      "Total Price (PKR)",
    ];
    const rows = fetchedData.map((item, index) => {
      const totalPrice = item.consumption * rates;
      return [
        index + 1,
        meters.find((meter) => meter.id === item.meterId)?.name,
        item.consumption.toFixed(2),
        rates,
        totalPrice.toFixed(2),
      ];
    });

    // Add title row and empty row
    const titleRow = ["Energy Cost Report"];
    const dataForExcel = [titleRow, [], headers, ...rows];

    // Convert to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataForExcel);

    // Merge cells for the title row
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } }, // Merge title across all columns
    ];

    // Apply styles
    const titleCellAddress = XLSX.utils.encode_cell({ r: 0, c: 0 });
    worksheet[titleCellAddress] = {
      v: "Energy Cost Report",
      s: {
        fill: { fgColor: { rgb: "0070C0" } }, // Blue background
        font: { sz: 16, bold: true, color: { rgb: "FFFFFF" } }, // White bold text
        alignment: { horizontal: "center", vertical: "center" }, // Center align
      },
    };

    // Apply styles to header cells
    headers.forEach((_, colIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 2, c: colIndex }); // Row 2 for headers
      if (!worksheet[cellAddress]) worksheet[cellAddress] = {}; // Ensure cell exists
      worksheet[cellAddress].s = {
        fill: { fgColor: { rgb: "0070C0" } }, // Blue background
        font: { color: { rgb: "FFFFFF" }, bold: true, sz: 14 }, // White bold text
        alignment: { horizontal: "center", vertical: "center" }, // Center align
      };
    });

    // Set column widths for better readability
    worksheet["!cols"] = [
      { wpx: 50 }, // Width for "No"
      { wpx: 150 }, // Width for "Sources"
      { wpx: 100 }, // Width for "KWH"
      { wpx: 120 }, // Width for "Unit Price (PKR)"
      { wpx: 150 }, // Width for "Total Price (PKR)"
    ];

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing Report");

    // Export to Excel file
    XLSX.writeFile(workbook, "Energy_Cost_Report.xlsx");
  };

  if (isSubmitted && fetchedData) {
    const grandTotal = fetchedData.reduce(
      (acc, item) => acc + item.consumption * rates,
      0
    );

    return (
      <div className="relative shadow-lg rounded-[8px] w-full h-[83vh] overflow-auto border-2 border-[grey] border-t-[4px] border-t-[#1d5998]">
        {/* Background layer with opacity */}
        {/* <div
          className="absolute inset-0 bg-white h-full"
          style={{ opacity: 1 }}
        ></div> */}

        {/* Foreground content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-700">
              Energy Cost Report
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <hr />

          {/* Invoice Section */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Invoice To:
                </h2>
                <p className="text-gray-600">Ghani Ceramics Limited</p>
                <p className="text-gray-600">
                  M3 Industrial City, Service Rd, Faisalabad, Pakistan
                </p>
                <p className="text-gray-600">Phone: 0308 5789166</p>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-700">
                  Jahaann Technologies
                </h2>
                <p className="text-gray-600">
                  22-C Block, G.E.C.H.S, Phase 3 Peco Road, Lahore, Pakistan
                </p>
                <p className="text-gray-600">Phone: +924235949261</p>
              </div>
            </div>
          </div>

          <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-green-500 to-red-500 my-4"></div>

          {/* Export + Date Range Section */}
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Export
              </button>
              <div className="text-right">
                <h2 className="text-lg font-bold text-blue-700">
                  Billing Report
                </h2>
                <div className="text-gray-600 mt-2">
                  <p>Start Date: {startDate}</p>
                  <p>End Date: {endDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-center text-sm font-semibold text-gray-700">
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Sources</th>
                  <th className="border border-gray-300 px-4 py-2">KWH</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Unit Price (PKR)
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Total Price (PKR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.map((item, index) => {
                  const totalPrice = item.consumption * rates;
                  return (
                    <tr
                      key={index}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white font-semibold">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {
                          meters.find((meter) => meter.id === item.meterId)
                            ?.name
                        }
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {item.consumption.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                        {rates}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-[#3989c6] text-white font-semibold">
                        {totalPrice.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grand Total */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-lg font-bold text-white bg-[#3989c6] p-4 rounded-md">
              <span>GRAND TOTAL</span>
              <span>
                {fetchedData
                  .reduce((acc, item) => acc + item.consumption * rates, 0)
                  .toFixed(2)}{" "}
                PKR
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="border-l-4 border-[#3a8ac5] mb-2 pl-2">
              Thank you very much for doing business with us. We look forward to
              working with you again.
            </p>
            <div className="flex justify-between mt-4 border-t pt-4 bg-[#e6e4e4] p-4">
              <p>
                Generated on: {new Date().toLocaleTimeString()}, Date:{" "}
                {new Date().toISOString().split("T")[0]}
              </p>
              <p>Generated By: Jahaann Technologies </p>
              <p>Email: info@jahaann.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="energy-cost-report"
      className="relative shadow-lg rounded-[8px] w-full h-full border-2 border-[grey] border-t-[4px] border-t-[#1d5998] overflow-hidden"
      style={{ minHeight: "83vh" }}
    >
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-white"
        style={{ opacity: 1 }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10 p-6">
        <h1 className="text-lg font-bold text-gray-700 mb-4">
          Energy Cost Report
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469]">
              Title
            </label>
            <input
              type="text"
              value="Energy Cost Report"
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              style={{
                boxShadow: "rgba(98, 100, 105, 0.2) 0px 1px 3px 0px inset",
              }}
            />
          </div>

          {/* Sources Input */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469] mb-2">
              Sources
            </label>
            <button
              type="button"
              onClick={toggleModal}
              className="relative w-full p-2 rounded-lg text-[14px] font-bold text-white overflow-hidden border-2"
              style={{
                background: "linear-gradient(145deg, #43C6F4, #1A7EC7)",
                borderColor: "#A0EFFF",
                color: "#EFFFFF",
                boxShadow: `
      0 0 15px rgba(80, 230, 255, 0.6),
      inset 0 0 10px rgba(255, 255, 255, 0.2)
    `,
                textShadow: "0 0 5px rgba(255, 255, 255, 0.6)",
              }}
            >
              {/* Text layer */}
              <span className="relative z-10">
                {selectedMeters.length > 0
                  ? `Selected: ${selectedMeters.length} Meters`
                  : "Select Sources"}
              </span>
            </button>

            {selectedMeters.length > 0 && (
              <div className="mt-2">
                <label className="block text-[13px] font-bold text-[#626469]">
                  Selected Sources
                </label>
                <input
                  type="text"
                  value={selectedMeters
                    .map((id) => meters.find((meter) => meter.id === id)?.name)
                    .join(", ")}
                  readOnly
                  className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
                />
              </div>
            )}
          </div>

          {/* Rates Input */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469]">
              Rates
            </label>
            <input
              type="number"
              step="0.01"
              value={rates}
              onChange={(e) => setRates(e.target.value)}
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              placeholder="0.0"
              required
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469]">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              onFocus={(e) => e.target.showPicker()}
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              max={endDate}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-[13px] font-bold text-[#626469]">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              onFocus={(e) => e.target.showPicker()}
              className="w-full p-2 border border-[#9f9fa3] rounded-md text-gray-700"
              min={startDate}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-[240px] h-[35px] block font-sans text-[16px] font-bold text-white no-underline uppercase text-center  
             pt-[4px] mt-[10px] ml-[5px] relative cursor-pointer border-none rounded-[5px] 
             bg-[#1784d9] bg-gradient-to-b from-[#1784d9] to-[#389de9] 
             shadow-[inset_0px_1px_0px_#2ab7ec,_0px_5px_0px_#497a78,_0px_10px_5px_#999]"
            >
              {loading ? "Loading..." : "GENERATE REPORT"}
            </button>
          </div>
        </form>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] p-4">
              <div className="bg-blue-200 p-2 rounded-t-lg">
                <h2 className="text-sm font-bold text-gray-700">
                  Select Sources
                </h2>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {/* Select All Checkbox */}
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMeters.length === meters.length}
                      onChange={handleSelectAll}
                      className="form-checkbox rounded"
                    />
                    <span className="ml-2">Select All</span>
                  </label>
                </div>
                {/* Individual Checkboxes */}
                {meters.map((meter) => (
                  <div key={meter.id} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMeters.includes(meter.id)}
                        onChange={() => handleMeterSelect(meter.id)}
                        className="form-checkbox rounded"
                      />
                      <span className="ml-2">{meter.name}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end p-2 space-x-4">
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  OK
                </button>
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamplePage;
