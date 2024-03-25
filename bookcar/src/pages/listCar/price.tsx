import React, { useState } from "react";
import { Range } from "react-range";

export default function Price() {
  const [values, setValues] = useState([50, 900]);
  return (
    <div>
      <div className="flex justify-between text-center items-center px-5">
        <h2 className="font-semibold">Khoảng giá</h2>
        <h2>0 - 3.000.000đ/vé</h2>
      </div>
      <div className="bg-white p-3 m-3 rounded-md pt-6">
        <Range
          step={1}
          min={0}
          max={3000}
          values={values}
          onChange={(newValues) => setValues(newValues)}
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
                  left: `${(values[0] / 3000) * 100}%`,
                  width: `${((values[1] - values[0]) / 3000) * 100}%`,
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
          <div>{values[0].toFixed(0)}</div>
          <div>{values[1].toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
}
