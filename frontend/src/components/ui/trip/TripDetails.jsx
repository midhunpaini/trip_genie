import React from "react";
import { useParams } from "react-router-dom";
import Map from "../../Google/GoogleMap";

const TripDetails = () => {
  const { id } = useParams();
  const storedTrips = localStorage.getItem("trips");
  const trips = storedTrips ? JSON.parse(storedTrips) : [];
  const data = trips.find((trip) => trip.id.toString() === id.toString());

  return (
    <div className="bg-gray-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Trip Itinerary</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Current location:</span>
              <span>{data?.current_location}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Destination:</span>
              <span>{data?.destination}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Start date:</span>
              <span>{data?.start_date}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">End date:</span>
              <span>{data?.end_date}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Budget:</span>
              <span>{data?.budget} {data?.currency}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
          <ul className="list-disc pl-8 space-y-2">
            {data?.itinerary[0]?.itinerary?.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="m-5">
          <Map places={data.places} />
        </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Places to Visit</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.places?.map((place) => {
            return (
              <div key={place.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                <img
                  src={place.image_url}
                  alt="Place"
                  className="w-full h-40 object-cover object-center rounded-md mb-2"
                />
                <p>{place.description?.split(", '")[1]?.split("']")[0]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Local Delicacy</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.local_delicacy?.map((delicacy) => {
            return (
              <div
                key={delicacy.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{delicacy.name}</h3>
                <p>{delicacy.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hotel Options</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.hotels?.map((hotel) => {
            return (
              <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={hotel.image_url}
                  alt="Hotel"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <span className="mr-1">{hotel.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.95 17.343a1 1 0 0 1-1.633 1.122l-4.63-4.315-4.63 4.316A1 1 0 0 1 .05 17.343l4.978-5.532L.05 6.28a1 1 0 0 1 1.386-1.495l4.63 4.316L11.726.888a1 1 0 0 1 1.633 0l4.979 5.532-1.385 1.536-4.63-4.316zm0-4.343a1 1 0 0 1-1.633 1.122l-4.63-4.315-4.63 4.316A1 1 0 0 1 .05 12l4.978-5.532L.05 1.88a1 1 0 0 1 1.386-1.495l4.63 4.316L11.726.544a1 1 0 0 1 1.633 0l4.979 5.532-1.385 1.536-4.63-4.316z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>({hotel.total_rating})</span>
                  </div>
                  <div className="text-lg font-semibold mb-2">{hotel.price}</div>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full uppercase text-xs font-semibold">
                    <a
                      href={hotel.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book Now
                    </a>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Travel Options</h2>
        {data?.travel_options?.map((option) => {
          return (
            <div key={option.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{option.option}</h3>
              <p>{option.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripDetails;
