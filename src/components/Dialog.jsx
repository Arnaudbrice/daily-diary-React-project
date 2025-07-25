import React from "react";

const Dialog = props => {
  const { diary, setDiary } = props;

  const handleChange = event => {
    const { name, type } = event.target;

    // Handle file input differently from other inputs
    if (type === "file") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          setDiary(prevDiary => ({
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
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 grid grid-cols-fr mx-auto">
            <legend className="fieldset-legend text-2xl text-center">
              Add a new card
            </legend>
            <label htmlFor="title" className="label text-lg">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={diary.title}
              onChange={handleChange}
              className="input border border-amber-600"
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
              className="input border border-amber-600"
              placeholder="Date"
              required
            />
            <label htmlFor="imageUrl" className="label text-lg">
              Image
            </label>
            {/* input type file don't needa value */}
            {/* we use a key props here to force the input to be re-rendered when the imageUrl changes (otherwise input file will use It old value) */}
            <input
              key={diary.imageUrl}
              type="file"
              accept="image/*"
              className="file-input bg-amber-600 hover:bg-amber-500 border border-amber-600"
              name="imageUrl"
              onChange={handleChange}
            />
            <label htmlFor="text" className="label text-lg">
              Text
            </label>
            <textarea
              name="text"
              value={diary.text}
              onChange={handleChange}
              className="textarea border border-amber-600 h-24"
              placeholder="text"
            />
            <button className="btn bg-amber-600 border border-amber-600 hover:bg-amber-500 mt-4">
              Save
            </button>
          </fieldset>
        </form>
      </div>
    </dialog>
  );
};

export default Dialog;
