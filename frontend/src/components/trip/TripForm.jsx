import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTrip } from "../../utils/redux/tripSlice";

const TripForm = ({ setSubmitForm }) => {
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travel_preferences, setTravelPreferences] = useState("");
  const [dietary_requirements, setDietaryRequirements] = useState("");
  const [destination, setDestination] = useState("");
  const [current_location, setCurrentLocation] = useState("");
  const [num_persons, setNumPersons] = useState("");
  const [group_type, setGroupType] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(addTrip({ isLoading: true }));
    e.preventDefault();
    setSubmitForm(true);
    const data = {
      start_date,
      end_date,
      budget,
      travel_preferences,
      dietary_requirements,
      destination,
      current_location,
      num_persons,
      group_type,
    };
    fetch("http://localhost:8000/trip/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTrip({ isLoaded:true, isLoading: false, data: data }));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(addTrip({ isLoading: false, isLoadingFailed: true }));
      });
  };

  return (
    <div className="bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="border mb-9 bg-[#f1c488b9] border-[#a56b1eb9] rounded-lg shadow-2xl shadow-[#a56b1eb9] mx-auto max-w-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Plan Your Trip</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-2">Start Date:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">End Date:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Budget:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Travel Preferences:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Beach"
                  checked={travel_preferences.includes("Beach")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTravelPreferences([
                        ...travel_preferences,
                        e.target.value,
                      ]);
                    } else {
                      setTravelPreferences(
                        travel_preferences.filter(
                          (pref) => pref !== e.target.value
                        )
                      );
                    }
                  }}
                />{" "}
                Beach
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Mountain"
                  checked={travel_preferences.includes("Mountain")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTravelPreferences([
                        ...travel_preferences,
                        e.target.value,
                      ]);
                    } else {
                      setTravelPreferences(
                        travel_preferences.filter(
                          (pref) => pref !== e.target.value
                        )
                      );
                    }
                  }}
                />{" "}
                Mountain
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="city"
                name="travel_preferences"
                value="city"
                checked={travel_preferences.includes("city")}
                onChange={(e) =>
                  setTravelPreferences(
                    e.target.checked
                      ? [...travel_preferences, e.target.value]
                      : travel_preferences.filter(
                          (preference) => preference !== e.target.value
                        )
                  )
                }
              />
              <label htmlFor="city">City</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="countryside"
                name="travel_preferences"
                value="countryside"
                checked={travel_preferences.includes("countryside")}
                onChange={(e) =>
                  setTravelPreferences(
                    e.target.checked
                      ? [...travel_preferences, e.target.value]
                      : travel_preferences.filter(
                          (preference) => preference !== e.target.value
                        )
                  )
                }
              />
              <label htmlFor="countryside">Countryside</label>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">
              Dietary Requirements:
            </label>
            <select
              className="w-full border  border-[#a56b1eb9] p-2 rounded-md"
              value={dietary_requirements}
              onChange={(e) => setDietaryRequirements(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-bold mb-2">Destination:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Current Location:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="text"
              value={current_location}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Number of Persons:</label>
            <input
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              type="text"
              value={num_persons}
              onChange={(e) => setNumPersons(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-bold mb-2" htmlFor="group-type-select">
              Group Type:
            </label>
            <select
              id="group-type-select"
              className="w-full border border-[#a56b1eb9] p-2 rounded-md"
              value={group_type}
              onChange={(e) => setGroupType(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
              <option value="Couple">Couple</option>
              <option value="Solo">Solo</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
