import React from "react";
import { Link } from "react-router-dom";

const Solutions = () => {
  return (
    <div>
      <div>
        <Link to="/Solutions">
          <h1>Solutions</h1>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/MobileSolutions">
          <h2>Mobile Solutions</h2>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/ComputerandLaptopSolutions">
          <h2>Computer & Laptop Solutions</h2>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/ConstructionSolutions ">
          <h2>Construction Solutions </h2>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/NetworkandSecuritySolutions">
          <h2>Network & Security Solutions</h2>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/HomeandOfficeSolutions">
          <h2>Home & Office Solutions</h2>
        </Link>
      </div>
      <br />
      <div>
        <Link to="/RetailandProductSourcing">
          <h2>Retail & Product Sourcing</h2>
        </Link>
      </div>
      <br />
    </div>
  );
};
export default Solutions;
