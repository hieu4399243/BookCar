import React, { useState, useEffect } from "react";
import data from "../../constants/locchuyenxe.json";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import Price from "./price";

const groupedTrips: any = groupTripsByTimeOfDate(data.json.coreData.data);

interface Trip {
  uuid: string;
  discount_amount: number;
  transport_information: {
    name: string;
  };
  vehicle_name: string;
}

export default function Time() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [selectedTrips, setSelectedTrips] = useState<string[]>([]);
  const [selectedVehicleNames, setSelectedVehicleNames] = useState<string[]>(
    []
  );
  const [showAllData, setShowAllData] = useState<boolean>(true);

  useEffect(() => {
    if (selectedTime) {
      const tripsInSelectedTime = (groupedTrips[selectedTime] as Trip[]).flat();
      const filteredTripsByPrice = tripsInSelectedTime.filter((trip: Trip) => {
        return (
          trip.discount_amount >= priceRange[0] &&
          trip.discount_amount <= priceRange[1]
        );
      });
      setFilteredTrips(filteredTripsByPrice);
      
    }
  }, [selectedTime, priceRange]);

  const handleFilter: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const time = event.currentTarget.getAttribute("data-time");
    if (time) {
      setSelectedTime(time);
      const tripsInSelectedTime = (groupedTrips[time] as Trip[]).flat();
      setFilteredTrips(tripsInSelectedTime);
      let minPrice = Number.POSITIVE_INFINITY;
      let maxPrice = Number.NEGATIVE_INFINITY;
      tripsInSelectedTime.forEach((trip) => {
        minPrice = Math.min(minPrice, trip.discount_amount);
        maxPrice = Math.max(maxPrice, trip.discount_amount);
      });
      setPriceRange([minPrice, maxPrice]);
    }
  };

  const handleCheckboxChange = (uuid: string) => {
    const trip = filteredTrips.find((trip) => trip.uuid === uuid);
    console.log(trip);
    if (trip) {
      const index = selectedTrips.indexOf(uuid);
      if (index !== -1) {
        setSelectedTrips(selectedTrips.filter((item) => item !== uuid));
        setSelectedVehicleNames(
          selectedVehicleNames.filter((name) => name !== trip.vehicle_name)
        );
      } else {
        setSelectedTrips([...selectedTrips, uuid]);
        setSelectedVehicleNames([...selectedVehicleNames, trip.vehicle_name]);
      }
    }
  };

  const uniqueVehicleNames =
    filteredTrips.length > 0
      ? Array.from(new Set(filteredTrips.map((trip) => trip.vehicle_name)))
      : [];
  const uniqueTransportName =
    filteredTrips.length > 0
      ? Array.from(
          new Set(filteredTrips.map((trip) => trip.transport_information.name))
        )
      : [];

  const handleCancel = () => {
    setSelectedTime(null);
    setFilteredTrips([]);
    setPriceRange([0, 3000000]);
    setSelectedTrips([]);
    setSelectedVehicleNames([]);
  };

  return (
    <div className="">
      <h2 className="px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

      <div className="grid grid-cols-2">
        <div
          className={`time-option ${selectedTime === "morning" ? "selected" : ""}`}
          onClick={handleFilter}
          data-time="morning"
          
        >
          <button className="font-normal text-[#a7a7a7]">Sáng sớm</button>
          <p>0:00 - 6:00</p>
        </div>
        <div
          className="bg-white p-3 m-3 rounded-md"
          onClick={handleFilter}
          data-time="noon"
        >
          <button className="font-normal text-[#a7a7a7]">Buổi sáng</button>
          <p>6:01 - 12:00</p>
        </div>
        <div
          className="bg-white p-3 m-3 rounded-md"
          onClick={handleFilter}
          data-time="afternoon"
        >
          <button className="font-normal text-[#a7a7a7]">Buổi trưa</button>
          <p>12:01 - 18:00</p>
        </div>
        <div
          className="bg-white p-3 m-3 rounded-md"
          onClick={handleFilter}
          data-time="evening"
        >
          <button className="font-normal text-[#a7a7a7]">Buổi tối</button>
          <p>18:01 - 23:59</p>
        </div>
      </div>

      <Price setPriceRange={setPriceRange} priceRange={priceRange} />

      <div className="garage">
        <div>
          <h2 className="font-semibold">Nhà xe</h2>
        </div>
        <div>
          {filteredTrips.length > 0 ? (
            <div className="garage-list">
              <ul>
                {filteredTrips.map((trip) => (
                  <li key={trip.uuid} className="garage-list-item">
                    <div>
                      <p>{trip.transport_information.name}</p>
                    </div>
                    <div className="round">
                      <input
                        id={`checkbox-${trip.uuid}`}
                        type="checkbox"
                        checked={selectedTrips.includes(trip.uuid)}
                        onChange={() => handleCheckboxChange(trip.uuid)}
                      />
                      <label htmlFor={`checkbox-${trip.uuid}`}></label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="garage-list">
              Không có chuyến xe nào trong thời gian đã chọn.
            </p>
          )}
        </div>
      </div>
      <div className="category-car">
        <div>
          <h2 className="font-semibold">Loại xe</h2>
        </div>
        <div>
          {filteredTrips.length > 0 ? (
            <div className="garage-list">
              <ul>
                {filteredTrips.map((trip) => (
                  <li key={trip.uuid} className="category-list-item">
                    <div>
                      {selectedTrips.includes(trip.uuid) && (
                        <p>Phương tiện: {trip.vehicle_name}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="garage-list">Không có phòng </p>
          )}
        </div>
      </div>
      <div className="footer-list">
        <button className="button-left" onClick={handleCancel}>
          Xoá lọc
        </button>
        <button className="button-right">
          Áp dụng({selectedTrips.length})
        </button>
      </div>
    </div>
  );
}
