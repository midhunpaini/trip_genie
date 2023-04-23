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
    <div className="relative">
        <h2 className="text-xl font-bold">{currentPlace.name}</h2>
      <div className=" flex ">
        <img
          src={currentPlace.image_url}
          alt={currentPlace.alt}
          className=" mx-auto rounded-lg max-w-sm min-w-[20rem] min-h[15rem] max-h-60"
        />
        <p className="m-auto ms-2 text-lg ">{currentPlace.description.replace("['","").replace("']","").replace(currentPlace.name+"', '","")}</p>
      </div>
     
      <div className="mt-2 flex justify-center"> 
      <button
        onClick={handlePrevClick}
        className="px-4 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 mr-2"
      >
        Prev
      </button>
      <button
        onClick={handleNextClick}
        className="px-4 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600"
      >
        Next
      </button>
    </div>
    </div>
  );
};

export default PlacesCarousel;
