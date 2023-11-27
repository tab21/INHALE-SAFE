import React from "react";

//importing components
import CoLevel from "./CoLevel";

export default function Graph() {
  return (
    <div className="w-4/5 m-2 flex-col">
      <CoLevel />
      <div className="flex h-1/5">
        <div className="w-1/2 bg-mainBlue m-2 rounded-md"></div>
        <div className="w-1/2 bg-mainBlue m-2  rounded-md"></div>
      </div>
    </div>
  );
}
