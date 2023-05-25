import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { addItinerary } from "../../utils/redux/itinerarySlice";
import Select from "../ui/Select";
import CheckBox from "../ui/CheckBox";
import { handleTripFormSubmit, setTravelPreferences } from "../../utils/helper";
import { addPlace } from "../../utils/redux/placeSlice";
import { ToastContainer, toast } from "react-toastify";
import TripSearchResult from "../ui/trip/TripSearchResult";
import "react-toastify/dist/ReactToastify.css";
import PreferenceShimmer from "../ui/PreferenceShimmer";
import GroupOptionContext from "../../utils/context/groupOptionContext";
import { addTravelOption } from "../../utils/redux/travelOptionSlice";
import { addLocalDelicacy } from "../../utils/redux/localDelicacySlice"

const SetPreference = () => {
  const {groupOption} = useContext(GroupOptionContext)
  const [submitForm, setSubmitForm] = useState(false);
  const [interests, setInterests] = useState("");
  const [dietary_requirements, setDietaryRequirements] = useState("");
  const [group_type, setGroupType] = useState("");
  const [travelPreferencesOption, setTravelPreferencesOptions] =useState([])
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTravelPreferences = async () => {
      const data = await setTravelPreferences() 
      setTravelPreferencesOptions(data);
      setLoading(false); 
    };
    fetchTravelPreferences(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      group_type,
      interests,
      dietary_requirements,

    };
    const errorMessage = await handleTripFormSubmit(
      data,
      dispatch,
      setSubmitForm,
      addItinerary,
      addPlace,
      addTravelOption, 
      addLocalDelicacy,
    );
    console.log(errorMessage);
    if (errorMessage === "Invalid date") {
      toast.error(errorMessage);
    }
  };
  return (
    
    <div className="bg-gray-50">
      {!loading?submitForm ? (
        <TripSearchResult/>
      ) : (
        <>
          <ToastContainer />
          <form
            onSubmit={handleSubmit}
            className="border mb-9 bg-[#f1c488b9] border-[#a56b1eb9] rounded-lg shadow-2xl shadow-[#a56b1eb9] mx-auto max-w-lg p-6"
          >
            <h2 className="text-2xl font-bold  mb-6">Plan Your Trip</h2>
            <div className="">
              <Select
                style="w-full border  border-[#a56b1eb9] p-2 rounded-md"
                label="Group Type:"
                value={group_type}
                setValue={setGroupType}
                options={groupOption}
              />

              <Select
                style="w-full border  border-[#a56b1eb9] p-2 rounded-md"
                label="Dietary Requirements:"
                value={dietary_requirements}
                setValue={setDietaryRequirements}
                options={[
                  "Vegetarian",
                  "Vegan",
                  "Non-Vegetarian",
                  "Gluten free",
                  "Others",
                ]}
              />

              <CheckBox
                label="Travel Preference:"
                items={travelPreferencesOption}
                values={interests}
                setValues={setInterests}
              />
            </div>
            <button
              className="bg-[#a56b1eb9] hover:bg-[#f1c488b9] border-2  hover:border-[#a56b1eb9] text-white hover:text-[#a56b1eb9] font-bold py-2 px-4 rounded-md mt-6"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      ):<PreferenceShimmer/>}
      
    </div>
  );
};

export default SetPreference;
