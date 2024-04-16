import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import ListCar from "../List-car/ListCar";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import data from "../../constants/locchuyenxe.json";
import SortButton from "../../components/SortButton";
import FilterHeader from "../../components/FilterHeader";
import { Trip } from "../TripModels";
import "./ListCar.css"

const FilterListCar = () => {
  const trip = data.json.coreData.data;
  const filteredTrips = useSelector(
    (state: any) => state.filteredTrips.filteredTrips
  );
  const appliedFilter = useSelector(
    (state: any) => state.filteredTrips.appliedFilter.filterApplied
  );
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
  const [selectedButton, setSelectedButton] = useState<string>("");

  const buttonConfigs = [
    {
      label: "Giờ chạy",
      field: "departure_time",
      selected: selectedFilters.includes("departure_time"),
      sortDirection: sortDirectionDeparture,
    },
    {
      label: "Giá vé",
      field: "discount_amount",
      selected: selectedFilters.includes("discount_amount"),
      sortDirection: sortDirectionDiscount,
    },
    {
      label: "Đánh giá",
      field: "rating",
      selected: selectedFilters.includes("rating"),
      sortDirection: sortDirectionRating,
    },
  ];

  useEffect(() => {
    if (appliedFilter === true) {
      setFiltered(filteredTrips);
    } else {
      setFiltered(trip);
    }
  }, [appliedFilter, filteredTrips, trip]);

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
  };

  const _handleSort = (field: string) => {
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

  const _handCancle = () => {
    setSelectedFilters([]);
    setSelectedButton("");
    setSortDirectionDeparture(null);
    setSortDirectionRating(null);
    setSortDirectionDiscount(null);
    if (appliedFilter === true) {
      setFiltered(filteredTrips);
    } else {
      setFiltered(trip);
    }
  };

 
  return (
    <div>
      <div className="header-filter-list">
        <FilterHeader
          title="Chọn chuyến đi"
          subTitle="Long Biên - An Lão"
          onCancel={_handCancle}
        />
        <div>
          <Slider />
        </div>
        <div className="filter-button">
          {buttonConfigs.map((item, index) => (
            <SortButton
              key={index}
              label={item.label}
              selected={item.selected}
              onClick={() => _handleSort(item.field)}
              sortDirection={item.sortDirection}
            />
          ))}

          <Link
            className={`${appliedFilter ? "filter-selected" : "filter-icon"}`}
            to={"/list"}
          >
            <button>Lọc</button>
            <img src={ic_filter_white} alt="Filter" />
          </Link>
        </div>
      </div>

      <div className="main-list-filter">
        <ListCar filteredTrips={filtered} />
      </div>
    </div>
  );
};

export default FilterListCar;
