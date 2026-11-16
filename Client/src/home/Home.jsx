import React from "react";
import Banner from "./Banner";
import AdministratorCategory from "../admin/AdminCategory";
import ProductCategory from "./ProductCategory";
import ServiceCategory from "./ServiceCategory";
import CourseCategory from "./CourseCategory";
import ArtCategory from "./ArtCategory";
import AboutUsCategory from "./AboutUsCategory";
import WhoWeRepresent from "./WhoWeRepresent";

const Home = () => {
  const client = JSON.parse(localStorage.getItem("client"));

  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Banner />
      {/* {client?.isAdmin && <AdministratorCategory />} */}
      <ProductCategory />
      <ServiceCategory />
      <CourseCategory />
      <ArtCategory />
      <AboutUsCategory />
      <WhoWeRepresent />
    </div>
  );
};

export default Home;
