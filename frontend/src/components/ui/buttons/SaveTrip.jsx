import { useContext } from "react";
import ModalContext from "../../../utils/context/modalContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callUserTrip } from "../../../utils/helper";
import { addUserTrips } from "../../../utils/redux/userTripSlice"
import Alert from "../Alert";
import { addAccomodation, setInitial } from "../../../utils/redux/accommodationSlice";

const saveTripApi = process.env.REACT_APP_SAVE_TRIP_API;
const SaveTrip = ({ setIsSaved, }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { setModal } = useContext(ModalContext);
  async function handleClick() {
    const response = await fetch(saveTripApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      setIsSaved(true);
      const trips = await callUserTrip();
      dispatch(addUserTrips(trips));
      dispatch(setInitial())
      localStorage.setItem('trips', JSON.stringify(trips));
      <Alert/>
      navigate('/saved_trips')
    } else if (response.status === 302) {
      window.location.href = response.headers.get("Location");
    } else {
      console.error("Failed to save trip:", response.statusText);
      setModal("error");
    }
  }
  

  return (
    <div className="flex justify-center items-center my-5">
      <button
        onClick={handleClick}
        className="bg-[#a57c48] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#8b623f] transition-colors duration-300"
      >
        Save Trip
      </button>
    </div>
  );
};

export default SaveTrip;
