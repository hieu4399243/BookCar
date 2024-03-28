import React, { useState } from "react";
import { formatDuration } from "../../utils/groupTripsByDate";
import { dateTime } from "../../utils/groupTripsByDate";
import ic_arrow from "../../assets/images/ic_arrow.svg";
import ic_heart from "../../assets/images/ic_heart.svg";
import ic_heart_selected from "../../assets/images/ic_heart_selected.svg";
import { NumberWithComans } from "../../utils/numberWithComas";

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
  discount_amount: string;
}

interface ItemProps {
  trips: Trip[];
}

const Item: React.FC<ItemProps> = ({ trips }) => {
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
      {trips.slice(0, 10).map((item, index) => (
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
            <div className="footer-item-travel">
              <div>
                <p>
                  Từ{" "}
                  <span style={{ color: "blue" }}>
                    {NumberWithComans(item.discount_amount)}đ
                  </span>
                </p>
                <p>Chỉ còn 6 chỗ trống </p>
              </div>
              <div>
                <button className="continue-button">Tiếp tục</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
