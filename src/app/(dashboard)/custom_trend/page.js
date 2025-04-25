"use client";
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import "@amcharts/amcharts4/themes/animated";

function CustomTrend() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMeter, setSelectedMeter] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState("");
  const [chartData, setChartData] = useState([]);

  const [showMeters, setShowMeters] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const meterMapping = {
    
    "Solar 1": "G2_U20",
    "Solar 2": "U_27",
    "Tranformer 1": "U_24",
    "Tranformer 2": "U_25",
    "Main Genset": "G1_U16",
    "Genset 1": "G1_U17",
    "Genset 2": "G1_U18",
    "Genset 3" : "G1_U19",
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
    Laboratory: "U_16",
    "Light D.B # 01": "U_18",
    "Light D.B # 02": "U_8",
    "Lighting (Plant)": "U_22",
    Masjid: "U_3",
    Prekiln: "U_13",
    "Press PH4300": "U_21",
    "Layer Dryer": "U_14",
    "Polishing Line 5": "G1_U2",
    "Polishing Line 6": "G1_U3",
    "Glaze Ball Mill  13500L-2": "G1_U4",
    "Polishing Line 7": "G1_U5",
    "Air Compressor-2": "G1_U6",
    "Glaze Ball Mill 9500L-3": "G1_U7",
    "Spare 02": "G1_U8",
    "Spare 04": "G1_U10",
    "5 Layer Dryer": "G1_U11",
    "5 Layer Dryer Unloading Machine": "G1_U12",
    "Rental Genset": "G1_U13",
    "Water Treatment Area": "G1_U14",
    "Spare 05": "G1_U15",
  
    
    


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
    "Spare 07 ": "G2_U5",
    "Air Compressor 3  ": "G2_U19",
    "Air Compressor 4  ": "G2_U6",
  };

  const parameterMapping = {
    "Active Energy": "ACTIVE_ENERGY_IMPORT_KWH",
    "Active Power A": "ACTIVE_POWER_P1_KW",
    "Active Power B": "ACTIVE_POWER_P2_KW",
    "Active Power C": "ACTIVE_POWER_P3_KW",
    "Active Power Total": "ACTIVE_POWER_TOTAL_KW",
    "Current A": "CURRENT_LINE_1_A",
    "Current B": "CURRENT_LINE_2_A",
    "Current C": "CURRENT_LINE_3_A",
    "Current Total": "CURRENT_TOTAL_A",
    Frequency: "FREQUENCY_F",
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

  const meters = Object.keys(meterMapping);
  const parameters = Object.keys(parameterMapping);

  useEffect(() => {
    if (startDate && endDate && selectedMeter.length > 0 && selectedParameter) {
      const meterIds = selectedMeter.map(meter => meterMapping[meter]).join(',');
      const apiUrl = `http://localhost:5000/trends?start_date=${startDate}&end_date=${endDate}&meterId=${meterIds}&suffixes=${parameterMapping[selectedParameter]}`;
      

      fetch(apiUrl)
        .then((response) => response.json())
        .then((apiData) => {
          const formattedData = apiData.map((item) => {
            const dataPoint = { timestamp: new Date(item.timestamp) };
            selectedMeter.forEach((meter) => {
              const key = `${meterMapping[meter]}_${parameterMapping[selectedParameter]}`;
              dataPoint[meter] =
                item.data?.[key] !== undefined && item.data?.[key] !== null
                  ? parseFloat(item.data[key]).toFixed(2)
                  : null;
            });
            return dataPoint;
          });
          setChartData(formattedData);
        });
    }
  }, [startDate, endDate, selectedMeter, selectedParameter]);

  useEffect(() => {
    if (chartData.length > 0) {
      am4core.useTheme(am4themes_kelly);
      const chartInstance = am4core.create("chartDiv", am4charts.XYChart);
      chartInstance.logo.disabled = true;
      chartInstance.dateFormatter.inputDateFormat =
        "yyyy-MM-ddTHH:mm:SS.SSS+zz:zz";

      var dateAxis = chartInstance.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.labels.template.fontSize = 14;
      dateAxis.baseInterval = {
        timeUnit: "second",
        count: 1,
      };
      const valueAxis = chartInstance.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = selectedParameter;
      valueAxis.title.fontSize = 14;
      valueAxis.renderer.labels.template.fontSize = 14;

      // Find max and min values from the data
      let allValues = [];
      chartData.forEach((data) => {
        selectedMeter.forEach((meter) => {
          if (data[meter] !== null) {
            allValues.push(data[meter]);
          }
        });
      });

      const max = Math.max(...allValues);
      const min = Math.min(...allValues);

      //target line for max and min

      var range = valueAxis.axisRanges.create();
      range.value = max;
      range.grid.stroke = am4core.color("#fda50f");
      range.grid.strokeWidth = 2;
      range.grid.strokeOpacity = 1;
      range.label.inside = true;
      range.label.text = "Max Peak at " + max;
      range.label.fill = range.grid.stroke;
      //range.label.align = "right";
      range.label.verticalCenter = "top"; // Align at the top of the max line
      range.label.dy = -10; // Add padding above the label
      // console.log(Object.keys(yAxis));
      //minimum range
      var range1 = valueAxis.axisRanges.create();
      range1.value = min;
      range1.grid.stroke = am4core.color("green");
      range1.grid.strokeWidth = 2;
      range1.grid.strokeOpacity = 1;
      range1.label.inside = true;
      range1.label.text = "Min Peak at " + min;
      range1.label.fill = range1.grid.stroke;
      //range1.label.align = "right";
      range1.label.verticalCenter = "bottom";

      const colorSet = new am4core.ColorSet();
      selectedMeter.forEach((meter, index) => {
        const series = chartInstance.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = meter;
        series.dataFields.dateX = "timestamp";
        series.name = meter;
        series.tooltipText = "{dateX}: [b]{valueY}[/]";
        series.strokeWidth = 3;
        series.minBulletDistance = 15;
        series.stroke = colorSet.getIndex(index);
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
      });

      // // Make a panning cursor
      // chartInstance.cursor = new am4charts.XYCursor();
      // chartInstance.cursor.behavior = "panXY";
      // chartInstance.cursor.xAxis = dateAxis;
      // chartInstance.cursor.snapToSeries = series;

      chartInstance.cursor = new am4charts.XYCursor();
      chartInstance.data = chartData;
      chartInstance.scrollbarX = new am4charts.XYChartScrollbar();
      chartInstance.scrollbarX.minHeight = 15;
      function customizeGrip(grip) {
        // Remove default grip image
        grip.icon.disabled = true;

        // Disable background
        grip.background.disabled = true;

        // Add rotated rectangle as bi-di arrow
        var img = grip.createChild(am4core.Rectangle);
        img.width = 6;
        img.height = 6;
        img.fill = am4core.color("#999");
        img.rotation = 45;
        img.align = "center";
        img.valign = "middle";

        // Add vertical bar
        var line = grip.createChild(am4core.Rectangle);
        line.height = 15;
        line.width = 2;
        line.fill = am4core.color("#999");
        line.align = "center";
        line.valign = "middle";
      }

      customizeGrip(chartInstance.scrollbarX.startGrip);
      customizeGrip(chartInstance.scrollbarX.endGrip);
      // // Bring back colors
      chartInstance.scrollbarX.scrollbarChart.plotContainer.filters.clear();
      chartInstance.legend = new am4charts.Legend();
      chartInstance.legend.position = "bottom";
      chartInstance.legend.marginTop = 0;
      chartInstance.legend.fontSize = 12;
      chartInstance.legend.itemContainers.template.width = 110;
      chartInstance.legend.itemContainers.template.height = 18;
      chartInstance.legend.markers.template.width = 10;
      chartInstance.legend.markers.template.height = 10;
      chartInstance.legend.labels.template.wrap = true;
      chartInstance.legend.labels.template.truncate = true;
      chartInstance.legend.labels.template.maxWidth = 140;
      chartInstance.exporting.menu = new am4core.ExportMenu();
      // Customize file name
      chartInstance.exporting.filePrefix = "Customized_Trends";
      chartInstance.exporting.menu.align = "right";
      chartInstance.exporting.menu.verticalAlign = "top";
      chartInstance.exporting.formatOptions.getKey("json").disabled = true;
      chartInstance.exporting.formatOptions.getKey("html").disabled = true;
      chartInstance.exporting.formatOptions.getKey("csv").disabled = true;
      chartInstance.exporting.formatOptions.getKey("pdf").disabled = true;
      chartInstance.exporting.menu.items[0].icon =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MjAuMDAwMDAwLCAtNDMyLjAwMDAwMCkiPjxwYXRoIGQ9Ik03MjEsNDQ2IEw3MzMsNDQ2IEw3MzMsNDQzIEw3MzUsNDQzIEw3MzUsNDQ2IEw3MzUsNDQ4IEw3MjEsNDQ4IFogTTcyMSw0NDMgTDcyMyw0NDMgTDcyMyw0NDYgTDcyMSw0NDYgWiBNNzI2LDQzMyBMNzMwLDQzMyBMNzMwLDQ0MCBMNzMyLDQ0MCBMNzI4LDQ0NSBMNzI0LDQ0MCBMNzI2LDQ0MCBaIE03MjYsNDMzIiBpZD0iUmVjdGFuZ2xlIDIxNyIvPjwvZz48L2c+PC9zdmc+";
      return () => chartInstance.dispose();
    }
  }, [chartData, selectedMeter, selectedParameter]);

  return (

    <div className="relative flex-shrink-0 w-full p-6 h-[83vh] rounded-[8px] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] overflow-hidden">
  {/* Background layer with opacity */}
  
  <div className="absolute inset-0 bg-white" style={{ opacity: 1 }}></div>

  {/* Foreground content */}
  <div className="relative z-10 h-full flex flex-col">
    <h1 className="text-lg font-bold text-gray-700 mb-4">Customized Trend</h1>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Select Meters */}
      <div className="relative" onMouseLeave={() => setShowMeters(false)}>
        <label className="block text-sm font-medium text-gray-600">Select Meters</label>
        <button
          onMouseEnter={() => setShowMeters(true)}
          className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
        >
          {selectedMeter.length > 0
            ? `${selectedMeter[0]}${selectedMeter.length > 1 ? ", ..." : ""}`
            : "Select Meters"}
          <span>{showMeters ? "▲" : "▼"}</span>
        </button>
        {showMeters && (
          <div
            onMouseEnter={() => setShowMeters(true)}
            className="absolute bg-white border shadow-lg z-10 w-full max-h-48 overflow-y-auto"
          >
            {meters.map((meter) => (
              <label key={meter} className="block p-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  value={meter}
                  checked={selectedMeter.includes(meter)}
                  onChange={() => {
                    setSelectedMeter((prev) =>
                      prev.includes(meter)
                        ? prev.filter((m) => m !== meter)
                        : [...prev, meter]
                    );
                  }}
                  className="mr-2"
                />
                {meter}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Select Parameter */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-600">Select Parameter</label>
        <button
          onClick={() => setShowParameters(!showParameters)}
          className="w-full p-2 border rounded text-left flex justify-between items-center bg-white"
        >
          {selectedParameter || "Select Parameter"}
          <span>{showParameters ? "▲" : "▼"}</span>
        </button>
        {showParameters && (
          <div className="absolute bg-white border shadow-lg z-10 w-full max-h-48 overflow-y-auto">
            {parameters.map((param) => (
              <label key={param} className="block p-2 hover:bg-gray-100">
                <input
                  type="radio"
                  name="parameter"
                  value={param}
                  checked={selectedParameter === param}
                  onChange={(e) => {
                    setSelectedParameter(e.target.value);
                    setShowParameters(false);
                  }}
                  className="mr-2"
                />
                {param}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Chart container */}
    <div id="chartDiv" className="h-[80%]"></div>
  </div>
</div>

  );
}

export default CustomTrend;
