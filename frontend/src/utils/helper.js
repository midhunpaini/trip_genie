const registerApi = process.env.REACT_APP_GET_REGISTER_API;
const loginApi = process.env.REACT_APP_GET_LOGIN_API;
const logoutApi = process.env.REACT_APP_GET_LOGOUT_API;
const tripApi = process.env.REACT_APP_TRIPFORM_API;
const placeApi = process.env.REACT_APP_PLACES_API;

export const logoutUser = async () => {
  try {
    await fetch(logoutApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
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
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(loginApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const callPlaces = async (dispatch, addPlace) => {
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
  addPlace
) => {
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
    
    callPlaces(dispatch, addPlace);
    
  } catch (error) {
    console.log(error);
    dispatch(addItinerary({ isLoading: false, isLoadingFailed: true }));
  } 
};
