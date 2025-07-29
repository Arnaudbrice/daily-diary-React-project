import React from "react";
import { useParams, Link } from "react-router";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Detail = props => {
  const { diaryId } = useParams();
  console.log("diaryId", diaryId);

  const findDiary = () => {
    return props.diaries.find(diary => diary.id === diaryId);
  };

  const theFoundedDiary = findDiary();
  console.log("theFoundedDiary", theFoundedDiary);
  return (
    <div>
      <p className="text-amber-800 text-xl my-8 ml-4 link link-hover  ">
        <Link to="/">
          <FaArrowAltCircleLeft size={48} /> return to Home
        </Link>
      </p>

      <h2 className="text-black text-center text-2xl font-bold my-8 bg-white max-w-sm mx-auto rounded-lg">
        Details to{" "}
        <span className="text-amber-500">{theFoundedDiary.title}</span>
      </h2>

      <p className=" text-center text-black my-4 text-lg  ">
        Wrote on: {theFoundedDiary.date}
      </p>

      <p className="text-left text-black text-xl bg-white h-auto mx-4 p-4 rounded-lg shadow-lg">
        {theFoundedDiary.text}
      </p>
    </div>
  );
};

export default Detail;
