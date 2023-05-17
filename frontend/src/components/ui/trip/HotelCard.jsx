import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div className="wrapper m-4 bg-gray-400 antialiased text-gray-900">
      <div>
        <Link to={hotel.hotel_link} target="_blank">
          <img
            src={hotel.image_url}
            alt="random image"
            className="w-full object-cover object-center rounded-lg shadow-md"
          />
        </Link>
        <div className="relative px-4 -mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span>
                <button className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                  <Link to={hotel.booking_link} target="_blank">
                    Book Now
                  </Link>
                </button>
              </span>
            </div>

            <p className="mt-1 font-semibold uppercase  truncate">
              {hotel.name}
            </p>

            <div className="mt-1">
              {hotel.price}
              <span className="text-gray-600 text-sm"></span>
            </div>
            <div className="mt-4">
              <span className="text-teal-600 text-md font-semibold">
                {hotel.rating} ratings
              </span>
              <span className="text-sm text-gray-600">
                (based on {hotel.total_rating})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
