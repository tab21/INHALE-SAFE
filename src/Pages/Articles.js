import React from "react";

//importing components
import Article from "../Components/Article";

//importing data
import CO_DATA from "../Assets/Article_Data/CO";
import MISC_DATA from "../Assets/Article_Data/Misc";

export default function Articles() {
  return (
    <div className="p-5">
      <h1 className="font-bold text-mainBlue text-center text-3xl">Articles</h1>

      <div className="m-4">
        <div className="flex justify-around flex-wrap gap-5">
          {CO_DATA.map((data, key) => {
            return <Article key={key} {...data} />;
          })}

          {MISC_DATA.map((data, key) => {
            return <Article key={key} {...data} />;
          })}
        </div>
      </div>
    </div>
  );
}
