import React from "react";
import data from "../../constants/locchuyenxe.json";

interface Trip {
  uuid: string;
  name: string;
  departure_time: string;
  pick_up_date: Date;
  vehicle_name: string;
}

const groupedTrips: Trip[] = data.json.coreData.data.map((item: any) => {
    const dateString = item.pick_up_date;
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1; 
    const day = parseInt(dateParts[0]); 
  
    const pickUpDate = new Date(year, month, day); 
    return {
      ...item,
      pick_up_date: pickUpDate
    };
  });

export default function Item() {
  return (
    <div>
      {groupedTrips.slice(0, 10).map((item, index) => (
        <div key={index} className="list-travel">
          <div className="item-travel">
            <div>{item.departure_time}</div>
            <div>{item.pick_up_date.toISOString()}</div>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}
