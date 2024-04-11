import React, { useState, useEffect } from "react";
import data from "../../../constants/locchuyenxe.json";
import PriceView from "./PriceView";
import ic_select from "../../../assets/images/ic_select.svg";
import ic_selected from "../../../assets/images/ic_selected.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { Trip } from "../Models/TripModels";
import { useTimeViewModel } from "../ViewModels/TimeViewModels";


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
    handleFilter
  } = useTimeViewModel();

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

  const handleCheckBox = (name: string) => {
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

  return (
    <div className="">
      <div>
        <h2 className="px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

        <div className="grid grid-cols-2 main-grid">
          <div
            className={`time-option ${
              isOptionSelected("morning") ? "time-option-choose" : ""
            }`}
            onClick={(e) => handleFilter(e, "morning")}
            data-time="morning"
          >
            <button className="font-normal text-[#a7a7a7]">Sáng sớm</button>
            <p>0:00 - 6:00</p>
          </div>
          <div
            className={`time-option ${
              isOptionSelected("noon") ? "time-option-choose" : ""
            }`}
            onClick={(e) => handleFilter(e, "noon")}
            data-time="noon"
          >
            <button className="font-normal text-[#a7a7a7]">Buổi sáng</button>
            <p>6:01 - 12:00</p>
          </div>
          <div
            className={`time-option ${
              isOptionSelected("afternoon") ? "time-option-choose" : ""
            }`}
            onClick={(e) => handleFilter(e, "afternoon")}
            data-time="afternoon"
          >
            <button className="font-normal text-[#a7a7a7]">Buổi trưa</button>
            <p>12:01 - 18:00</p>
          </div>
          <div
            className={`time-option ${
              isOptionSelected("evening") ? "time-option-choose" : ""
            }`}
            onClick={(e) => handleFilter(e, "evening")}
            data-time="evening"
          >
            <button className="font-normal text-[#a7a7a7]">Buổi tối</button>
            <p>18:01 - 23:59</p>
          </div>
        </div>

        <PriceView setPriceRange={setPriceRange} priceRange={priceRange} />

        <div className="garage">
          <div>
            <h2 className="font-semibold mb-3">Nhà xe</h2>
          </div>
          <div>
            <div className="garage-list">
              <ul>
                {uniqueTransportNames.map((item, index) => {
                  return (
                    <li key={index} className="garage-list-item">
                      <div className="item-list-car">
                        <div className="item-garage">
                          <img
                            src={item.imageUrl}
                            className="image-item-garage"
                          />
                        </div>
                        <p>{item.name}</p>
                      </div>
                      <div>
                        <img
                          src={
                            garageCheckboxes.includes(item.name)
                              ? ic_selected
                              : ic_select
                          }
                          onClick={() => handleCheckBoxByGarage(item.name)}
                        />
                      </div>
                    </li>
                  );
                })}
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
                {allVehicleNames.map((name, index) => {
                  return (
                    <li key={name} className="garage-list-item">
                      <div className="item-list-car">
                        <div className="item-car">
                          <FontAwesomeIcon icon={faBusSimple} />
                        </div>
                        <p>{name}</p>
                      </div>
                      <div>
                        <img
                          src={
                            vehicleCheckboxes.includes(name)
                              ? ic_selected
                              : ic_select
                          }
                          onClick={() => handleCheckBox(name)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-list">
          <button className="button-left" onClick={handleCancel}>
            Xoá lọc
          </button>
          <button className="button-right" onClick={applyFilters}>
            Áp dụng({tempFilteredTrips && tempFilteredTrips.length ? tempFilteredTrips.length : 0})
          </button>
        </div>
      </div>
    </div>
  );
}
