import { combineReducers } from 'redux';
import filteredTripsReducer from '../Features/Slices/FilterTripSlice';

const rootReducer = combineReducers({
  filteredTrips: filteredTripsReducer,
});

export default rootReducer;
