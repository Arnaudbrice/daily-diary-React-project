import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

import photo from "./assets/images/photo.png";
import { Routes, Route, useLocation } from "react-router";
import Detail from "../pages/Detail";
import NotFound from "../pages/NotFound"

function App() {
  const [diaries, setDiaries] = useState(() => {
    const savedDiaries = JSON.parse(localStorage.getItem("cards")) || [];
    return savedDiaries.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // The useEffect is called after the initial rendering to set up a listener for the storage event.
  // It does not update the state during the initial render but will handle changes to localStorage
  // triggered by the storage event (e.g., changes made in another tab or window).
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedDiaries = JSON.parse(localStorage.getItem("cards")) || [];
      setDiaries(
        updatedDiaries.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    };

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Initial state for the diary form
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
      return toast.error(
        <div className="text-center mx-0">
          please fill all the fields <br />( image optional )
        </div>
      );
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
      return toast.success("Diary Entry Successfully Saved to Local Storage!");
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
      return toast.success("Diary Entry Successfully Saved to Local Storage!");
    } else {
      /*  setDiary(prev => ({
        ...prev,
        title: diary.title,
        date: diary.date,
        imageUrl: diary.imageUrl,
        text: diary.text
      })); */

      return toast.error(
        "A Diary Entry With the Same Date Already Exists in Your Local Storage!"
      );
    }
  };

const location = useLocation();
const isHome = location.pathname === '/';
const isDetailPage = location.pathname.startsWith('/diary/');
const isNotFound = !isHome && !isDetailPage;


  return (
 <div
    className={`font-[Outfit] min-h-screen w-full ${
      isDetailPage || isNotFound
        ? "grid grid-rows-[1fr_auto]" // 1 row for content + footer
        : "grid grid-rows-[auto_1fr_auto]" // header + content + footer
    }`}
  >
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <Header
            onHandleSave={handleSave}
            diary={diary}
            setDiary={setDiary}
            fileInputRef={fileInputRef}
          />
        }
      />

      {/* Detail Page Route */}
      <Route
        path="/diary/:diaryId"
        element={<Detail diaries={diaries} />}
      />

      {/* Catch-all Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>

    {/* Only show main content on home page */}
    {isHome && (
      <main className="bg-[#FAF7F4] bg-[url('https://transparenttextures.com/patterns/dark-dotted-2.png')] h-full pb-100">
        <ToastContainer
          className="my-16 text-lg"
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
          limit={2}
        />
        <Cards diaries={diaries} />
      </main>
    )}

    <Footer />
  </div>
  );
}

export default App;
