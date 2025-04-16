"use client";

import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function DashboardPage() {
  const today = new Date();
  const [range, setRange] = useState({ from: today, to: today });
  const [unit, setUnit] = useState("m³");
  const [tableData, setTableData] = useState([]);
  const chartRef = useRef(null); // Reference for chart instance

  useEffect(() => {
    fetchData();
  }, [range, unit]);

  const fetchData = async () => {
    if (!range?.from || !range?.to) return;

    const formattedFrom = format(range.from, "yyyy-MM-dd");
    const formattedTo = format(range.to, "yyyy-MM-dd");

    try {
      const response = await fetch(
        `http://localhost/cbl_backend/cbl_backend/sanky.php?start_date=${formattedFrom}&end_date=${formattedTo}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const text = await response.text();
      console.log("Raw API Response:", text);

      const data = JSON.parse(text);
      console.log("Parsed Data:", data);

      setTableData(data);
      initializeChart(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

// Convert Data into Sankey Format
const convertToSankeyData = (data) => {
  return [
     { from: "Genset", to: "Total Energy", value: data.total_genset_consumption },
     { from: "Solar", to: "Total Energy", value: data.total_solar_consumption },
     { from: "Transformer", to: "Total Energy", value: data.total_transformer_consumption },
     { from: "Transformer", to: "Transformer Export", value: data.total_transformer_export },
    
    // ✅ Ensure these are directly from Total Energy
      { from: "Total Energy", to: "Ball Mill 4", value: data.ball_mill_4_consumption },
      { from: "Total Energy", to: "Mosque", value: data.mosque_consumption },
      { from: "Total Energy", to: "Glaze Line2", value: data.Glaze_Line2},
      { from: "Total Energy", to: "Sorting & Packing Line", value: data.SortingPacking_Line_consumption},
      { from: "Total Energy", to: "Digital Printing Machine", value: data.Digital_printing_machine_consumption},
      { from: "Total Energy", to: "Colony DB", value: data.Colony_DB_consumption},
      { from: "Total Energy", to: "Light DB2", value: data.Light_DB2_consumption},
      { from: "Total Energy", to: "Kiln Bowler Fan", value: data.Kiln_Bowler_Fan_consumption}
    //    { from: "Total Energy", to: "Belt 300 feeding", value: data.Belt300_feeding_consumption},
    //   { from: "Total Energy", to: "Belt 200 feeding", value: data.Belt200_feeding_consumption},
    //    { from: "Total Energy", to: "Glaze Line1", value: data.Glaze_Line1_consumption},
    //    { from: "Total Energy", to: "Perklin + Klin", value: data.Perklin_and_Klin_consumption},
    //    { from: "Total Energy", to: "Layer Dryer", value: data.Layer_Dryer_consumption},
    //  { from: "Total Energy", to: "Spare 1", value: data.Spare1_consumption},
    //    { from: "Total Energy", to: "Laboratory", value: data.Laboratory_consumption},   
    //    { from: "Total Energy", to: "Air Compressor1", value: data.Air_Compressor1_consumption},
    //   { from: "Total Energy", to: "Light DB1", value: data.Light_DB1_consumption}, 
    //   { from: "Total Energy", to: "Kiln Loading Machine", value: data.Kiln_Loading_Machine_consumption},
    //    { from: "Total Energy", to: "Glaze Ball Mill135", value: data.Glaze_Ball_Mill135_consumption},
    //   { from: "Total Energy", to: "Press PH", value: data.Press_PH_consumption},
    //   { from: "Total Energy", to: "Lightning plant", value: data.Lightning_plant_consumption},
    //    { from: "Total Energy", to: "Ball Mill1", value: data.Ball_Mill1_consumption},
    //    { from: "Total Energy", to: "Polishing Line5", value: data.Polishing_Line5_consumption},
    //    { from: "Total Energy", to: "Polishing Line6", value: data.Polishing_Line6_consumption},
    //    { from: "Total Energy", to: "Glaze_Ball_Mill", value: data.Glaze_Ball_Mill_consumption},
     
    //    { from: "Total Energy", to: "Polishing Line7", value: data.Polishing_Line7_consumption},
    //    { from: "Total Energy", to: "Air Compresser2", value: data.Air_Compresser2_consumption},
    //    { from: "Total Energy", to: "Glaze Ball Mill 9500L", value: data.Glaze_Ball_Mill_9500L_consumption},
    //    { from: "Total Energy", to: "Spare 2", value: data.Spare2_consumption},
    //    { from: "Total Energy", to: "Spare 4", value: data.Spare4_consumption},
    //    { from: "Total Energy", to: "Layer5 Dryer", value: data.Layer5_Dryer_consumption},
    //    { from: "Total Energy", to: "Layer5 Dryer Unloading machine", value: data.Layer5_Dryer_Unloading_machine_consumption},
    //    { from: "Total Energy", to: "Rental Genset", value: data.Rental_Genset_consumption},
    //    { from: "Total Energy", to: "Water Treatment Area", value: data.Water_Treatment_Area_consumption},
    //    { from: "Total Energy", to: "Spare5", value: data.Spare5_consumption},
    //    { from: "Total Energy", to: "Air Compressor4", value: data.Air_Compressor4_consumption},
    //    { from: "Total Energy", to: "Press PH4300", value: data.Press_PH4300_consumption},
    //    { from: "Total Energy", to: "Ball Mills3", value: data.Ball_Mills3_consumption},
    //    { from: "Total Energy", to: "Hard Material", value: data.Hard_Material_consumption},
    //    { from: "Total Energy", to: "Polishing Line1", value: data.Polishing_Line1_consumption},
    //    { from: "Total Energy", to: "Polishing Line2", value: data.Polishing_Line2_consumption},
    //    { from: "Total Energy", to: "Fan For Spray Dryer", value: data.Fan_For_Spray_Dryer},
    //    { from: "Total Energy", to: "Slip Piston pump", value: data. Slip_Piston_pump_consumption},
    //    { from: "Total Energy", to: "Coal Stove", value: data.Coal_Stove_consumption},
    //    { from: "Total Energy", to: "ST Motors", value: data.ST_Motors_consumption},
    //  { from: "Total Energy", to: "Polishing Line3", value: data.Polishing_Line3_consumption},
    //    { from: "Total Energy", to: "Gaze Tank1", value: data.Gaze_Tank1_consumption},
    //    { from: "Total Energy", to: "Polishing Line4", value: data.Polishing_Line4_consumption},
    //    { from: "Total Energy", to: "Belt100 feeding", value: data.Belt100_feeding_consumption},
    //    { from: "Total Energy", to: "No Combustion System", value: data.No_combustion_system_consumption},
    //    { from: "Total Energy", to: "Digital Printing Machine", value: data.Digital_printing_machine_consumption},
    //    { from: "Total Energy", to: "Spare 7", value: data.Spare7_consumption},
    //    { from: "Total Energy", to: "Air_Compresser3", value: data.Air_Compresser3_consumption},
  ];
};
// Initialize Sankey Chart
const initializeChart = (data) => {
  if (!data) return;

  // Apply animated theme
  am4core.useTheme(am4themes_animated);

  // Dispose old chart instance if it exists
  if (chartRef.current) {
    chartRef.current.dispose();
  }

  // Create the chart
  const chart = am4core.create("chartdiv", am4charts.SankeyDiagram);
  chartRef.current = chart;

  // Disable amCharts logo
  if (chart.logo) {
    chart.logo.disabled = true;
  }

  // Initial hidden state
  chart.hiddenState.properties.opacity = 0;

  // Set chart data from your function
  chart.data = convertToSankeyData(data);

  // Map data fields
  chart.dataFields.fromName = "from";
  chart.dataFields.toName = "to";
  chart.dataFields.value = "value";

  // Basic layout settings
  chart.padding(20, 50, 0, 50);
  chart.nodePadding = 8;
  chart.nodeWidth = 12;

  // Default label settings for nodes
  const nodeTemplate = chart.nodes.template;
  // Show each node’s name + the auto-calculated total of incoming flows
  nodeTemplate.nameLabel.label.text = "{name}\n{total}";
  nodeTemplate.nameLabel.label.truncate = false;
  nodeTemplate.nameLabel.label.wrap = true;
  nodeTemplate.nameLabel.label.maxWidth = 200;
  nodeTemplate.nameLabel.label.fontSize = 12;
  nodeTemplate.inert = true;
  nodeTemplate.readerTitle = "Drag me!";
  nodeTemplate.showSystemTooltip = true;
  nodeTemplate.stroke = am4core.color("#fff");
  nodeTemplate.strokeWidth = 2;

  // OPTIONAL: If you have custom node colors in your data, adapt fill
  nodeTemplate.adapter.add("fill", function (fill, target) {
    return target.dataItem.dataContext.nodeColor
      ? am4core.color(target.dataItem.dataContext.nodeColor)
      : fill;
  });

  
// Override all node labels to show ONLY incoming totals
nodeTemplate.adapter.add("nameLabel.label.text", (currentText, target) => {
if (!target.dataItem) return currentText;

let incoming = target.dataItem.incomingLinks;
let incomingTotal = 0;

if (incoming && incoming.length) {
  incoming.each(link => {
    incomingTotal += link.dataItem.value;
  });
}

const nodeName = target.dataItem.dataContext.name || target.dataItem.name;
let outgoing = target.dataItem.outgoingLinks;
let outgoingTotal = 0;
if (outgoing && outgoing.length) {
outgoing.each(link => {
  outgoingTotal += link.dataItem.value;
});
}
return `${nodeName}\nIn: ${incomingTotal.toFixed(2)}\nOut: ${outgoingTotal.toFixed(2)}`;

});

  // Configure link template
  const linkTemplate = chart.links.template;
  linkTemplate.colorMode = "gradient";
  linkTemplate.fillOpacity = 0.35;
  linkTemplate.strokeOpacity = 1;
  linkTemplate.strokeWidth = 1.5;
  
  // Create a gradient for the links
  const gradient = new am4core.LinearGradient();
  gradient.addColor(am4core.color("#FF0000")); // Start color
  gradient.addColor(am4core.color("#00FF00")); // End color
  linkTemplate.fill = gradient;

  // Tooltip for links
  const tooltipText = `{fromName} → {toName}\n[bold]{value}[/]`;
  linkTemplate.tooltipText = tooltipText;

  // Additional settings
  nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
  nodeTemplate.showSystemTooltip = true;
  nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
};





  // Fetch data when date range or unit changes
      useEffect(() => {
        fetchData();
      }, [range, unit]);

        return (
          <main className="p-1">
            <div className="flex flex-wrap gap-3">
              <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-white border-2 border-[grey] border-t-[4px] border-t-[#1d5999]">
                {/* Header Section */}
                <div className="flex flex-wrap justify-between items-center">
                <h3 className="text-xl font-bold text-gray-500">Energy Flow</h3>


                  {/* Date Picker with Calendar Icon */}
                  <div className="flex items-center space-x-4">
                  <label className="text-sm font-bold text-gray-700 mr-2">Start Date:</label>
                 <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-40">
 
      <DatePicker
        selected={range.from}
        onChange={(date) => setRange({ ...range, from: date })}
        selectsStart
        startDate={range.from}
        endDate={range.to}
        className="outline-none w-full"
      />
      <FaCalendarAlt className="text-gray-600 ml-[4px]" size={20} />
    </div>
    <label className="text-sm font-bold text-gray-700 mr-2">End Date:</label>
    <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-40">

      <DatePicker
        selected={range.to}
        onChange={(date) => setRange({ ...range, to: date })}
        selectsEnd
        startDate={range.from}
        endDate={range.to}
        minDate={range.from}
        className="outline-none w-full"
      />
      <FaCalendarAlt className="text-gray-600 ml-[4px]" size={20} />
    </div>
  </div>


                </div>

                {/* Unit Selector */}
                {/* <div className="flex items-center gap-4 mt-4">
                  <label htmlFor="unit">Select Unit:</label>
                  <select
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md"
                  >
                    <option value="SCF">SCF</option>
                    <option value="m³">m³</option>
                  </select>
                </div> */}

                {/* Chart Section */}
                <div 
        id="chartdiv" 
        class="relative w-[95%] h-[650px] overflow-auto"
      >
      </div>

              </div>
            </div>
          </main>
        );
      }

      export default DashboardPage;
