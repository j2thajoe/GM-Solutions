import React, { useState, useEffect } from "react";
import chroma from "chroma-js";

const ColorSaturationAnalyzer = () => {
  const [color, setColor] = useState("#ff0000"); // Default color
  const [saturation, setSaturation] = useState(0);
  const [modifiedColor, setModifiedColor] = useState(color);

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
    const hsl = chroma(selectedColor).hsl();
    setSaturation(hsl[1] * 100); // Saturation is in percentage
  };

  const handleSaturationChange = (event) => {
    const newSaturation = parseFloat(event.target.value);
    setSaturation(newSaturation);
    updateModifiedColor(color, newSaturation);
  };

  const updateModifiedColor = (baseColor, saturationFactor) => {
    const newColor = chroma(baseColor).set("hsl.s", saturationFactor).hex();
    setModifiedColor(newColor);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Color Saturation Analyzer</h1>
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
      <div style={{ marginTop: "20px", fontSize: "24px" }}>
        <p>
          <strong>Saturation:</strong>{" "}
          {chroma(modifiedColor).saturate().get("hsl")[1].toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default ColorSaturationAnalyzer;
