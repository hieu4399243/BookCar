import React from "react";

interface TimeOptionProps {
  isSelected: boolean;
  time: string;
  handleFilter: (e: React.MouseEvent<HTMLDivElement>, time: string) => void;
  label: string
}

const TimeOption: React.FC<TimeOptionProps> = ({ isSelected, time, handleFilter, label }) => {
  return (
    <div
      className={`time-option ${isSelected ? "time-option-choose" : ""}`}
      onClick={(e) => handleFilter(e, time)}
      data-time={time}
    >
      <button className="font-normal text-[#a7a7a7]">{label}</button>
      <p>{getTimeRange(time)}</p>
    </div>
  );
};

function getTimeRange(time: string) {
  switch (time) {
    case "morning":
      return "0:00 - 6:00";
    case "noon":
      return "6:01 - 12:00";
    case "afternoon":
      return "12:01 - 18:00";
    case "evening":
      return "18:01 - 23:59";
    default:
      return "";
  }
}

export default TimeOption;
