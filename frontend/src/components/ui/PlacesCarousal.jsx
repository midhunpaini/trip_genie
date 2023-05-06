import React, { useState } from 'react';

const PlacesCarousel = ({places}) => {

  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const currentPlace = places[currentPlaceIndex];

  const handleNextClick = () => {
    setCurrentPlaceIndex((currentPlaceIndex + 1) % places.length);
  };

  const handlePrevClick = () => {
    setCurrentPlaceIndex((currentPlaceIndex + places.length - 1) % places.length);
  };

  return (
    <div className="relative borderm-3 p-2 rounded-md shadow-xl">
      <h2 className="text-xl font-bold ms-6 my-2">{currentPlace.name}</h2>
      <div className="flex items-center">
        <button
          onClick={handlePrevClick}
          className="bg-transparent border-none text-gray-600 hover:text-black cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="mx-auto flex">
          <img
            src={currentPlace.image_url}
            alt={currentPlace.alt}
            className="rounded-lg max-w-sm min-w-[20rem] min-h-[14rem] max-h-[14rem]"
          />
          <p className='m-2'>{currentPlace.description.replace("['","").replace("']","").replace(currentPlace.name+"', '","")}</p>
        </div>
        <button
          onClick={handleNextClick}
          className="bg-transparent border-none text-gray-600 hover:text-black cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        {places.map((place, index) => (
          <span
            key={index}
            className={`h-3 w-3 mx-1 rounded-full bg-gray-400 ${
              index === currentPlaceIndex ? 'bg-gray-800' : ''
            }`}
            onClick={() => setCurrentPlaceIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlacesCarousel;
