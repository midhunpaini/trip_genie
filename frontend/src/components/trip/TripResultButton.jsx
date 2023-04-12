import { useState } from "react";
import openImage from "../../assets/images/down.svg";
import closeImage from "../../assets/images/right.svg";
import loadingImage from "../../assets/images/loading.png";
import successImage from "../../assets/images/success.png";
import failureImage from "../../assets/images/failed.png";

const TripResultButton = ({ sectionName, component, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(true);

  function handleClick() {
    setIsOpen(!isOpen);
  }
  
  
  return (
    <div className="m-3 flex flex-col justify-center items-center">
      <button
        onClick={handleClick}
        desabled
        className="text-lg w-[50rem] h-[4rem]  shadow-md hover:shadow-inner shadow-black bg-gray-300 flex items-center rounded-lg"
      >
        {isLoading ? (
          <img className="w-5 ml-6 animate-spin" src={loadingImage} alt="loading" />
        ) : isSuccess ? (
          <img className="w-5 ml-6" src={successImage} alt="success" />
        ) : isFailure ? (
          <img className="w-5 ml-6" src={failureImage} alt="failure" />
        ) : isOpen ? (
          <img className="w-3 ml-6" src={openImage} alt="down" />
        ) : (
          <img className="w-3  ml-6" src={closeImage} alt="up" />
        )}

        <p className="ms-auto mr-6 items-center">{sectionName}</p>
      </button>
      {isOpen ? (
        <div className="w-[50rem] mt-2">{component}</div>
      ) : null}
    </div>
  );
};

export default TripResultButton;
