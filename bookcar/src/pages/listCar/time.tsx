import React, { useState } from "react";
import data from "../../constants/locchuyenxe.json";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";

const dataArray: any[] = data.json.coreData.data;
const groupedTrips = groupTripsByTimeOfDate(data.json.coreData.data);
console.log(groupedTrips);

export default function Time() {
  // const handleFilter = (time) => {
  //   setSelectedTime(time);
  //   const groupedTrips = groupTripsByTimeOfDate(data.json.coreData.data);
  //   setFilteredTrips(groupedTrips[time]);
  // };

  return (
    <div className="">
      <h2 className=" px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

      <div className="grid grid-cols-2">
        <div className="bg-white p-3 m-3 rounded-md">
          <button className="font-normal text-[#a7a7a7]">Sáng sớm 1</button>
          <p>0:00 - 6:00</p>
        </div>
        <div className="bg-white p-3 m-3 rounded-md">
          <button className="font-normal text-[#a7a7a7]">Buổi sáng</button>
          <p>6:01 - 12:00</p>
        </div>
        <div className="bg-white p-3 m-3 rounded-md">
          <button className="font-normal text-[#a7a7a7]">Buổi trưa</button>
          <p>12:01 - 18:00</p>
        </div>
        <div className="bg-white p-3 m-3 rounded-md">
          <button className="font-normal text-[#a7a7a7]">Sáng sớm</button>
          <p>18:01 - 23:59</p>
        </div>
      </div>
      {/* {Object.keys(groupedTrips).map((item,index) => (
      <div key={index}>
        <h2>{item}</h2>
        <ul>
          {groupedTrips[item].map(trip => (
            <li key={trip.uuid}>
              {trip.name} - {trip.departure_time} - {trip.drop_off_time}
            </li>
          ))}
        </ul>
      </div>
    ))} */}
    </div>
  );
}
