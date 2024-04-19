import React, { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import FilterListCar from "./pages/List-car/FilterListCar";
import FilterTripView from "./pages/Filter-trip/FilterTripView";
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/list" element={<FilterListCar />} />
            <Route
              path="/filter"
              element={<FilterTripView />}
            />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
