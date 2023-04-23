import React from "react";

const SaveTrip = () => {
  function handleClick() {}

  return (
    <div className="flex justify-center items-center my-5">
      <button
        onClick={handleClick}
        className="bg-[#a57c48] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#8b623f] transition-colors duration-300"
      >
        Save Trip
      </button>
    </div>
  );
};

export default SaveTrip;
