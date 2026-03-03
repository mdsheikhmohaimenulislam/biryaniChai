import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const BiryaniCard = () => {
  const [ifterDatas, setIfterDatas] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/ifterData`)
      .then((res) => res.json())
      .then((data) => setIfterDatas(data));
  }, []);
 

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {ifterDatas.map((ifterData) => (
        <SingleCard ifterData={ifterData} />
      ))}
    </div>
  );
};

export default BiryaniCard;
