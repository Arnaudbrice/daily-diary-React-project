import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center py-4">
      <p className="text-center text-md sm:text-xl">
        ©{new Date().getFullYear()} Daily Diary Made with ❤️ by Arnaud Habenicht
      </p>
    </footer>
  );
};

export default Footer;
