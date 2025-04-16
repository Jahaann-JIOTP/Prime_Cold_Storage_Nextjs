"use client";
import React, { useState } from 'react';

function ChartOptionsPopup({ closePopup, applyChartConfig, chartType }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#4CAF50');
  const [selectedMeter, setSelectedMeter] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodOption, setPeriodOption] = useState('');
  const [showMeters, setShowMeters] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const meters = [
    "Solar 1",
    "Solar 2",
    "Tranformer 1",
    "Tranformer 2",
    "Air Compressors-1",
    "Auto Packing",
    "Ball Mills-1",
    "Ball Mills-2",
    "Ball Mills-4",
    "Belt 200 Feeding",
    "Belt 300 Feeding",
    "Colony D.B",
    "DPM-2",
    "Glaze Line-1",
    "Glaze Line-2",
    "Glaze Ball Mill",
    "Kiln Blower Fan - (R.V.E)",
    "Kiln Loading Machine",
    "Laboratory",
    "Light D.B # 01",
    "Light D.B # 02",
    "Lighting (Plant)",
    "Masjid",
    "Prekiln",
    "Press PH4300",
    "Layer Dryer",
    "Polishing Line 5",
    "Polishing Line 6",
    "Glaze Ball Mill  13500L-2",
    "Polishing Line 7",
    "Air Compressor-2",
    "Glaze Ball Mill 9500L-3",
    "G1_U8",
    "G1_U10",
    "5 Layer Dryer",
    "5 Layer Dryer Unloading Machine",
    "Rental Genset",
    "Water Treatment Area",
    "G1_U15",
    "G1_U16",
    "Press PH  4300/1750-1",
    "Ball Mills -3",
    "Hard Materials",
    "Polishing Line-1",
    "Polishing Line-2",
    "Fan for Spray Dryer",
    "Slip Piston Pumps & Transfer Tank",
    "Glaze Tank-1",
    "Coal Stove & Coal Conveyer",
    "ST Motor & Iron Remove",
    "Polishing Line -3",
    "Polishing Line -4",
    "Belt 100 Feeding to BM500",
    "No Combustion System",
    "Digital Printing Machine",
    "G2_U5",
    "Air Compressor 3",
    "Air Compressor 4"
];

  let parameters;
  const periodOptions = ['Today over Yesterday', 'This Week over Last Week', 'This Month over Last Month'];

  let meterMapping;
  let parameterMapping;
  meterMapping = {
    "Solar 1": "G2_U20",
    "Solar 2": "U_27",
    "Tranformer 1": "U_24",
    "Tranformer 2": "U_25",
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
  if (chartType === "pie" || chartType === "bar" || chartType === "groupedBar") {
    parameters = ['Consumption'];
    parameterMapping = {
      "Consumption": "ACTIVE_ENERGY_IMPORT_KWH",
      // "Current": "CURRENT_TOTAL_A",
      // "Power": "POWER_TOTAL_A",
      // "Power Factor": "POWER_FACTOR_TOTAL_A",
    };
  } else {
    parameters = [
      "Consumption",
    "Active Power A",
    "Active Power B",
    "Active Power C",
    "Active Power Total",
    "Current A",
    "Current B",
    "Current C",
    "Current Total",
    "Frequency",
    "Power Factor A",
    "Power Factor B",
    "Power Factor C",
    "Power Factor Total",
    "Reactive Power A",
    "Reactive Power B",
    "Reactive Power Total",
    "Voltage A",
    "Voltage B",
    "Voltage C",
    "Voltage LN",
    "Voltage AB",
    "Voltage BC",
    "Voltage CA",
    "Voltage LL"
    ];
    parameterMapping = {
      "Consumption": "ACTIVE_ENERGY_IMPORT_KWH",
      "Active Power A": "ACTIVE_POWER_P1_KW",
      "Active Power B": "ACTIVE_POWER_P2_KW",
      "Active Power C": "ACTIVE_POWER_P3_KW",
      "Active Power Total": "ACTIVE_POWER_TOTAL_KW",
      "Current A": "CURRENT_LINE_1_A",
      "Current B": "CURRENT_LINE_2_A",
      "Current C": "CURRENT_LINE_3_A",
      "Current Total": "CURRENT_TOTAL_A",
      "Frequency": "FREQUENCY_F",
      "Power Factor A": "POWER_FACTOR_PF1",
      "Power Factor B": "POWER_FACTOR_PF2",
      "Power Factor C": "POWER_FACTOR_PF3",
      "Power Factor Total": "POWER_FACTOR_TOTAL",
      "Reactive Power A": "REACTIVE_POWER_Q1_KVAR",
      "Reactive Power B": "REACTIVE_POWER_Q2_KVAR",
      "Reactive Power Total": "REACTIVE_POWER_TOTAL_KVAR",
      "Voltage A": "VOLTAGE_LINE_1_V",
      "Voltage B": "VOLTAGE_LINE_2_V",
      "Voltage C": "VOLTAGE_LINE_3_V",
      "Voltage LN": "VOLTAGE_L_N_AVG_V",
      "Voltage AB": "VOLTAGE_LINE_1_2_V",
      "Voltage BC": "VOLTAGE_LINE_2_3_V",
      "Voltage CA": "VOLTAGE_LINE_3_1_V",
      "Voltage LL": "VOLTAGE_L_L_AVG_V",
    };
  }

  const handleMeterChange = (e) => {
    const meter = e.target.value;
    setSelectedMeter(prev =>
      prev.includes(meter) ? prev.filter(m => m !== meter) : [...prev, meter]
    );
  };

  const handleParameterChange = (e) => {
    setSelectedParameter(e.target.value);
  };

  const applyChart = () => {
    const chartConfig = {
      title,
      color,
      chartType,
      selectedMeter: selectedMeter.map(meter => meterMapping[meter]),
      selectedParameter: parameterMapping[selectedParameter],
      startDate,
      endDate,
      periodOption,
    };

    applyChartConfig(chartConfig);
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-lg relative">
        <h2 className="text-center text-gray-700 font-semibold mb-4">Select Options for Chart</h2>

        {/* Title and color picker */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Title..."
            className="border border-gray-300 rounded p-2 w-full mb-2 text-black"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-10 p-1 rounded"
          />
        </div>

        {/* Meters and Parameters dropdowns side by side */}
        <div className="flex justify-between gap-4 mb-4">
          {/* Meters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Meters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowMeters(true)}
              onMouseLeave={() => setShowMeters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedMeter.length > 0 ? selectedMeter.join(', ') : 'Select Meters'}
                <span className='text-[13px]'>{showMeters ? '△' : '▽'}</span>
              </button>
              {showMeters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10 h-[300px] overflow-auto">
                  {meters.map((meter) => (
                    <label key={meter} className="block p-2 hover:bg-gray-100">
                      <input
                        type={`${chartType === "groupedBar" ? "radio" : "checkbox"}`}
                        value={meter}
                        checked={selectedMeter.includes(meter)}
                        onChange={(e) => {
                          if (chartType === "groupedBar") {
                            // Only allow one meter to be selected for groupedBar charts
                            setSelectedMeter([meter]);
                          } else {
                            // Toggle selection for checkboxes
                            handleMeterChange(e);
                          }
                        }}
                      />
                      {meter}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Parameters Dropdown */}
          <div className="w-1/2">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Parameters</h3>
            <div
              className="border border-gray-300 rounded p-2 w-full text-black relative"
              onMouseEnter={() => setShowParameters(true)}
              onMouseLeave={() => setShowParameters(false)}
            >
              <button className="w-full text-left flex items-center justify-between">
                {selectedParameter || 'Select Parameter'}
                <span className='text-[13px]'>{showParameters ? '△' : '▽'}</span>
              </button>
              {showParameters && (
                <div className="absolute top-full left-0 w-full bg-white border mt-0 z-10 max-h-[300px] overflow-auto">
                  {parameters.map((param) => (
                    <label key={param} className="block p-2 hover:bg-gray-100">
                      <input
                        type="radio"
                        name="parameter"
                        value={param}
                        checked={selectedParameter === param}
                        onChange={handleParameterChange}
                      />
                      {param}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show period options for groupedBar chart only */}
        {chartType === "groupedBar" ? (
          <div className="mb-4">
            <h3 className="text-gray-600 font-semibold text-sm mb-2">Select Period Comparison</h3>
            <select
              className="border border-gray-300 rounded p-2 w-full text-black"
              onChange={(e) => setPeriodOption(e.target.value)}
              value={periodOption}
            >
              <option value="">Select a Period</option>
              {periodOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ) : (
          // Start and End Date Pickers for other charts
          <div className="flex justify-between gap-4 mb-4">
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">Start Date</h3>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
            <div className="w-1/2">
              <h3 className="text-gray-600 font-semibold text-sm mb-2">End Date</h3>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
          </div>
        )}

        <button
          onClick={applyChart}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded mt-2 hover:bg-blue-600"
        >
          OK
        </button>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ChartOptionsPopup;
