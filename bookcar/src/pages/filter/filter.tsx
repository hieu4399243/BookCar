import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ic_back from "../../assets/images/ic_back.svg";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import Item from "./item";
import Slider from "./slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

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
  const [initialData, setInitialData] = useState<Trip[]>(
    stateFilteredTrips || []
  );
  const [filtered, setFiltered] = useState<Trip[]>(stateFilteredTrips || []);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortDirectionDeparture, setSortDirectionDeparture] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionRating, setSortDirectionRating] = useState<
    "asc" | "desc" | null
  >(null);
  const [sortDirectionDiscount, setSortDirectionDiscount] = useState<
    "asc" | "desc" | null
  >(null);

  const sortByDepartureTimeAndDate = (a: Trip, b: Trip) => {
    const dateComparison = a.pick_up_date.localeCompare(b.pick_up_date);
    if (dateComparison === 0) {
      return a.departure_time.localeCompare(b.departure_time);
    }
    return dateComparison;
  };

  const sortRating = (a: Trip, b: Trip) => {
    return (
      parseFloat(a.transport_information.rating) -
      parseFloat(b.transport_information.rating)
    );
  };

  const handleSort = (field: string) => {
    let newSortDirection: "asc" | "desc" | null = null;

    let sortedTrips: Trip[] = [...filtered];

    if (field === "departure_time") {
      newSortDirection = sortDirectionDeparture === "asc" ? "desc" : "asc";
      setSortDirectionDeparture(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? sortByDepartureTimeAndDate(a, b)
          : sortByDepartureTimeAndDate(b, a)
      );
      setSelectedFilters(["departure_time"]);
    } else if (field === "rating") {
      newSortDirection = sortDirectionRating === "asc" ? "desc" : "asc";
      setSortDirectionRating(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc" ? sortRating(a, b) : sortRating(b, a)
      );
      setSelectedFilters(["rating"]);
    } else if (field === "discount_amount") {
      newSortDirection = sortDirectionDiscount === "asc" ? "desc" : "asc";
      setSortDirectionDiscount(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? a.discount_amount - b.discount_amount
          : b.discount_amount - a.discount_amount
      );
      setSelectedFilters(["discount_amount"]);
    }

    setFiltered(sortedTrips);
  };

  const handCancle = () => {
    setSelectedFilters([]);
    setSortDirectionDeparture(null);
    setSortDirectionRating(null);
    setSortDirectionDiscount(null);
    setFiltered(initialData);
  };

  return (
    <div>
      <div className="header-filter-list">
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
          <div
            className="cancle-filter"
            style={{ display: selectedFilters.length > 0 ? "block" : "none" }}
          >
            <h2 onClick={() => handCancle()}>Xoá lọc</h2>
          </div>
        </div>
        <div>
          <Slider />
        </div>
        <div className="filter-button">
          <button
            className={`${
              selectedFilters.includes("departure_time")
                ? "selected-filter"
                : "button"
            }`}
            onClick={() => handleSort("departure_time")}
          >
            Giờ chạy{" "}
            {sortDirectionDeparture === "asc" && (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
            {sortDirectionDeparture === "desc" && (
              <FontAwesomeIcon icon={faArrowDown} />
            )}
          </button>

          <button
            className={`${
              selectedFilters.includes("discount_amount")
                ? "selected-filter"
                : "button"
            }`}
            onClick={() => handleSort("discount_amount")}
          >
            Giá vé{" "}
            {sortDirectionDiscount === "asc" && (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
            {sortDirectionDiscount === "desc" && (
              <FontAwesomeIcon icon={faArrowDown} />
            )}
          </button>

          <button
            className={`${
              selectedFilters.includes("rating") ? "selected-filter" : "button"
            }`}
            onClick={() => handleSort("rating")}
          >
            Đánh giá{" "}
            {sortDirectionRating === "asc" && (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
            {sortDirectionRating === "desc" && (
              <FontAwesomeIcon icon={faArrowDown} />
            )}
          </button>

          <Link className="filter-icon" to={"/list"}>
            <button>Lọc</button>
            <img src={ic_filter_white} alt="Filter" />
          </Link>
        </div>
      </div>

      <div className="main-list-filter">
        <Item filteredTrips={filtered} />
      </div>
    </div>
  );
};

export default Filter;
