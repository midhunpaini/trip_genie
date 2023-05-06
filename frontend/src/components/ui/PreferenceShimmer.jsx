import React from "react";

const PreferenceShimmer = () => {
  return (
    <div>
      <div className="animate-pulse flex flex-col border mb-9 bg-[#f1c488b9] border-[#a56b1eb9] rounded-lg shadow-2xl shadow-[#a56b1eb9] mx-auto max-w-lg p-10">
        <div className="h-6 bg-[#a56b1eb9] rounded w-1/2 my-2"></div>

        <div className="items-center justify-center mt-6">
          <div className="h-4 bg-[#a56b1eb9] rounded w-1/3 my-2"></div>
          <div className="h-10 bg-[#a56b1eb9] rounded w-[100%] my-2"></div>
        </div>
        <div className="items-center justify-center mt-6">
          <div className="h-4 bg-[#a56b1eb9] rounded w-1/3 my-2"></div>
          <div className="h-10 bg-[#a56b1eb9] rounded w-[100%] my-2"></div>
        </div>
        <div className="items-center justify-center mt-6">
          <div className="h-4 bg-[#a56b1eb9] rounded w-1/3 my-2"></div>
          <div className="items-center justify-center">
            <div className="h-3 bg-[#a56b1eb9] rounded w-1/4 my-2"></div>
            <div className="h-3 bg-[#a56b1eb9] rounded w-1/4 my-2"></div>
            <div className="h-3 bg-[#a56b1eb9] rounded w-1/4 my-2"></div>
            <div className="h-3 bg-[#a56b1eb9] rounded w-1/4 my-2"></div>
          </div>
        </div>
        <div className="h-10 bg-[#a56b1eb9] rounded w-1/4 my-2"></div>
      </div>
    </div>
  );
};

export default PreferenceShimmer;
