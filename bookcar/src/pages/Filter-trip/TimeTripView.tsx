import React, { useState, useEffect } from "react";
import data from "../../constants/locchuyenxe.json";
import PriceView from "./PriceTripView";
import { Trip } from "../TripModels";
import { useFilterTripModels } from "./FilterTripModels";
import TimeOption from "../../components/TimeOption";
import GarageListItem from "../../components/List/GarageListItem";
import VehicleListItem from "../../components/List/VehicleListItem";

export default function TimeView() {
  const {
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
    tempFilteredTrips,
    handleCancel,
    handleFilter,
  } = useFilterTripModels();

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
    <div className="">
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
