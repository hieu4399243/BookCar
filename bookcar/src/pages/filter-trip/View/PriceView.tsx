import React, { useState } from "react";
import { NumberWithComans } from "../../../utils/groupTripsByDate";
import Slider from "@mui/material/Slider";

interface PriceProps {
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  priceRange: number[];
}

const PriceView: React.FC<PriceProps> = ({ setPriceRange, priceRange }) => { 

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };


  const formatPrice = (price: number | undefined) => {
    if (price !== undefined) {
      const roundedPrice = Math.round(price / 10000) * 10000;
      return NumberWithComans(roundedPrice) + "đ";
    } else {
      return "";
    }
  };
  

  return (
    <div>
      <div className="flex justify-between text-center items-center px-5 mt-5">
        <h2 className="font-semibold">Khoảng giá</h2>
        <h2>0 - 3.000.000đ/vé</h2>
      </div>
      <div className="range">
        <Slider
          value={priceRange}
          onChange={handleChange}
          min={0}
          max={3000000}
        />
        <div className="flex justify-between text-center items-center">
          <div>{formatPrice(priceRange[0])}</div>
          <div>{formatPrice(priceRange[1])}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceView;
