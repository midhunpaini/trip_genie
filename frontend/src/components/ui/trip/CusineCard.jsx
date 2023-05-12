import React from 'react';

const CuisineCard = ({cusine}) => {
  return (
    <div className="min-w-[14rem] max-w-lg min-h-[14rem] bg-white shadow-lg rounded-lg overflow-hidden">
      {/* <img className="w-full" src={cusine.image_url} alt={cusine.name} /> */}
      <div className="px-4 py-2 align-middle">
        <h2 className="font-bold text-xl mb-2 align-middle">{cusine.name}</h2>
        <p className="text-gray-700 text-base align-middle">{cusine.description}</p>
      </div>
    </div>
  );
};

export default CuisineCard;
