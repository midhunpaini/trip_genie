import { createSlice } from "@reduxjs/toolkit";

const initialValue = [];
const userTripSlice = createSlice({
  name: "userTrips",
  initialState: { value: initialValue },
  reducers: {
    addUserTrips: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addUserTrips } = userTripSlice.actions;

export default userTripSlice.reducer;
