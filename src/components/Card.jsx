import React from "react";

const Card = props => {
  const handleReadMore = () => {};

  return (
    <div className="card  bg-[#ffffff]  border-[#EDE6DE] text-[#362617] h-full hover:shadow-lg   text-center rounded-lg  shadow transition-transform duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_#362617] ">
      <div className="card-body items-center text-center">
        <h2 className="card-title justify-center font-bold border-b-2 border-b-[#362617]/20 pb-2 w-full">
          {props.diary.title}
        </h2>
        <p className=" justify-center  ">{props.diary.date}</p>
      </div>
      <figure className="card-image    w-full block h-full">
        <img
          src={props.diary.imageUrl}
          alt="Shoes"
          className="w-full h-full aspect-3/2 object-cover"
        />
      </figure>

      <div className="flex justify-around gap-x-8  px-4 items-center  ">
        <p>{props.diary.text.substring(0, 20)}...</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleReadMore}
            className="btn bg-amber-600 my-4 hover:bg-amber-500"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
