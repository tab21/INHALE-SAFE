import React from "react";

//importing components
import Article from "../Components/Article";
import CoLevel from "../Components/CoLevel";

//importing data
import CO_DATA from "../Assets/Article_Data/CO";

export default function Dashboard() {
  return (
    <div className="p-5">
      <h1 className="font-bold text-mainBlue text-center text-3xl">
        Dashboard
      </h1>

      {/* getting Co chart and info  */}
      <div className="flex w-full">
        <CoLevel />
        <Article {...CO_DATA[0]} />
      </div>
    </div>
  );
}
