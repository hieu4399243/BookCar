import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredTrips,setAppliedFilter
} from "../../stores/Features/Slices/FilterTripSlice";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import data from "../../constants/locchuyenxe.json";
import { Trip } from "../TripModels";
import { useNavigate } from "react-router-dom";


export function useFilterTripModels() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const appliedFilter = useSelector(
    (state: any) => state.filteredTrips.appliedFilter.filter
  );
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [vehicleCheckboxes, setVehicleCheckboxes] = useState<string[]>([]);
  const [garageCheckboxes, setGarageCheckboxes] = useState<string[]>([]);
  const groupedTrips = groupTripsByTimeOfDate(data.json.coreData.data);
  const groupedTripsLength = data.json.coreData.data;
  const [tempFilteredTrips, setTempFilteredTrips] = useState(groupedTripsLength);
  const [clickedOption, setClickedOption] = useState<string | null>(null);

  useEffect(() => {
    if (appliedFilter) {
      setSelectedTime(appliedFilter.selectedTime);
      setPriceRange(appliedFilter.priceRange);
      setVehicleCheckboxes(appliedFilter.vehicleCheckboxes);
      setGarageCheckboxes(appliedFilter.garageCheckboxes);
    }
  }, [appliedFilter]);

  useEffect(() => {
    let currentFilteredTrips = data.json.coreData.data;
    if (selectedTime.length > 0) {
      currentFilteredTrips = selectedTime.reduce(
        (acc: Trip[], time: string) => {
          return acc.concat(groupedTrips[time] || []);
        },
        []
      );
    }

    currentFilteredTrips = currentFilteredTrips.filter((trip: Trip) => {
      return (
        trip.discount_amount >= priceRange[0] &&
        trip.discount_amount <= priceRange[1] &&
        (vehicleCheckboxes.length === 0 ||
          vehicleCheckboxes.includes(trip.vehicle_name)) &&
        (garageCheckboxes.length === 0 ||
          garageCheckboxes.includes(trip.transport_information.name))
      );
    });

    const timerId = setTimeout(() => {
      setTempFilteredTrips(currentFilteredTrips);
    }, 500);

    return () => clearTimeout(timerId);
  }, [
    selectedTime,
    priceRange,
    garageCheckboxes,
    vehicleCheckboxes,
    groupedTrips,
  ]);

  const applyFilters = () => {
      const appliedFilters = {
      selectedTime: selectedTime,
      priceRange: priceRange,
      vehicleCheckboxes: vehicleCheckboxes,
      garageCheckboxes: garageCheckboxes,
    };
    dispatch(setFilteredTrips(tempFilteredTrips));
    dispatch(setAppliedFilter(appliedFilters));
    navigate("/filter");
  };

  const handleCancel = () => {
    setClickedOption(null);
    setSelectedTime([]);
    dispatch(setFilteredTrips(groupedTripsLength));
    setPriceRange([0, 3000000]);
    setVehicleCheckboxes([]);
    setGarageCheckboxes([]);
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    time: string
  ) => {
    const updateSelectedTime = selectedTime.includes(time)
      ? selectedTime.filter((t) => t !== time)
      : [...selectedTime, time];
    setSelectedTime(updateSelectedTime);
    setClickedOption(time === clickedOption ? null : time);
  };

  return {
    selectedTime,
    setSelectedTime,
    priceRange,
    setPriceRange,
    vehicleCheckboxes,
    setVehicleCheckboxes,
    garageCheckboxes,
    setGarageCheckboxes,
    groupedTripsLength,
    applyFilters,
    handleCancel,
    tempFilteredTrips,
    handleFilter
  };
}
