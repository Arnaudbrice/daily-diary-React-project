import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

function App() {
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = JSON.parse(localStorage.getItem("cards")) || [];
    return savedDiaries.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const [diary, setDiary] = useState({
    title: "",
    date: "",
    imageUrl: "",
    text: ""
  });

  const handleSave = (diary, event) => {
    event.preventDefault();
    console.log("diaries", diaries);
    console.log("diary", diary);

    /*    localStorage.setItem("cards", JSON.stringify([diary, ...diaries]));
    setDiaries([diary, ...diaries]);
 */
    // input fields validation
    if (!Object.values(diary).every(value => value)) {
      setDiary(prev => ({
        ...prev,
        title: diary.title,
        date: diary.date,
        imageUrl: diary.imageUrl,
        text: diary.text
      }));
      return toast.error("please fill all the fields");
    }

    if (diaries.length === 0) {
      localStorage.setItem("cards", JSON.stringify([diary]));
      const newDiaries = [diary, ...diaries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDiaries(newDiaries);

      // clear input fields
      setDiary({
        title: "",
        date: "",
        imageUrl: "",
        text: ""
      });

      // Close the modal
      document.getElementById("my_modal_3").close();
      return toast.success("card added successfully");
    }
    // Check if the date already exists

    if (diaries.every(storageDiary => storageDiary.date !== diary.date)) {
      // Add the new card to the local storage
      localStorage.setItem("cards", JSON.stringify([diary, ...diaries]));
      const newDiaries = [diary, ...diaries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      /*The file input keeps its old file selected even when diary.imageUrl is cleared. File inputs can't be controlled, so we need to manually reset them using useRef  */
      // clear input fields
      setDiary({
        title: "",
        date: "",
        imageUrl: "",
        text: ""
      });

      setDiaries(newDiaries);

      // Close the modal
      document.getElementById("my_modal_3").close();
      return toast.success("card added successfully");
    } else {
      setDiary(prev => ({
        ...prev,
        title: diary.title,
        date: diary.date,
        imageUrl: diary.imageUrl,
        text: diary.text
      }));

      return toast.error("A card with the same date already exists");
    }
  };

  return (
    <div className=" font-[Outfit] min-h-screen w-full grid grid-rows-[auto_1fr_auto] ">
      <Header onHandleSave={handleSave} diary={diary} setDiary={setDiary} />

      <main className="bg-[#FAF7F4] bg-[url('https://transparenttextures.com/patterns/dark-dotted-2.png')]  h-full pb-100">
        <ToastContainer
          className="mt-16"
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
          limit={3} //only 3 notifications at the same time
        />
        <Cards diaries={diaries} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
