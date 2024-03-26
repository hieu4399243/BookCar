import React, { useState, useEffect } from "react";
import data from "../../constants/locchuyenxe.json";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import Price from "./price";

const groupedTrips: any = groupTripsByTimeOfDate(data.json.coreData.data);
interface Trip {
  uuid: string;
  discount_amount: number;
}

export default function Time() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [priceRange, setPriceRange] = useState([100, 300]);

  useEffect(() => {
    if (Object.keys(groupedTrips).length > 0) {
      let minPrice = Number.POSITIVE_INFINITY;
      let maxPrice = Number.NEGATIVE_INFINITY;

      for (const trip of filteredTrips) {
        minPrice = Math.min(minPrice, trip.discount_amount);
        maxPrice = Math.max(maxPrice, trip.discount_amount);
      }

      minPrice = Math.max(0, minPrice);
      maxPrice = Math.min(3000000, maxPrice);

      setPriceRange([minPrice, maxPrice]);
    }
  }, [filteredTrips, groupedTrips]);

  const handleFilter: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const time = event.currentTarget.getAttribute("data-time");
    if (time) {
      setSelectedTime(time);
      setFilteredTrips(groupedTrips[time]);
    }
  };

  return (
    <div className="">
      <h2 className=" px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

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
          <button className="font-normal text-[#a7a7a7]">Sáng sớm</button>
          <p>18:01 - 23:59</p>
        </div>
      </div>

      <Price setPriceRange={setPriceRange} priceRange={priceRange} />
    </div>
  );
}
