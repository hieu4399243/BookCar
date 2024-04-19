import React, { Component } from "react";
import { NumberWithComans } from "../../utils/groupTripsByDate";
import Slider from "@mui/material/Slider";

interface PriceProps {
  setPriceRange: (priceRange: number[]) => void;
  priceRange: number[];
}


class PriceView extends Component<PriceProps> {
  handleChange = (event: Event, newValue: number | number[]) => {
    this.props.setPriceRange(newValue as number[]);
  };

  formatPrice = (price: number | undefined) => {
    if (price !== undefined) {
      const roundedPrice = Math.round(price / 10000) * 10000;
      return NumberWithComans(roundedPrice) + "đ";
    } else {
      return "";
    }
  };

  render() {
    const { priceRange } = this.props;
    
    return (
      <div>
        <div className="flex justify-between text-center items-center px-5 mt-5">
          <h2 className="font-semibold">Khoảng giá</h2>
          <h2>0 - 3.000.000đ/vé</h2>
        </div>
        <div className="range">
          <Slider
            value={priceRange}
            onChange={this.handleChange}
            min={0}
            max={3000000}
          />
          <div className="flex justify-between text-center items-center">
            <div>{this.formatPrice(priceRange[0])}</div>
            <div>{this.formatPrice(priceRange[1])}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceView;
