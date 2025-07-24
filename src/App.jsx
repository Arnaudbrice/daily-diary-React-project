import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";

function App() {
  const [diaries, setDiaries] = useState(() => {
    return JSON.parse(localStorage.getItem("cards")) || [];
  });

  const handleSave = (diary, event) => {
    event.preventDefault();
    console.log("diaries", diaries);
    console.log("diary", diary);

    /*     localStorage.setItem("cards", JSON.stringify([diary, ...diaries]));
    setDiaries([diary, ...diaries]); */

    if (diaries.length === 0) {
      localStorage.setItem("cards", JSON.stringify([diary]));
      setDiaries([diary, ...diaries]);

      // Close the modal
      document.getElementById("my_modal_3").close();
      return toast.success("card added successfully");
    }

    for (const card of diaries) {
      if (card.date !== diary.date) {
        // Add the new card to the local storage
        localStorage.setItem("cards", JSON.stringify([diary, ...diaries]));
        setDiaries([diary, ...diaries]);
        // Close the modal
        document.getElementById("my_modal_3").close();
        return toast.success("card added successfully");
      } else {
        // Close the modal
        document.getElementById("my_modal_3").close();
        return toast.error("A card with the same date already exists");
      }
    }

    // Close the modal
    document.getElementById("my_modal_3").close();
  };

  return (
    <div className="min-h-screen w-full grid grid-rows-[auto_1fr_auto] ">
      <Header className="mb-4" onHandleSave={handleSave} />
      <main className="bg-orange-600 mt-4 ">
        <ToastContainer
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
