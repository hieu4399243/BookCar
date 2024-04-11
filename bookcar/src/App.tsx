import React from "react";
import "./App.css";
import {
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Main from "./pages/home/main";
import Filter from "./pages/list-car/filter";
import ListView from "./pages/filter-trip/View/ListView";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/filter" element={<Filter />} /> 
        <Route path="/list" element={<ListView />} />
      </Routes>
    </div>
  );
}

export default App;
