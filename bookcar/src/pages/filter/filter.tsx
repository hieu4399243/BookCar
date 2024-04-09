import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ic_back from "../../assets/images/ic_back.svg";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import Item from "./item";
import Slider from "./slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/spinner";
import { useSelector } from "react-redux";
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

const Filter = () => {
  const filteredTrips = useSelector((state: any) => state.filteredTrips.filteredTrips);
  const appliedFilter = useSelector(
    (state: any) => state.filteredTrips.appliedFilter.filterApplied
  );
  console.log(appliedFilter);
  const [initialData, setInitialData] = useState<Trip[]>(filteredTrips);
  const [filtered, setFiltered] = useState<Trip[]>(filteredTrips || []);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedButton, setSelectedButton] = useState<string>(""); 

  useEffect(() => {
    if (filteredTrips) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

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

  const sortTripsAndUpdate = (
    trips: Trip[],
    direction: "asc" | "desc" | null,
    field: string
  ) => {
    let sortedTrips = [...trips];
    if (field === "departure_time") {
      sortedTrips.sort((a, b) =>
        direction === "asc"
          ? sortByDepartureTimeAndDate(a, b)
          : sortByDepartureTimeAndDate(b, a)
      );
    } else if (field === "rating") {
      sortedTrips.sort((a, b) =>
        direction === "asc" ? sortRating(a, b) : sortRating(b, a)
      );
    } else if (field === "discount_amount") {
      sortedTrips.sort((a, b) =>
        direction === "asc"
          ? a.discount_amount - b.discount_amount
          : b.discount_amount - a.discount_amount
      );
    }
    setFiltered(sortedTrips);
    setLoading(false);
  };

  const handleSort = (field: string) => {
    setLoading(true);
    let newSortDirection: "asc" | "desc" | null = null;

    let sortedTrips: Trip[] = [...filtered];
    let updatedFilters: string[] = [];
    let selectedButtonIcon = "";
    if (field === "departure_time") {
      newSortDirection = sortDirectionDeparture === "asc" ? "desc" : "asc";
      setSortDirectionDeparture(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? sortByDepartureTimeAndDate(a, b)
          : sortByDepartureTimeAndDate(b, a)
      );
      updatedFilters = ["departure_time"];
      selectedButtonIcon = "sortDirectionDeparture";
    } else if (field === "rating") {
      newSortDirection = sortDirectionRating === "asc" ? "desc" : "asc";
      setSortDirectionRating(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc" ? sortRating(a, b) : sortRating(b, a)
      );
      updatedFilters = ["rating"];
      selectedButtonIcon = "sortDirectionRating";
    } else if (field === "discount_amount") {
      newSortDirection = sortDirectionDiscount === "asc" ? "desc" : "asc";
      setSortDirectionDiscount(newSortDirection);
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? a.discount_amount - b.discount_amount
          : b.discount_amount - a.discount_amount
      );
      updatedFilters = ["discount_amount"];
      selectedButtonIcon = "sortDirectionDiscount";
    }

    setSelectedFilters(updatedFilters);
    setSelectedButton(selectedButtonIcon);
    sortTripsAndUpdate(sortedTrips, newSortDirection, field);
  };

  const handCancle = () => {
    setSelectedFilters([]);
    setSelectedButton("");
    setSortDirectionDeparture(null);
    setSortDirectionRating(null);
    setSortDirectionDiscount(null);
    setFiltered(initialData);
  };

  return (
    <div>
      <div
        className={
          !loading ? "header-filter-list" : "header-filter-list overlay-content"
        }
      >
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
            style={{
              display: selectedFilters.length > 0 ? "block" : "none",
            }}
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
              selectedFilters.includes("departure_time") &&
              selectedButton === "sortDirectionDeparture"
                ? "selected-filter"
                : "button"
            }`}
            onClick={() => handleSort("departure_time")}
          >
            Giờ chạy{" "}
            {selectedButton === "sortDirectionDeparture" &&
              (sortDirectionDeparture === "asc" ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              ))}
          </button>
          <button
            className={`${
              selectedFilters.includes("discount_amount") &&
              selectedButton === "sortDirectionDiscount"
                ? "selected-filter"
                : "button"
            }`}
            onClick={() => handleSort("discount_amount")}
          >
            Giá vé{" "}
            {selectedButton === "sortDirectionDiscount" &&
              (sortDirectionDiscount === "asc" ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              ))}
          </button>
          <button
            className={`${
              selectedFilters.includes("rating") &&
              selectedButton === "sortDirectionRating"
                ? "selected-filter"
                : "button"
            }`}
            onClick={() => handleSort("rating")}
          >
            Đánh giá{" "}
            {selectedButton === "sortDirectionRating" &&
              (sortDirectionRating === "asc" ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              ))}
          </button>

          <Link
            className={`${appliedFilter ? "filter-selected" : "filter-icon"}`}
            to={"/list"}
          >
            <button>Lọc</button>
            <img src={ic_filter_white} alt="Filter" />
          </Link>
        </div>
      </div>

      {!loading && (
        <div className={!loading ? "main-list-filter" : "main-list-filter"}>
          <Item filteredTrips={filtered} />
        </div>
      )}

      {loading && <Spinner />}
    </div>
  );
};

export default Filter;
