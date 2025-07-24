import React from "react";
import Dialog from "./Dialog";

const Header = props => {
  return (
    <div className="bg-grey-600 flex justify-around  items-center gap-4 p-4">
      <h1 className="mr-auto">Daily Diary</h1>

      <div>
        <button
          className="btn btn-info"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          open modal
        </button>
        <Dialog handleSave={props.onHandleSave} />
      </div>
    </div>
  );
};

export default Header;
