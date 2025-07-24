import React, { useState } from "react";

const Dialog = props => {
  const [diary, setDiary] = useState({
    title: "",
    date: "",
    imageUrl: "",
    text: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setDiary(prevDiary => {
      return { ...prevDiary, [name]: value };
    });
  };

  const handleSubmit = event => {
    props.handleSave(diary, event);
    // clear input fields
    setDiary({
      title: "",
      date: "",
      imageUrl: "",
      text: ""
    });
  };
  return (
    <dialog id="my_modal_3" className="modal  sm:modal-middle ">
      <div className="modal-box ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid grid-cols-fr mx-auto">
            <legend className="fieldset-legend text-xl">Add a new card</legend>
            <label htmlFor="title" className="label text-lg"></label>
            <input
              type="text"
              name="title"
              value={diary.title}
              onChange={handleChange}
              className="input input-warning"
              placeholder="Title"
            />
            <label htmlFor="date" className="label text-lg">
              Date
            </label>
            <input
              type="Date"
              name="date"
              value={diary.date}
              onChange={handleChange}
              className="input input-warning"
              placeholder="Date"
              required
            />
            <label htmlFor="imageUrl" className="label text-lg">
              Image
            </label>
            <input
              type="file"
              className="file-input file-input-warning"
              name="imageUrl"
              value={diary.imageUrl}
              onChange={handleChange}
            />
            <label htmlFor="text" className="label text-lg">
              Text
            </label>
            <textarea
              name="text"
              value={diary.text}
              onChange={handleChange}
              className="textarea textarea-warning h-24"
              placeholder="text"
            />
            <button className="btn btn-info mt-4">Save</button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
