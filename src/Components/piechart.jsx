import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const WardOrderChart = ({ count }) => {
  const totalSections = 30;  // Total sections of the pie chart (total = 30)

  let yellowSections = totalSections;  // Initially all sections are yellow
  let blueSections = 0;  // Blue sections for positive count
  let redSections = 0;  // Red sections for negative count

  // If count is positive, use blue sections in a clockwise manner
  if (count > 0) {
    blueSections = count;
    yellowSections = totalSections - blueSections;
  }
  // If count is negative, use red sections in a counter-clockwise manner
  else if (count < 0) {
    redSections = Math.abs(count);  // Convert negative count to positive for red sections
    yellowSections = totalSections - redSections;
  }

  // Pie chart data
  const data = [
    { name: "Yellow", value: yellowSections },
    { name: "Blue", value: blueSections },
    { name: "Red", value: redSections },
  ];

  const COLORS = ["#FFEB3B", "#2196F3", "#FF0000"]; // Yellow, Blue, Red

  return (
    <div style={{ position: "relative", width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={68}
            outerRadius={90}
            startAngle={90}  // Start angle for clockwise rotation
            endAngle={-270}  // End angle for clockwise rotation
            dataKey="value"
            cornerRadius={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          color: "#004080",
          fontWeight: "bold",
        }}
      >
        {count}
      </div>
    </div>
  );
};

export default WardOrderChart;