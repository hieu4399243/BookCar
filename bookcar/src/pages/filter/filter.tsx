import React, { useState } from "react";
import { Link } from "react-router-dom";
import ic_back from "../../assets/images/ic_back.svg";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import Item from "./item";
import Slider from "./slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';


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

interface ItemProps {
  filteredTrips: Trip[];
}

const Filter: React.FC<ItemProps> = ({ filteredTrips }) => {
  const location = useLocation();
  const stateFilteredTrips: Trip[] | undefined = location.state?.filteredTrips;
  const [selectedDateIndex, setSelectedDateIndex] = useState<null | number>(
    null
  );
  const [filtered, setFiltered] = useState<Trip[]>(stateFilteredTrips || []);


  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index === selectedDateIndex ? null : index);
  };

  const sortByDepartureTimeAndDate = (trips: Trip[]) => {
    return [...trips].sort((a, b) => {
      const dateComparison = a.pick_up_date.localeCompare(b.pick_up_date);
      if (dateComparison === 0) {
        return a.departure_time.localeCompare(b.departure_time);
      }
      return dateComparison;
    });
  };

  // const sortByDiscountAmount = (trips: Trip[]) => {
  //   return [...trips].sort((a: Trip, b: Trip) => {
  //     return parseInt(a.discount_amount) - parseInt(b.discount_amount);
  //   });
  // };

  const sortRating = (trips: Trip[]) => {
    return [...trips].sort((a, b) => {
      return (
        parseFloat(a.transport_information.rating) -
        parseFloat(b.transport_information.rating)
      );
    });
  };

  const sortByDepartureTime = () => {
    const sortedTrips = sortByDepartureTimeAndDate(filteredTrips);
    setFiltered(sortedTrips);
  };

  // const sortByTicketPrice = () => {
  //   const sortedTrips = sortByDiscountAmount(filteredTrips);
  //   setFilteredTrips(sortedTrips);
  // };

  const sortByRating = () => {
    const sortedTrips = sortRating(filteredTrips);
    setFiltered(sortedTrips);
  };

  return (
    <div>
      <div className="flex p-5 bg-white items-center">
        <div style={{ marginRight: "5px" }}>
          <Link to={"/"}>
            <img src={ic_back} alt="Back" />
          </Link>
        </div>
        <div>
          <h1 className="font-bold text-xl">Chọn chuyến đi</h1>
          <h2 className="sub-title">Long Biên - An Lão</h2>
        </div>
        <div className="cancle-filter">
          <h2>Xoá lọc</h2>
        </div>
      </div>
      <div>
        <Slider/>
      </div>
      <div className="filter-button">
        <button
          className={`${
            selectedFilters.includes("departure_time") ? "selected-filter" : "button"
          }`}
          onClick={handleSortByDepartureTime}
        >
          Giờ chạy {isClickedSort && <FontAwesomeIcon icon={faArrowUp} />}
        </button>

        <button
          className={`${
            selectedFilters.includes("discount_amount") ? "selected-filter" : "button"
          }`}
          onClick={() => handleSelectFilter("discount_amount")}
        >
          Giá vé {isClickedSort && <FontAwesomeIcon icon={faArrowUp} />}
        </button>

        <button
          className={`${
            selectedFilters.includes("rating") ? "selected-filter" : "button"
          }`}
          onClick={() => handleSelectFilter("rating")}
        >
          Đánh giá {isClickedSort && <FontAwesomeIcon icon={faArrowUp} />}
        </button>

        <Link className="filter-icon" to={'/list'}>
          <button>Lọc</button>
          <img src={ic_filter_white} />
        </Link>
      </div>

      <div className="main-list">
        <Item filteredTrips={filtered}/>
      </div>
    </div>
  );
}


export default Filter;
