const registerApi = process.env.REACT_APP_GET_REGISTER_API;
const loginApi = process.env.REACT_APP_GET_LOGIN_API;
const logoutApi = process.env.REACT_APP_GET_LOGOUT_API;
const tripApi = process.env.REACT_APP_TRIPFORM_API;
const destinationApi = process.env.REACT_APP_DESTINATION_API;
const placeApi = process.env.REACT_APP_PLACES_API;
const hotelApi = process.env.REACT_APP_HOTELS_API;
const activitiesApi = process.env.REACT_APP_ACTIVITIES_API;
const delicacyApi = process.env.REACT_APP_DELICACY_API;
const travelOptionApi = process.env.REACT_APP_TRAVEL_OPTIONS_API;

export const todayDate = () => {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const validateTripForm = (data) => {
  const { start_date, end_date } = data;
  const startDateObj = new Date(start_date);
  const endDateObj = new Date(end_date);

  if (startDateObj > endDateObj) {
    throw new Error("Invalid date");
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(logoutApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } catch (error) {
    throw new Error("Logout failed");
  }
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(registerApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    return handleErrors(response);
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const submitLogin = async (email, password) => {
  const response = await fetch(loginApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail);
  }
  return data.name;
};

export const callHotels = async (dispatch, addAccomodation) => {
  console.log("calling hotel");
  try {
    const data = await fetch(hotelApi, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    console.log(json);
    dispatch(
      addAccomodation({
        data: json,
        isLoaded: true,
        isLoading: false,
      })
    );
  } catch (error) {
    dispatch(addAccomodation({ isLoading: false, isLoadingFailed: true }));
  }
};

export const callDelicacy = async (dispatch, addLocalDelicacy) => {
  console.log("calling delicacy");
  try {
    const data = await fetch(delicacyApi, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    dispatch(
      addLocalDelicacy({
        data: json,
        isLoaded: true,
        isLoading: false,
      })
    );
  } catch (error) {
    dispatch(addLocalDelicacy({ isLoading: false, isLoadingFailed: true }));
  }
};

export const callTravelOptions = async (
  dispatch,
  addTravelOption,
  addLocalDelicacy
) => {
  try {
    const data = await fetch(travelOptionApi, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    dispatch(
      addTravelOption({
        data: json,
        isLoaded: true,
        isLoading: false,
      })
    );
    callDelicacy(dispatch, addLocalDelicacy);
  } catch (error) {
    dispatch(addTravelOption({ isLoading: false, isLoadingFailed: true }));
  }
};

export const callPlaces = async (
  dispatch,
  addPlace,
  addTravelOption,
  addLocalDelicacy
) => {
  try {
    const data = await fetch(placeApi, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    dispatch(
      addPlace({
        data: json,
        isLoaded: true,
        isLoading: false,
      })
    );
    callTravelOptions(dispatch, addTravelOption, addLocalDelicacy);
  } catch (error) {
    console.log(error);
    dispatch(addPlace({ isLoading: false, isLoadingFailed: true }));
  }
};

export const handleTripFormSubmit = async (
  data,
  dispatch,
  setSubmitForm,
  addItinerary,
  addPlace,
  addTravelOption,
  addLocalDelicacy
) => {
  const error = validateTripForm(data);
  if (error) {
    return error;
  }
  setSubmitForm(true);
  try {
    dispatch(addItinerary({ isLoading: true }));
    const response = await fetch(tripApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await response.json();
    dispatch(
      addItinerary({
        data: json,
        isLoaded: true,
        isLoading: false,
      })
    );
    callPlaces(dispatch, addPlace, addTravelOption, addLocalDelicacy);
  } catch (error) {
    console.log(error);
    dispatch(addItinerary({ isLoading: false, isLoadingFailed: true }));
  }
};

export const extractDataForMap = (places) => {
  const waypoints = [];
  const markers = [];
  const len = places.length - 1;
  for (let i = 1; i < len; i++) {
    let obj = {
      location: {
        lat: Number(places[i].latitude),
        lng: Number(places[i].longitude),
      },
      stopover: true,
    };
    waypoints.push(obj);
  }
  for (let i = 0; i <= len; i++) {
    let obj = {
      position: {
        lat: Number(places[i].latitude),
        lng: Number(places[i].longitude),
      },
      title: Number(places[i].name),
    };
    markers.push(obj);
  }

  const origin = {
    lat: Number(places[0].latitude),
    lng: Number(places[0].longitude),
  };
  const destination = {
    lat: Number(places[len].latitude),
    lng: Number(places[len].longitude),
  };

  return [waypoints, markers, origin, destination];
};

export const handlesetDestinationSubmit = async (
  data,
  setSubmitForm,
  dispatch,
  addAccomodation
) => {
  const error = validateTripForm(data);
  if (error) {
    return error;
  }
  try {
    const response = await fetch(destinationApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.result === true) {
      setSubmitForm(true);
      callHotels(dispatch, addAccomodation);
    } else {
      return json;
    }
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

export const setTravelPreferences = async () => {
  try {
    console.log("inside helper");
    const data = await fetch(activitiesApi, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    return json.activities;
  } catch (error) {
    return [];
  }
};

export const groupOptions = (person, setGroupOption) => {
  person = Number(person);
  if (person === 2) {
    setGroupOption(["Couple"]);
  } else if (person === 1) {
    setGroupOption(["Solo"]);
  } else if (person > 2) {
    setGroupOption(["Friends", "Family", "Business", "Other"]);
  } else {
    setGroupOption([]);
  }
};

export const callUserTrip = async () => {
  try {
    const data = await fetch(process.env.REACT_APP_USER_TRIPS_API, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await data.json();
    return json
  } catch (error) {
    console.error("Error fetching user:", error);
    return []
  }

};
