import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading: false,
  isLoaded: false,
  isFailedLoading: false,
  data: [],
};

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState: { value: initialValue },
  reducers: {
    addItinerary: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addItinerary } = itinerarySlice.actions;

export default itinerarySlice.reducer;
