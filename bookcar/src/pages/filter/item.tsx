import React, { useState, useEffect } from "react";
import { formatDuration } from "../../utils/groupTripsByDate";
import { dateTime } from "../../utils/groupTripsByDate";
import ic_arrow from "../../assets/images/ic_arrow.svg";
import ic_heart from "../../assets/images/ic_heart.svg";
import ic_heart_selected from "../../assets/images/ic_heart_selected.svg";
import { NumberWithComans } from "../../utils/numberWithComas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";

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

interface ItemProps {
  filteredTrips: Trip[];
}

const Item: React.FC<ItemProps> = ({ filteredTrips }) => {
  const [heartSelected, setHeartSelected] = useState<number[]>([]);
  const [prevFilteredTrips, setPrevFilteredTrips] = useState<Trip[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [itemsToShow, setItemsToShow] = useState<number>(10);

  useEffect(() => {
    setPrevFilteredTrips(filteredTrips.slice(0, itemsToShow));
  }, [filteredTrips, itemsToShow]);

  const changeHeart = (index: number) => {
    const selectedIndex = heartSelected.indexOf(index);
    if (selectedIndex === -1) {
      setHeartSelected([...heartSelected, index]);
    } else {
      const updatedHeartSelected = [...heartSelected];
      updatedHeartSelected.splice(selectedIndex, 1);
      setHeartSelected(updatedHeartSelected);
    }
  };
  

  const fetchMoreData = () => {
    if (!hasMore) return;
    setTimeout(() => {
      setItemsToShow(itemsToShow + 10);
    }, 2000);
  };

  return (
    <div>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={prevFilteredTrips.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4></h4>}
        endMessage={<p>Không tìm thấy chuyến xe</p>}
      >
        {prevFilteredTrips.map((item, index) => (
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
                  <p className="time-range">
                    {formatDuration(item.duration_in_min)}
                  </p>
                </div>
              </div>
              <div className="body-item-travel">
                <p className="start-point">{item.merchant_start_point_name}</p>
                <div className="path">
                  <p className="line-left">----</p>
                  <img src={ic_arrow} className="img-arrow" />
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
                      className="img-transport"
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
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f9b533" }}
                    />
                    <p className="text-rating">
                      {item.transport_information.rating}
                    </p>
                    <div onClick={() => changeHeart(index)}>
                      <img
                        className="heart-rating"
                        src={
                          heartSelected.includes(index) ? ic_heart_selected : ic_heart
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
                    <span className="ammount-trip">
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
      </InfiniteScroll>
    </div>
  );
};

export default Item;
