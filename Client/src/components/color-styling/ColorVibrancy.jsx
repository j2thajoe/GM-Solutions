import React, { useState } from "react";
import chroma from "chroma-js";

const ColorVibrancyModifier = () => {
  const [color, setColor] = useState("#ff0000"); // Default color
  const [vibrancy, setVibrancy] = useState(1); // Vibrancy factor
  const [modifiedColor, setModifiedColor] = useState(color);

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
    updateModifiedColor(selectedColor, vibrancy);
  };

  const handleVibrancyChange = (event) => {
    const newVibrancy = parseFloat(event.target.value);
    setVibrancy(newVibrancy);
    updateModifiedColor(color, newVibrancy);
  };

  const updateModifiedColor = (baseColor, vibrancyFactor) => {
    const newColor = chroma(baseColor).set("hsl.s", vibrancyFactor).hex();
    setModifiedColor(newColor);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Color Vibrancy Modifier & Analyzer</h1>
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
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Vibrancy:</strong>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={vibrancy}
            onChange={handleVibrancyChange}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <strong>Modified Color:</strong>{" "}
        <span
          style={{
            backgroundColor: modifiedColor,
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {modifiedColor}
        </span>
      </div>
      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>Color Analysis:</strong>
        <p>Brightness: {chroma(modifiedColor).luminance().toFixed(2)}</p>
        <p>
          Saturation:{" "}
          {chroma(modifiedColor).saturate().get("hsl")[1].toFixed(2)}%
        </p>
        <p>Hue: {chroma(modifiedColor).hsl()[0].toFixed(2)}°</p>
      </div>
    </div>
  );
};

export default ColorVibrancyModifier;
