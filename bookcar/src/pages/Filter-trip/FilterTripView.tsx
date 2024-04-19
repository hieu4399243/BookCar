import React, { Component } from "react";
import ic_close from "../../assets/images/ic_close.svg";
import TimeTripView from "./TimeTripView";
import { useNavigate } from "react-router-dom";
import "./FilterTrip.css";

// Functional component
const ImageButtons = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/list'); 
  };

  return (
    <img src={ic_close} alt="Close Icon" onClick={handleClick} />
  );
};

// Class component
class FilterTripView extends Component {
  render() {
    return (
      <div>
        <div className="flex bg-white header-filter">
          <ImageButtons />
          <h1 className="font-bold text-xl">Lọc chuyến xe</h1>
        </div>
        <div className="main-list">
          <TimeTripView />
        </div>
      </div>
    );
  }
}

export default FilterTripView;
