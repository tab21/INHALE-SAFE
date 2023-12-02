import React from "react";

export default function Article(props) {
  console.log(props);
  console.log(props.title);
  return (
    <div className="m-2 w-1/5">
      <h2 className="font-bold m-2 line-clamp-2">{props.title}</h2>
      <p className="text-justify m-2 line-clamp-20">{props.para}</p>

      <button className="bg-mainBlue p-2 my-2 text-white rounded-md w-full">
        <a href={props.link} className="">
          Read More
        </a>
      </button>
    </div>
  );
}
