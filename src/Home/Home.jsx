import React from "react";
import Banner from "./Banner/Banner";
import BiryaniCard from "./BiryaniCard/BiryaniCard";

const Home = () => {
  return (
    <div className="mt-5 mb-5 space-y-5">
      <Banner />
      <BiryaniCard/>
    </div>
  );
};

export default Home;
