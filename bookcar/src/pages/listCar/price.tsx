import React, { useState } from "react";
import { Range } from "react-range";
import { NumberWithComans } from "../../utils/numberWithComas";

interface PriceProps {
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  priceRange: number[];
}

const Price: React.FC<PriceProps> = ({ setPriceRange, priceRange }) => {
  return (
    <div>
      <div className="flex justify-between text-center items-center px-5 mt-5">
        <h2 className="font-semibold">Khoảng giá</h2>
        <h2>0 - 3.000.000đ/vé</h2>
      </div>
      <div className="range">
        <Range
          step={1}
          min={0}
          max={3000000}
          values={priceRange}
          onChange={(newValues) => setPriceRange(newValues)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "#ccc",
              }}
            >
              {children}
              <div
                style={{
                  position: "absolute",
                  height: "6px",
                  backgroundColor: "#007bff",
                  borderRadius: "3px",
                  left: `${(priceRange[0] / 3000000) * 100}%`,
                  width: `${
                    ((priceRange[1] - priceRange[0]) / 3000000) * 100
                  }%`,
                }}
              />
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                backgroundColor: "#007bff",
                borderRadius: "50%",
                boxShadow: "0px 2px 6px #AAA",
              }}
            ></div>
          )}
        />
        <div className="flex justify-between text-center items-center mt-4">
          <div>{NumberWithComans(priceRange[0].toFixed(0))}đ</div>
          <div>{NumberWithComans(priceRange[1].toFixed(0))}đ</div>
        </div>
      </div>
    </div>
  );
};

export default Price;
