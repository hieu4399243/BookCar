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
}

export default function Time() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000000]);

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

  return (
    <div className="">
      <h2 className="px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

      <div className="grid grid-cols-2">
        <div
          className="bg-white p-3 m-3 rounded-md"
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

      <div>
        <div className="flex justify-between text-center items-center px-5">
          <h2 className="font-semibold">Nhà xe</h2>
        </div>
        {filteredTrips.length > 0 ? (
          <div>
            <h3>Các chuyến xe trong thời gian {selectedTime}:</h3>
            <ul>
              {filteredTrips.map((trip) => (
                <li key={trip.uuid}>
                  <p>Tên phương tiện: {trip.transport_information.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Không có chuyến xe nào trong thời gian đã chọn.</p>
        )}
      </div>
    </div>
  );
}
