import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItinerary } from "../../utils/redux/itinerarySlice";
import Select from "../ui/Select";
import Input from "../ui/Input";
import CheckBox from "../ui/CheckBox";
import DatePicK from "../ui/DatePicK";
import { currency_type } from "../../constants";
import { travel_preferences_option } from "../../constants";
import { handleTripFormSubmit } from "../../utils/helper";
import {addPlace} from "../../utils/redux/placeSlice"

const TripForm = ({ setSubmitForm }) => {
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");
  const [interests, setInterests] = useState("");
  const [dietary_requirements, setDietaryRequirements] = useState("");
  const [destination, setDestination] = useState("");
  const [current_location, setCurrentLocation] = useState("");
  const [num_persons, setNumPersons] = useState("");
  const [group_type, setGroupType] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      start_date,
      end_date,
      budget,
      interests,
      dietary_requirements,
      destination,
      current_location,
      num_persons,
      group_type,
      currency,
    };
    handleTripFormSubmit(data, dispatch, setSubmitForm, addItinerary, addPlace);
  };
  

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="border mb-9 bg-[#f1c488b9] border-[#a56b1eb9] rounded-lg shadow-2xl shadow-[#a56b1eb9] mx-auto max-w-lg p-6"
      >
        <h2 className="text-2xl font-bold  mb-6">Plan Your Trip</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DatePicK
            label="Start Date:"
            style="w-full border border-[#a56b1eb9] p-2 rounded-md"
            value={start_date}
            setValue={setStartDate}
          />
          <DatePicK
            label="End Date:"
            style="w-full border border-[#a56b1eb9]  p-2 rounded-md"
            value={end_date}
            setValue={setEndDate}
          />
          <Input
            style="w-full border border-[#a56b1eb9]  rounded-md"
            label="Current Location:"
            value={current_location}
            setValue={setCurrentLocation}
            isGooglePlacesAutocomplete={true}
          />

          <Input
            style="w-full border border-[#a56b1eb9]  rounded-md"
            label="Destination:"
            value={destination}
            setValue={setDestination}
            isGooglePlacesAutocomplete={true}
          />
          <div className="flex">
            <Input
              style="w-full border border-[#a56b1eb9] p-2 rounded-md"
              label="Budget:"
              value={budget}
              setValue={setBudget}
            />
            <Select
              style="w-full border  border-[#a56b1eb9] p-2 rounded-md"
              label="Currency"
              value={currency}
              setValue={setCurrency}
              options={currency_type}
            />
          </div>

          <Input
            style="w-full border border-[#a56b1eb9] p-2 rounded-md"
            label="Number of Persons:"
            value={num_persons}
            setValue={setNumPersons}
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

          <Select
            style="w-full border  border-[#a56b1eb9] p-2 rounded-md"
            label="Group Type:"
            value={group_type}
            setValue={setGroupType}
            options={[
              "Friends",
              "Family",
              "Couple",
              "Solo",
              "Business",
              "Other",
            ]}
          />

          <CheckBox
            label="Travel Preference:"
            items={travel_preferences_option}
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
    </div>
  );
};

export default TripForm;
