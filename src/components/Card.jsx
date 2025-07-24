import React from "react";

const Card = props => {
  const handleReadMore = () => {};

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{props.diary.title}</h2>
        <p>{props.diary.date}</p>
      </div>
      <figure>
        <img src={props.diary.imageUrl} alt="Shoes" />
      </figure>

      <p>{props.diary.text.substring(0, 100)}... </p>

      <div className="card-actions justify-end">
        <button onClick={handleReadMore} className="btn btn-primary">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;
