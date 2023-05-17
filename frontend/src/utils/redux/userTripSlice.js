import { createSlice } from "@reduxjs/toolkit";

const initialValue = [];
const userTripSlice = createSlice({
  name: "userTrips",
  initialState: { value: initialValue },
  reducers: {
    addUserTrips: (state, action) => {
      state.value = action.payload;
      console.log(state,'state')
      console.log(action, 'action')
    },
  },
});

export const { addUserTrips } = userTripSlice.actions;

export default userTripSlice.reducer;
