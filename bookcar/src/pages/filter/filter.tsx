import React, { useState } from "react";
import { Link } from "react-router-dom";
import ic_back from "../../assets/images/ic_back.svg";
import Slider from "react-slick";
import { format, addDays, isToday } from "date-fns";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import Item from "./item";

export default function Filter() {
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const generateTimeSlots = () => {
    const currentDate = new Date();
    const timeSlots = [];
    for (let i = 0; i < 30; i++) {
      const nextDate = addDays(currentDate, i);
      timeSlots.push(nextDate);
    }
    return timeSlots;
  };

  const [selectedDateIndex, setSelectedDateIndex] = useState<null | number>(
    null
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index === selectedDateIndex ? null : index);
  };

  return (
    <div>
      <div className="flex p-5 bg-white items-center">
        <div style={{ marginRight: "5px" }}>
          <Link to={"/"}>
            <img src={ic_back} alt="Back" />
          </Link>
        </div>
        <div>
          <h1 className="font-bold text-xl">Chọn chuyến đi</h1>
          <h2 className="sub-title">Long Biên - An Lão</h2>
        </div>
        <div className="cancle-filter">
          <h2>Xoá lọc</h2>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          {generateTimeSlots().map((timeSlot, index) => (
            <div
              key={index}
              className={`day ${index === selectedDateIndex ? "selected" : ""}`}
              onClick={() => handleDateClick(index)}
            >
              <h2 className="name-day">{weekdays[timeSlot.getDay()]}</h2>
              <h3 className="name-date">{format(timeSlot, "dd/MM")}</h3>
            </div>
          ))}
        </Slider>
      </div>
      <div className="filter-button">
        <button className="button">Giờ chạy</button>
        <button className="button">Giá vé</button>
        <button className="button">Đánh giá</button>
        <div className="filter-icon">
          <button>Lọc</button>
          <img src={ic_filter_white} />
        </div>
      </div>

      <div className="bg-[#dedede] h-screen">
        <Item/>
      </div>
    </div>
  );
}
