import React, { useState } from "react";
import data from "../../constants/locchuyenxe.json";
import { formatDuration } from "../../utils/groupTripsByDate";
import { dateTime } from "../../utils/groupTripsByDate";
import ic_arrow from "../../assets/images/ic_arrow.svg";
import ic_heart from "../../assets/images/ic_heart.svg";
import ic_heart_selected from "../../assets/images/ic_heart_selected.svg";

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
}

const groupedTrips: Trip[] = data.json.coreData.data;
console.log(groupedTrips);

export default function Item() {
  const [heartSelected, setHeartSelected] = useState<number | null>(null);
  const changeHeart = (index: number) => {
    if (heartSelected === index) {
      setHeartSelected(null);
    } else {
      setHeartSelected(index);
    }
  };
  return (
    <div>
      {groupedTrips.slice(0, 10).map((item, index) => (
        <div key={index} className="list-travel">
          <div className="item-travel">
            <div className="header-item-travel">
              <div className="right-header">
                <p>{item.departure_time}</p>
                <p style={{ marginLeft: "5px" }}>
                  {dateTime(item.pick_up_date)}
                </p>
              </div>
              <div>
                <p style={{ color: "#b6b0b0" }}>
                  {formatDuration(item.duration_in_min)}
                </p>
              </div>
            </div>
            <div className="body-item-travel">
              <p className="start-point">{item.merchant_start_point_name}</p>
              <div className="path">
                <p className="line-left">----</p>
                <img src={ic_arrow} />
                <p className="line-right">----</p>
              </div>
              <p className="end-point">{item.merchant_end_point_name}</p>
            </div>
            <div className="body-transport">
              <div className="transport-information">
                <div className="transport-image">
                  <img
                    src={item.transport_information.image_url}
                    alt="Transport Image"
                    width={40}
                    height={60}
                  />
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <p className="text-tranport">
                    {item.transport_information.name}
                  </p>
                  <p className="text-tranport-note">Chi tiết quy định</p>
                </div>
              </div>
              <div>
                <div className="rating">
                  <p className="text-rating">
                    {item.transport_information.rating}
                  </p>
                  <div onClick={() => changeHeart(index)}>
                    <img
                      src={
                        heartSelected === index ? ic_heart_selected : ic_heart
                      }
                    />
                  </div>
                </div>
                <div>
                  <p className="text-tranport">{item.vehicle_name}</p>
                </div>
              </div>
            </div>
            <div className="holes-lower"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
