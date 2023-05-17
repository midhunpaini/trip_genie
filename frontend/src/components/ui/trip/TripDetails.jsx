import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TripDetails = () => {
  const { id } = useParams();
  const storedTrips = localStorage.getItem("trips");
  const trips = storedTrips ? JSON.parse(storedTrips) : [];
  const data = trips.find((trip) => trip.id.toString() === id.toString());

  return (
    <div className="bg-gray-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Trip Itinerary</h1>

      <div className="">
        <div className="md:w-1/2 md:pr-4 mb-8 ">
          <section id="trip-detail">
            <h2 className="text-2xl font-semibold mb-4">Trip Details</h2>
            <p>
              <strong>Current location:</strong> {data?.current_location}
            </p>
            <p>
              <strong>Destination:</strong> {data?.destination}
            </p>
            <p>
              <strong>Start date:</strong> {data?.start_date}
            </p>
            <p>
              <strong>End date:</strong> {data?.end_date}
            </p>
            <p>
              <strong>Budget:</strong> {data?.budget} {data?.currency}
            </p>
          </section>
        </div>
        <section id="itinerary" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>
          <ul className="list-disc pl-8">
            {data?.itinerary[0]?.itinerary?.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </section>
        <div>
          <section id="places-to-visit" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Places to Visit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data?.places?.map((place) => {
                return (
                  <div
                    key={place.id}
                    className="place-card bg-white rounded-lg shadow-md p-4"
                  >
                    <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
                    <img
                      src={place.image_url}
                      alt="Place 1"
                      className="min-w-[30rem] max-h-[20rem]  mb-2 rounded-md"
                    />
                    <p>{place.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="local-delicacy" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Local Delicacy</h2>
            {data?.local_delicacy?.map((delicacy) => {
              return (
                <div key={delicacy.id} className="delicacy mb-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {delicacy.name}
                  </h3>
                  <p>{delicacy.description}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>

      <section id="hotel-options" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hotel Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.hotels?.map((hotel) => {
            return (
              <div
                key={hotel.id}
                className="wrapper bg-gray-400 rounded-lg shadow-md"
              >
                <div>
                  <Link
                    to={hotel.hotel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={hotel.image_url}
                      alt="random image"
                      className="w-full object-cover object-center rounded-t-lg"
                    />
                  </Link>
                  <div className="relative px-4 -mt-16">
                    <div className="bg-white p-6 rounded-b-lg shadow-lg">
                      <div className="flex items-baseline">
                        <span>
                          <button className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase font-semibold tracking-wide">
                            <Link
                              to={hotel.booking_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Book Now
                            </Link>
                          </button>
                        </span>
                      </div>

                      <p className="mt-1 font-semibold uppercase truncate">
                        {hotel.name}
                      </p>

                      <div className="mt-1">{hotel.price}</div>
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
          })}
        </div>
      </section>

      <section id="travel-options">
        <h2 className="text-2xl font-semibold mb-4">Travel Options</h2>
        {data?.travel_options?.map((option) => {
          return (
            <div key={option.id} className="option mb-4">
              <h3 className="text-xl font-semibold mb-2">{option.option}</h3>
              <p>{option.description}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default TripDetails;
