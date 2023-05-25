import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserTrips } from "../utils/redux/userTripSlice";
import { callUserTrip } from "../utils/helper";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import UserContext from "../utils/context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const SavedTrips = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDeleteTripId, setConfirmDeleteTripId] = useState(null);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const trip_data = useSelector((store) => store.userTrips.value);
  const [trips, setTrips] = useState(trip_data);

  const handleDeleteTrip = (event, tripId) => {
    event.stopPropagation();
    setConfirmDeleteTripId(tripId);
  };

  const confirmDeleteTrip = async () => {
    try {
      await fetch(process.env.REACT_APP_DELETE_TRIP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: confirmDeleteTripId,
        }),
      });

      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== confirmDeleteTripId));
      dispatch(addUserTrips(trips));
      setConfirmDeleteTripId(null);
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  const cancelDeleteTrip = () => {
    setConfirmDeleteTripId(null);
  };

  const handleViewTrip = (event, tripId) => {
    event.stopPropagation();
    window.open(`/show_trip/${tripId}`, "_blank");
  };



  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto mt-[5rem] py-10 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips?.map((trip) => (
            <div
              key={trip.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition duration-300 transform ${
                trip.isDeleted ? "opacity-50" : "hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              <div className="relative">
                {isLoading ? (
                  <div className="w-full h-56 bg-gray-200 animate-pulse"></div>
                ) : (
                  <>
                    <img
                      className="w-full h-56 object-cover"
                      src={trip.places[0].image_url}
                      alt={trip.destination}
                      onClick={(event) => handleViewTrip(event, trip.id)}
                    />
                    {!trip.isDeleted && (
                      <button
                        className="z-50 absolute top-2 right-2 p-2 hover:bg-red-500 text-white rounded-full transition duration-300"
                        onClick={(event) => handleDeleteTrip(event, trip.id)}
                      >
                        <AiFillDelete />
                      </button>
                    )}
                    {!trip.isDeleted && (
                      <div
                        className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                        onClick={(event) => handleViewTrip(event, trip.id)}
                      ></div>
                    )}
                    <div className="absolute bottom-2 left-2 text-white text-xl font-semibold">
                      {trip.destination}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {confirmDeleteTripId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-700 mb-6">Are you sure you want to delete this trip?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-lg"
                onClick={cancelDeleteTrip}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={confirmDeleteTrip}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SavedTrips;
