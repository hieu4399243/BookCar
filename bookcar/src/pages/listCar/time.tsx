import React, { useState, useEffect } from "react";
import data from "../../constants/locchuyenxe.json";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import Price from "./price";
import ic_select from "../../assets/images/ic_select.svg";
import ic_selected from "../../assets/images/ic_selected.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTrips } from "../../features/slices/filterTripSlice";
import { useLocation } from "react-router-dom";

const groupedTrips: any = groupTripsByTimeOfDate(data.json.coreData.data);
const groupedTripsLength: any = data.json.coreData.data;

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

export default function Time() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const filteredTrips = useSelector((state: any) => state.filteredTrips);
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [clickedOption, setClickedOption] = useState<string | null>(null);
  const [vehicleCheckboxes, setVehicleCheckboxes] = useState<string[]>([]);
  const [garageCheckboxes, setGarageCheckboxes] = useState<string[]>([]);

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

  useEffect(() => {
    dispatch(setFilteredTrips(groupedTripsLength));
  }, [dispatch]);

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
        (vehicleCheckboxes.length === 0 || vehicleCheckboxes.includes(trip.vehicle_name)) &&
        (garageCheckboxes.length === 0 ||
          garageCheckboxes.includes(trip.transport_information.name))
      );
    });

    dispatch(setFilteredTrips(currentFilteredTrips));
  }, [
    selectedTime,
    priceRange,
    garageCheckboxes,
    vehicleCheckboxes,
    groupedTrips,
    dispatch,
  ]);

  const handleFilter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    time: string
  ) => {
    const updateSelectedTime = selectedTime.includes(time)
      ? selectedTime.filter((t) => t !== time)
      : [...selectedTime, time];
    setSelectedTime(updateSelectedTime);
    setClickedOption(time === clickedOption ? null : time);
    const tripsInSelectedTime = groupedTrips[time] || [];
    dispatch(setFilteredTrips(tripsInSelectedTime));
  };

  const isOptionSelected = (time: string) => selectedTime.includes(time);

  const handleCheckBox = (name: string) => {
    let updatedVehicleCheckboxes: string[];
    if (vehicleCheckboxes.includes(name)) {
      updatedVehicleCheckboxes = vehicleCheckboxes.filter(
        (checkbox) => checkbox !== name
      );
    } else {
      updatedVehicleCheckboxes = [...vehicleCheckboxes, name];
    }
    setVehicleCheckboxes(updatedVehicleCheckboxes);

    let filtered;
    if (updatedVehicleCheckboxes.length > 0) {
      filtered = groupedTripsLength.filter((trip: Trip) =>
      updatedVehicleCheckboxes.includes(trip.vehicle_name)
      );
    } else {
      filtered = groupedTripsLength;
    }
    dispatch(setFilteredTrips(filtered));
  };

  const handleCheckBoxByGarage = (name: string) => {
    let updatedGarageCheckboxes: string[];
    if (garageCheckboxes.includes(name)) {
      updatedGarageCheckboxes = garageCheckboxes.filter(
        (checkbox) => checkbox !== name
      );
    } else {
      updatedGarageCheckboxes = [...garageCheckboxes, name];
    }
    setGarageCheckboxes(updatedGarageCheckboxes);

    let filtered;
    if (updatedGarageCheckboxes.length > 0) {
      filtered = groupedTripsLength.filter((trip: Trip) =>
        updatedGarageCheckboxes.includes(trip.transport_information.name)
      );
    } else {
      filtered = groupedTripsLength;
    }
    dispatch(setFilteredTrips(filtered));
  };

  const handleCancel = () => {
    setClickedOption(null);
    setSelectedTime([]);
    dispatch(setFilteredTrips(groupedTripsLength));
    setPriceRange([0, 3000000]);
    setVehicleCheckboxes([]);
    setGarageCheckboxes([]);
  };

  const applyFilters = () => {
    navigate("/filter");
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

        <Price setPriceRange={setPriceRange} priceRange={priceRange} />

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
                            vehicleCheckboxes.includes(name) ? ic_selected : ic_select
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
            Áp dụng(
            {filteredTrips && filteredTrips.length ? filteredTrips.length : 0})
          </button>
        </div>
      </div>
    </div>
  );
}
