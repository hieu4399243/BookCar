import React from "react";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import FilterListCar from "./pages/List-car/FilterListCar";
import FilterTripView from "./pages/Filter-trip/FilterTripView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/filter" element={<FilterListCar />} />
        <Route path="/list" element={<FilterTripView />} />
      </Routes>
    </div>
  );
}

export default App;
