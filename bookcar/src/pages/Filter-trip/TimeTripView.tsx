import React, { useState, useEffect } from "react";
import PriceView from "./PriceTripView";
import TimeOption from "../../components/TimeOption";
import GarageListItem from "../../components/List/GarageListItem";
import VehicleListItem from "../../components/List/VehicleListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredTrips,
  setAppliedFilter,
} from "../../stores/Features/Slices/FilterTripSlice";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import data from "../../constants/locchuyenxe.json";
import { Trip } from "../TripModels";
import { useNavigate } from "react-router-dom";

export default function TimeTripView() {
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
  const [tempFilteredTrips, setTempFilteredTrips] =
    useState(groupedTripsLength);
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

  const uniqueTransportNames: { name: string; imageUrl: string }[] = [];
  const seenTransportNames = new Set<string>();

  data.json.coreData.data.forEach((trip: Trip) => {
    const transportName = trip.transport_information.name;
    if (!seenTransportNames.has(transportName)) {
      uniqueTransportNames.push({
        name: transportName,
        imageUrl: trip.transport_information.image_url,
      });
      seenTransportNames.add(transportName);
    }
  });

  const allVehicleNames = Array.from(
    new Set(data.json.coreData.data.map((trip: Trip) => trip.vehicle_name))
  );

  const isOptionSelected = (time: string) => selectedTime.includes(time);

  const handleCheckBoxByVehicle = (name: string) => {
    const updatedVehicleCheckboxes = vehicleCheckboxes.includes(name)
      ? vehicleCheckboxes.filter((checkbox) => checkbox !== name)
      : [...vehicleCheckboxes, name];
    setVehicleCheckboxes(updatedVehicleCheckboxes);
  };

  const handleCheckBoxByGarage = (name: string) => {
    const updatedGarageCheckboxes = garageCheckboxes.includes(name)
      ? garageCheckboxes.filter((checkbox) => checkbox !== name)
      : [...garageCheckboxes, name];
    setGarageCheckboxes(updatedGarageCheckboxes);
  };

  const timeOptions: { time: string; label: string }[] = [
    { time: "morning", label: "Sáng sớm" },
    { time: "noon", label: "Buổi sáng" },
    { time: "afternoon", label: "Buổi trưa" },
    { time: "evening", label: "Buổi tối" },
  ];

  return (
    <div>
      <div>
        <h2 className="px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

        <div className="grid grid-cols-2 main-grid">
          {timeOptions.map(({ time, label }, index) => (
            <TimeOption
              key={index}
              isSelected={isOptionSelected(time)}
              time={time}
              handleFilter={handleFilter}
              label={label}
            />
          ))}
        </div>

        <PriceView setPriceRange={setPriceRange} priceRange={priceRange} />

        <div className="garage">
          <div>
            <h2 className="font-semibold mb-3">Nhà xe</h2>
          </div>
          <div>
            <div className="garage-list">
              <ul>
                {uniqueTransportNames.map((item, index) => (
                  <GarageListItem
                    key={index}
                    item={item}
                    isChecked={garageCheckboxes.includes(item.name)}
                    handleCheckBox={handleCheckBoxByGarage}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="category-car">
          <div>
            <h2 className="font-semibold mb-3">Loại xe</h2>
          </div>
          <div>
            <div className="vertical-list">
              <ul>
                {allVehicleNames.map((name, index) => (
                  <VehicleListItem
                    key={index}
                    name={name}
                    vehicleCheckboxes={vehicleCheckboxes.includes(name)}
                    handleCheckBox={handleCheckBoxByVehicle}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-list">
          <button className="button-left" onClick={handleCancel}>
            Xoá lọc
          </button>
          <button className="button-right" onClick={applyFilters}>
            Áp dụng(
            {tempFilteredTrips && tempFilteredTrips.length
              ? tempFilteredTrips.length
              : 0}
            )
          </button>
        </div>
      </div>
    </div>
  );
}
