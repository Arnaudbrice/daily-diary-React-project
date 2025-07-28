import React from "react";
import Card from "./Card";

const Cards = props => {
  console.log("diaries from cards", props.diaries);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))]  min-h-md gap-8   mx-8 my-24 px-2 ">
      {props.diaries.map((diary, index) => (
        <Card key={index} diary={diary} />
      ))}
    </div>
  );
};

export default Cards;
