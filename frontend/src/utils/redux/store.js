import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import placeSlice from "./placeSlice";
import accommodationSlice from "./accommodationSlice";
import localDelicacySlice from "./localDelicacySlice";
import travelOptionSlice from "./travelOptionSlice";
import destinationSlice from "./destinationSlice";
import userTripSlice from "./userTripSlice";

const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    place: placeSlice,
    accommodation: accommodationSlice,
    localDelicacy:localDelicacySlice,
    travelOption:travelOptionSlice,
    destination:destinationSlice,
    userTrips:userTripSlice,
  },
});

export default store;
