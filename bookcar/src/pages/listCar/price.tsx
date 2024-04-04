import React from "react";
import { NumberWithComans } from "../../utils/numberWithComas";
import Slider from "@mui/material/Slider";

interface PriceProps {
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  priceRange: number[];
}

const Price: React.FC<PriceProps> = ({ setPriceRange, priceRange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const formatPrice = (price: number | undefined) => {
    return price !== undefined ? NumberWithComans(price) + "đ" : "";
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
          valueLabelDisplay="auto"
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

export default Price;
