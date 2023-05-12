import React, { useState } from 'react';
import Slider from 'react-slick';
import HotelCard from './HotelCard';
import CuisineCard from './CusineCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const Carousel = ({data, card}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="p-1 sm:px- lg:px-8 bg-gray-300 rounded-md">
      <Slider {...settings} className="">
        {data.map((item) => (
          <div key={item.name} className="px-2">
            {card==='hotel'?<HotelCard hotel={item}/>:<CuisineCard cusine={item}/>}
          </div>
        ))}
      </Slider>
      <div className="mt-4 flex justify-center">
        <ul className="flex">
          {[...Array(Math.ceil(data.length / settings.slidesToShow)).keys()].map((index) => (
            <li key={index}>
              <button className="text-gray-600 hover:text-gray-800 focus:text-gray-800 transition duration-150 ease-in-out rounded-full w-3 h-3 mx-2 focus:outline-none">
                <span className="sr-only">Go to slide {index + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
