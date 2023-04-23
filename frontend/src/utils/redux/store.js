import { configureStore } from "@reduxjs/toolkit";
import itineraryReducer from "./itinerarySlice";
import placeSlice from "./placeSlice";
import accommodationSlice from "./accommodationSlice";
import localDelicacySlice from "./localDelicacySlice";
import travelOptionSlice from "./travelOptionSlice";

const store = configureStore({
  reducer: {
    itinerary: itineraryReducer,
    place: placeSlice,
    accommodation: accommodationSlice,
    localDelicacy:localDelicacySlice,
    travelOption:travelOptionSlice
  },
});

export default store;
