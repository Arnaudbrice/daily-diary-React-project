import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-4">
        <p className="text-center text-md sm:text-xl">
          ©{new Date().getFullYear()} Daily Diary Made with ❤️ by Arnaud
          Habenicht
        </p>
      </div>
    </div>
  );
};

export default Footer;
