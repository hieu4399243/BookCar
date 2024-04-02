import React, { useState, useEffect } from "react";
import "./DoubleScrollBar.css";

interface DoubleScrollBarProps {
  class: string;
  forid: string;
  min: number;
  max: number;
  step: number;
  handleInputChange: (value: number, inputType: string) => void;
}

export const DoubleScrollBar: React.FC<DoubleScrollBarProps> = (props) => {
  const [inputFrom, setInputFrom] = useState<number>(props.min);
  const [inputTo, setInputTo] = useState<number>(props.max);

  useEffect(() => {
    const display = document.getElementById(props.forid);
    const slider = document.getElementById(`slider-${props.forid}`);

    if (slider) {
      if (display) {
        console.log({ inputFrom, inputTo });
        if (inputFrom > inputTo) {
          display.innerHTML = `${inputTo}-${inputFrom}`;
          slider.style.right = `${
            100 - ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
        } else {
          display.innerHTML = `${inputFrom}-${inputTo}`;
          slider.style.right = `${
            100 - ((inputTo - props.min) / (props.max - props.min)) * 100
          }%`;
          slider.style.left = `${
            ((inputFrom - props.min) / (props.max - props.min)) * 100
          }%`;
        }
      }
    }
  }, [inputFrom, inputTo, props]);

  return (
    <div className={`${props.class}`}>
      <div className="range-slider">
        <span className="range-selected" id={`slider-${props.forid}`}></span>
      </div>
      <div className="range-input">
        <input
          type="range"
          onChange={(e) =>
            props.handleInputChange(parseFloat(e.target.value), "from")
          }
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.min}
        />
        <input
          type="range"
          onChange={(e) => props.handleInputChange(parseFloat(e.target.value), "to")}
          min={props.min}
          max={props.max}
          step={props.step}
          defaultValue={props.max}
        />
      </div>
    </div>
  );
};
