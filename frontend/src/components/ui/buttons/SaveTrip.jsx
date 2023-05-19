import { useContext } from "react";
import ModalContext from "../../../utils/context/modalContext";
import { useNavigate } from "react-router-dom";


const saveTripApi = process.env.REACT_APP_SAVE_TRIP_API;
const SaveTrip = ({ setIsSaved, }) => {
  const navigate = useNavigate()
  const { setModal } = useContext(ModalContext);
  async function handleClick() {
    const response = await fetch(saveTripApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      // the trip was saved successfully
      setIsSaved(true);
      setModal("alert");
      navigate('/')
    } else if (response.status === 302) {
      // the server returned a redirect response
      window.location.href = response.headers.get("Location");
    } else {
      // there was an error saving the trip
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
