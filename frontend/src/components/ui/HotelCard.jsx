import React from 'react';

const HotelCard = ({ pictureUrl, price, rating, location }) => {
  return (
    <div className="hotel-card bg-white rounded-lg overflow-hidden shadow-md">
      <img className="w-full max-h-[8rem]" src={pictureUrl} alt="Hotel" />
      <div className="p-4">
        <div className="font-medium text-gray-900 text-lg mb-2">${price}</div>
        <div className="flex items-center mb-2">
          <svg className="fill-current text-yellow-400 w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12.585L3.702 16.28l1.396-7.962L.293 6.72l7.809-1.133L10 0l2.898 5.587 7.809 1.133-5.805 2.598 1.396 7.962z"/></svg>
          <div className="text-gray-600">{rating} stars</div>
        </div>
        <div className="text-gray-600 mb-2">{location}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
