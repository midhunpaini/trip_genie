import React from 'react';

const TravelOptions = ({options}) => {

  return (
    <div className="max-w-lg mx-auto py-4">
      {options.map((option) => (
        <div className="bg-white rounded-lg shadow-md p-4 m-4" key={option.option}>
          <h3 className="text-lg font-bold mb-2">{option.option}</h3>
          <p className="text-gray-700 mb-2">{option.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TravelOptions;
