import React from "react";
import Button from "../Components/Button";
import smartplug from "../Assets/smart-plug.png";

export default function Settings() {
  return (
    <div className="p-5">
      <h1 className="font-bold text-mainBlue text-center text-3xl">Settings</h1>
      {/* for all controllers if added in future */}
      <div className="controllers">
        {/* first controller button  */}
        <div className="controller-card w-1/3 justify-center">
          <img src={smartplug} alt="smart plug" className="w-full h-full" />

          <div className="w-full h-full">
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}
