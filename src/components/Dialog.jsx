import React from "react";

import { nanoid } from "nanoid";

const Dialog = props => {
  const { diary, setDiary, fileInputRef } = props;

  const handleChange = event => {
    const { name, type } = event.target;
    // Handle file input differently from other inputs
    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          setDiary(prevDiary => ({
            id: nanoid(),
            ...prevDiary,
            imageUrl: e.target.result // base64 string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      // Handle all other inputs normally
      const { value } = event.target;
      setDiary(prevDiary => ({
        id: nanoid(),
        ...prevDiary,
        [name]: value
      }));
    }
  };

  const handleSubmit = event => {
    props.handleSave(diary, event);
  };

  return (
    <dialog id="my_modal_3" className="modal  sm:modal-middle ">
      <div className="modal-box ">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-lg btn-circle btn-ghost  absolute right-2 top-2">
            ✕
          </button>
        </form>



        <form onSubmit={handleSubmit}>



          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid grid-cols-fr mx-auto">
            <legend className="fieldset-legend text-2xl text-center">
              Add a new card
            </legend>
            <label htmlFor="title" className="label text-lg py-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={diary.title}
              onChange={handleChange}
              className="input border border-amber-600"
              id="title"
              placeholder="Title"
            />
            <label htmlFor="date" className="label text-lg py-2">
              Date
            </label>
            <input
              type="Date"
              name="date"
              value={diary.date}
              onChange={handleChange}
              className="input border border-amber-600"
              id="date"
              placeholder="Date"
              required
            />
            <label htmlFor="imageUrl" className="label text-lg py-2">
              Image
            </label>
            {/* input type file don't needa value */}
            {/* we use a key props here to force the input to be re-rendered when the imageUrl changes (otherwise input file will use It old value) */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="file-input bg-amber-600 hover:bg-amber-500 border border-amber-600"
              id="imageUrl"
              name="imageUrl"
              onChange={handleChange}
            />
            <label htmlFor="text" className="label text-lg py-2">
              Text
            </label>
            <textarea
              name="text"
              value={diary.text}
              onChange={handleChange}
              className="textarea border border-amber-600 h-24"
              id="text"
              placeholder="text"
            />
            <button className="btn bg-amber-600 border border-amber-600 hover:bg-amber-500 mt-6">
              Save
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
