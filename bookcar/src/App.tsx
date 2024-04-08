import React from "react";
import "./App.css";
import {
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Main from "./pages/home/main";
import Filter from "./pages/filter/filter";
import List from "./pages/listCar/list";

interface Trip {
  uuid: string;
  name: string;
  departure_time: string;
  pick_up_date: string;
  vehicle_name: string;
  duration_in_min: number;
  merchant_start_point_name: string;
  merchant_end_point_name: string;
  transport_information: {
    image_url: string;
    rating: string;
    name: string;
  };
  discount_amount: number;
}

// Example data
const data: Trip[] = [
];



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/filter" element={<Filter filteredTrips={data} />} /> 
        <Route path="/list" element={<List />} />
\      </Routes>
    </div>
  );
}

export default App;
