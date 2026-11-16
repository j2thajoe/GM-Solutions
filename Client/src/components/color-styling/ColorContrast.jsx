import React, { useState } from "react";
import chroma from "chroma-js";
import "../../assets/css/colorstyling.css";

const ColorContrastAnalyzer = () => {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [contrastRatio, setContrastRatio] = useState(0);

  const calculateContrast = () => {
    const contrast = chroma.contrast(foreground, background);
    setContrastRatio(contrast);
  };

  const isAccessible = (ratio) => {
    return ratio >= 4.5; // WCAG AA standard for normal text
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Color Contrast Analyzer</h2>
      <div>
        <label>
          Foreground Color:
          <input
            type="color"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Background Color:
          <input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          />
        </label>
      </div>
      <button className="check-contrast-btn " onClick={calculateContrast}>Check Contrast</button>
      <h3>Contrast Ratio: {contrastRatio.toFixed(2)}</h3>
      <h4 style={{ color: isAccessible(contrastRatio) ? "green" : "red" }}>
        {isAccessible(contrastRatio) ? "Accessible" : "Not Accessible"}
      </h4>
      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: background,
          color: foreground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        Sample Text
      </div>
    </div>
  );
};

export default ColorContrastAnalyzer;
