import React, { useState } from "react";
import { Link } from "react-router-dom";
import ic_back from "../../assets/images/ic_back.svg";
import Slider from "react-slick";
import { format, addDays, isToday } from "date-fns";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import Item from "./item";
import data from "../../constants/locchuyenxe.json";

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

const groupedTrips: Trip[] = data.json.coreData.data;

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
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(groupedTrips);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

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

  const sortByDepartureTimeAndDate = (trips: Trip[]) => {
    return [...trips].sort((a, b) => {
      const dateComparison = a.pick_up_date.localeCompare(b.pick_up_date);
      if (dateComparison === 0) {
        return a.departure_time.localeCompare(b.departure_time);
      }
      return dateComparison;
    });
  };

  const sortByDiscountAmount = (trips: Trip[]) => {
    return [...trips].sort((a: Trip, b: Trip) => {
      return parseInt(a.discount_amount) - parseInt(b.discount_amount);
    });
  };

  const sortRating = (trips: Trip[]) => {
    return [...trips].sort((a, b) => {
      return (
        parseFloat(a.transport_information.rating) -
        parseFloat(b.transport_information.rating)
      );
    });
  };

  const handleFilter = () => {
    selectedFilters.forEach((filter) => {
      if (filter === "departure_time") {
        sortByDepartureTime();
      } else if (filter === "discount_amount") {
        sortByTicketPrice();
      } else if (filter === "rating") {
        sortByRating();
      }
    });
  };

  const sortByDepartureTime = () => {
    const sortedTrips = sortByDepartureTimeAndDate(filteredTrips);
    setFilteredTrips(sortedTrips);
  };

  const sortByTicketPrice = () => {
    const sortedTrips = sortByDiscountAmount(filteredTrips);
    setFilteredTrips(sortedTrips);
  };

  const sortByRating = () => {
    const sortedTrips = sortRating(filteredTrips);
    setFilteredTrips(sortedTrips);
  };

  const handleSelectFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
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
        <button
          className={`button ${
            selectedFilters.includes("departure_time") ? "selected" : ""
          }`}
          onClick={() => handleSelectFilter("departure_time")}
        >
          Giờ chạy
        </button>

        <button
          className={`button ${
            selectedFilters.includes("discount_amount") ? "selected" : ""
          }`}
          onClick={() => handleSelectFilter("discount_amount")}
        >
          Giá vé
        </button>

        <button
          className={`button ${
            selectedFilters.includes("rating") ? "selected" : ""
          }`}
          onClick={() => handleSelectFilter("rating")}
        >
          Đánh giá
        </button>

        <div className="filter-icon">
          <button onClick={handleFilter}>Lọc</button>
          <img src={ic_filter_white} />
        </div>
      </div>

      <div className="bg-[#dedede]">
        <Item trips={filteredTrips}/>
      </div>
    </div>
  );
}
