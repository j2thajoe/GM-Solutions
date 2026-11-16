import React from "react";
import "../assets/css/category.css";

const subTitle = "Why choose us";
const title = "About US";

const AboutUsCategory = () => {
  return (
    <div className="category-section style-3 padding-tb section-bg-ash">
      <div className="container">
        {/* section header */}

        <div className="section-header">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>
        {/* section wrapper */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <div className="instructor-thumb">
                <img src="/src/assets/images/instructor/01.png" alt="" />
              </div>
            </div>
            <div className="col text-start">
              <p className="aboutus-text">
                We've brought up this company to supply you with a combination
                of servicing departments; as you've seen, they're inclusive of
                product supply, to service provision, even online lectures in
                some courses for a start.
              </p>
              <p className="aboutus-text">
                See more about ourselves in relation to each section and
                department
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCategory;
