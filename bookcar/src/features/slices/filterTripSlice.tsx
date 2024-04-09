import { createSlice } from "@reduxjs/toolkit";



const filteredTripsSlice = createSlice({
    name: "filteredTrips",
    initialState: [],
    reducers: {
      setFilteredTrips: (state, action) => {
        return action.payload;
      },
    },
  });
  

export const { setFilteredTrips } = filteredTripsSlice.actions;
export default filteredTripsSlice.reducer;
