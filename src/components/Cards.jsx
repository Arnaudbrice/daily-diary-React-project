import React from "react";
import Card from "./Card";

const Cards = props => {
  console.log("diaries from cards", props.diaries);
  return (
    <div>
      {props.diaries.map((diary, index) => (
        <Card key={index} diary={diary} />
      ))}
    </div>
  );
};

export default Cards;
