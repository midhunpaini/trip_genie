import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#a57c48] mt-auto py-8 flex flex-col sm:flex-row justify-between items-center  bottom-0 w-full">
      <ul className="flex justify-center mb-4 sm:mb-0">
        <li className="mx-2">
          <a href="#">Terms of Use</a>
        </li>
        <li className="mx-2">
          <a href="#">Privacy Policy</a>
        </li>
      </ul>
      <div className="social-media flex items-center">
        <p className="mr-4">Follow us on:</p>
        <a href="#">
          <img
            src="https://img.icons8.com/color/48/null/twitter--v1.png"
            alt="Twitter"
            className="mr-2 h-8 cursor-pointer"
          />
        </a>
        <a href="#">
          <img
            src="https://img.icons8.com/color/48/null/facebook-new.png"
            alt="Facebook"
            className="mr-2 h-8 cursor-pointer"
          />
        </a>
        <a href="#">
          <img
            src="https://img.icons8.com/color/48/null/instagram-new--v1.png"
            alt="Instagram"
            className="h-8 cursor-pointer"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
