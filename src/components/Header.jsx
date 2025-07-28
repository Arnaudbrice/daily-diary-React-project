import React from "react";

import Dialog from "./Dialog";
import { Link } from "react-router";

const Header = props => {
  return (
    <div className="flex items-center justify-around gap-4 p-4 text-xl bg-amber-600 ">
      <h1 className="mr-auto">
        <Link to="/">Daily Diary</Link>
      </h1>

      <div>
        <button
          className="btn bg-white text-[#53402D] border border-[#EDE6DE]]  shadow transition-transform duration-200 hover:scale-95 hover:drop-shadow-[0_0_10px_#53402D] "
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add a new Diary Entry
        </button>
        <Dialog
          handleSave={props.onHandleSave}
          setDiary={props.setDiary}
          diary={props.diary}
          fileInputRef={props.fileInputRef}
        />
      </div>
    </div>
  );
};

export default Header;
