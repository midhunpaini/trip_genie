import { useState, useEffect } from "react";
import openImage from "../../../assets/images/down.svg";
import closeImage from "../../../assets/images/right.svg";
import loadingImage from "../../../assets/images/loading.png";
import successImage from "../../../assets/images/success.png";
import failureImage from "../../../assets/images/failed.png";



const TripResultButton = ({ datas, sectionName, component}) => {
  const isFailure = datas?.isFailedLoading
  const isSuccess = datas?.isLoaded
  const isLoading = datas?.isLoading
  const [isOpen, setIsOpen] = useState("");
  const data = datas?.data
  function handleClick() {
    if (isSuccess) {
      setIsOpen(!isOpen);
    }
  }

  return (
    <div className="m-3 flex flex-col justify-center items-center">
      <button
        onClick={handleClick}
        className={`text-lg w-full md:w-[50rem] h-[4rem]  shadow-md hover:shadow-inner shadow-black bg-gray-300 flex items-center rounded-lg ${
          isLoading && "animate-pulse"
        }`}
      >
        {isOpen ? (
          <img className=" w-3 ml-6" src={openImage} alt="down" />
        ) : (
          <img className=" w-3  ml-6" src={closeImage} alt="up" />
        )}

        <p className="flex-1">{sectionName}</p>
        {isLoading ? (
          <img
            className="w-6 mr-2 animate-spin"
            src={loadingImage}
            alt="loading"
          />
        ) : isSuccess ? (
          <img className="w-6 mr-2" src={successImage} alt="success" />
        ) : isFailure ? (
          <img className="w-6 mr-2 " src={failureImage} alt="failure" />
        ) : null}
      </button>
      {isOpen ? (
        <div className="w-full md:w-[50rem] mt-2">{component}</div>
      ) : null}
    </div>
  );
};

export default TripResultButton;
