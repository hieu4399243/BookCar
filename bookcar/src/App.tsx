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


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/filter" element={<Filter/>}></Route>
        <Route path="/list" element={<List/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
