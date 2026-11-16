import React from "react";

const subTitle = "You are welcome to our wide range of product and services ";
const title = (
  <h2 className="title">
    <b>Join Us NOW</b>{" "}
  </h2>
);
const desc = "Limited Time SERVICE Offer! HURRY UP";

const Register = () => {
  return (
    <section className="register-section padding-tb pb-0">
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
          <div className="col">
            <div className="section-header">
              <span className="subtitle">{subTitle}</span>
              {title}
              <p>{desc}</p>
            </div>
          </div>
          <div className="col">
            <div className="section-wrapper">
              <h4>Register NOW</h4>
              <form className="register-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  className="reg-input"
                />
                <input
                  type="number"
                  name="number"
                  placeholder="Phonenumber"
                  className="reg-input"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="reg-input"
                />
                <button type="submit" className="lab-btn">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
