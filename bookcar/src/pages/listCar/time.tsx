import React, {useState} from "react";
import data from "../../constants/locchuyenxe.json";
import {groupTripsByTimeOfDate} from '../../utils/groupTripsByDate'

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
    <div className="grid grid-cols-2">
      <h2>Thời gian khởi hành</h2>
      <button className="bg-white p-5 m-4">Sáng sớm</button>
      <button className="bg-white p-5 m-4">Buổi sáng</button>
      <button className="bg-white p-5 m-4">Buổi trưa</button>
      <button className="bg-white p-5 m-4">Buổi tối</button>

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
