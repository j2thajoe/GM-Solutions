import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import chroma from "chroma-js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ColorCorrectionTool = () => {
  const [color, setColor] = useState("rgba(255, 99, 132, 0.6)"); // Default color
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
    datasets: [
      {
        label: "Dataset",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: color,
      },
    ],
  });

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
    setData({
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          backgroundColor: selectedColor,
        },
      ],
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Color Correction Tool</h1>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        style={{
          width: "100px",
          height: "100px",
          border: "none",
          cursor: "pointer",
        }}
      />
      <div style={{ marginTop: "20px", fontSize: "24px" }}>
        <strong>Selected Color:</strong>{" "}
        <span
          style={{
            backgroundColor: color,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {color}
        </span>
      </div>
      <div style={{ marginTop: "20px", width: "600px", margin: "0 auto" }}>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default ColorCorrectionTool;
