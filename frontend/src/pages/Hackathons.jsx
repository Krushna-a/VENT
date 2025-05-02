import React, { useEffect, useState } from "react";
import Hacks from "../components/Hacks";
import axios from "axios";

const Hackathons = () => {
  const [allHacks, setAllHacks] = useState([]);
  const getHacks = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/hack/getHackathon"
    );
    setAllHacks(response.data);
  };
  useEffect(() => {
    getHacks();
  }, []);
  return (
    <div className="w-full sm:px-40 flex flex-col gap-5 my-10">
      {allHacks.map((hack) => (
        <Hacks hackathon={hack}></Hacks>
      ))}
    </div>
  );
};

export default Hackathons;
