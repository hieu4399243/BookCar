import { createSlice } from "@reduxjs/toolkit";

const filteredTripsSlice = createSlice({
    name: "filteredTrips",
    initialState: {
      filteredTrips: [],
      appliedFilter: null
    },
    reducers: {
      setFilteredTrips: (state, action) => {
        state.filteredTrips = action.payload;
      },
      setAppliedFilter: (state, action) =>{
        state.appliedFilter = action.payload;
      }
    },
  });
  

export const { setFilteredTrips, setAppliedFilter } = filteredTripsSlice.actions;
export default filteredTripsSlice.reducer;
