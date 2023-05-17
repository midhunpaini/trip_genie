import { useContext, useEffect, useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { Navigate } from "react-router-dom";
import UserContext from "../utils/context/userContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserTrips } from "../utils/redux/userTripSlice";
import { callUserTrip } from "../utils/helper";


const SavedTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useContext(UserContext);
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function getUserTrips() {
      const data = await callUserTrip();
      setTrips(data);
    }
    getUserTrips();
    setIsLoading(false);
  }, []);

  const handleDeleteTrip = async (tripId) => {
    try {
      // Perform the delete trip request here
      await fetch(process.env.REACT_APP_DELETE_TRIP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
        }),
      });
      // Update the trips state by removing the deleted trip
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      dispatch(addUserTrips(trips));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto mb-6 mt-[7.5rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips?.map((trip) => (
            <div
              key={trip.id}
              className="flex flex-col items-center shadow-lg border-black p-4"
            >
              {isLoading ? (
                <div className="w-48 h-48 rounded-md mb-4 bg-slate-300 animate-pulse"></div>
              ) : (
                <img
                  className="w-48 h-48 rounded-md mb-4"
                  src={trip.places[0].image_url}
                  alt={trip.destination}
                />
              )}

              <h2 className="text-xl mb-2">{trip.destination}</h2>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleDeleteTrip(trip.id)}
                >
                  Delete Trip
                </button>
                <Link to={`/show_trip/${trip.id}`} target="_blank">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                    Show Trip
                  </button>
                </Link>
         
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavedTrips;
