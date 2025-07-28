import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

import photo from "./assets/images/photo.png";
import { Routes, Route, useLocation } from "react-router";
import Detail from "../pages/Detail";

function App() {
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = JSON.parse(localStorage.getItem("cards")) || [];
    return savedDiaries.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const [diary, setDiary] = useState({
    title: "",
    date: "",
    imageUrl: photo, //default image if no image is provided
    text: ""
  });

  const fileInputRef = useRef(null);

  //  handle click event on the save button
  const handleSave = (diary, event) => {
    event.preventDefault();
    console.log("diaries", diaries);
    console.log("diary", diary);

    // Exclude the file input key imageUrl from the validation
    const excludedKey = "imageUrl";

    // array of keys from the diary object that are empty (except for the excludedKey imageUrl)

    const emptyFields = [];

    for (const [key, value] of Object.entries(diary)) {
      if (key !== excludedKey && value.trim() === "") {
        emptyFields.push(key);
      }
    }
    if (emptyFields.length > 0) {
      return toast.error("please fill all the fields, image is not required");
    }

    // Set default image if no image provided
    const finalDiary = {
      ...diary,
      imageUrl: diary.imageUrl || photo
    };

    // input fields validation
    /*   if (!Object.values(diary).every(value =>  value.trim() !== "")) {
      return toast.error("please fill all the fields");
    }
 */
    if (diaries.length === 0) {
      localStorage.setItem("cards", JSON.stringify([finalDiary]));
      const newDiaries = [finalDiary, ...diaries].sort(
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

      /*The file input keeps its old file selected even when diary.imageUrl is cleared. File inputs can't be controlled, so we need to manually reset them using useRef  */
      // clear input with type file
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      // Close the modal
      document.getElementById("my_modal_3").close();
      return toast.success("card added successfully");
    }
    // Check if the date already exists

    if (diaries.every(storageDiary => storageDiary.date !== finalDiary.date)) {
      // Add the new card to the local storage
      localStorage.setItem("cards", JSON.stringify([finalDiary, ...diaries]));
      const newDiaries = [finalDiary, ...diaries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // clear input fields
      setDiary({
        title: "",
        date: "",
        imageUrl: "",
        text: ""
      });

      /*The file input keeps its old file selected even when diary.imageUrl is cleared. File inputs can't be controlled, so we need to manually reset them using useRef  */
      // clear input with type file
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setDiaries(newDiaries);

      // Close the modal
      document.getElementById("my_modal_3").close();
      return toast.success("card added successfully");
    } else {
      /*  setDiary(prev => ({
        ...prev,
        title: diary.title,
        date: diary.date,
        imageUrl: diary.imageUrl,
        text: diary.text
      })); */

      return toast.error("A card with the same date already exists");
    }
  };

  const location = useLocation();
  const isDetailPage = location.pathname.includes("/diary/");

  return (
    <div
      className={` font-[Outfit] min-h-screen w-full grid ${
        isDetailPage ? "grid-rows-[1fr_auto]" : "grid-row-[auto_1fr_auto]"
      } `}
    >
      <main className="bg-[#FAF7F4] bg-[url('https://transparenttextures.com/patterns/dark-dotted-2.png')]  h-full pb-100">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onHandleSave={handleSave}
                  diary={diary}
                  setDiary={setDiary}
                  fileInputRef={fileInputRef}
                />
                <ToastContainer
                  className="my-16"
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
              </>
            }
          />
          <Route
            path="/diary/:diaryId"
            element={<Detail diaries={diaries} />}
          />
        </Routes>
        {/* <Cards diaries={diaries} /> */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
