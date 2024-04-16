import React from "react";
import { Link } from "react-router-dom";
import ic_back from "../assets/images/ic_back.svg";

interface FilterHeaderProps {
    title: string;
    subTitle: string;
    onCancel?: () => void;
  }

const FilterHeader: React.FC<FilterHeaderProps> = ({ title, subTitle, onCancel }) => {
  return (
    <div className="flex p-5 bg-white items-center">
      <div style={{ marginRight: "5px" }}>
        <Link to={"/"}>
          <img src={ic_back} alt="Back" />
        </Link>
      </div>
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        <h2 className="sub-title">{subTitle}</h2>
      </div>
      <div
        className="cancle-filter"
        style={{
          display: onCancel ? "block" : "none",
        }}
      >
        <h2 onClick={onCancel}>Xoá lọc</h2>
      </div>
    </div>
  );
};

export default FilterHeader;