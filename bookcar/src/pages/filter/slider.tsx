import React, { useState, useRef } from "react";

export default function Slider() {
  const [startIndex, setStartIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [selectedDate, setSelected] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartIndex(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setOffset(event.touches[0].clientX - startIndex);
  };

  const handleTouchEnd = () => {
    const threshold = 100;
    if (offset > threshold) {
      prevSlide();
    } else if (offset < -threshold) {
      nextSlide();
    }
    setOffset(0);
  };

  const nextSlide = () => {
    console.log("Next slide");
  };

  const prevSlide = () => {
    console.log("Previous slide");
  };

  const handleClick = (index: number) => {
    setSelected(index);
  };

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider" ref={sliderRef}>
        <ul style={{ transform: `translateX(${offset}px)` }}>
          <li>
            <div
              onClick={() => handleClick(0)}
              className={selectedDate === 0 ? "selectedDate" : ""}
            >
              <p className="days_t">T5</p>
              <p className={`${selectedDate === 0 ? "selected-days_n" : "days_n"}`}>28/3</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(1)}
              className={selectedDate === 1 ? "selectedDate" : ""}
            >
              <p className="days_t">T6</p>
              <p className={`${selectedDate === 1 ? "selected-days_n" : "days_n "}`}>29/3</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(2)}
              className={selectedDate === 2 ? "selectedDate" : ""}
            >
              <p className="days_t">T7</p>
              <p className={`${selectedDate === 2 ? "selected-days_n" : "days_n "}`}>30/3</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(3)}
              className={selectedDate === 3 ? "selectedDate" : ""}
            >
              <p className="days_t">CN</p>
              <p className={`${selectedDate === 3 ? "selected-days_n" : "days_n "}`}>31/3</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(4)}
              className={selectedDate === 4 ? "selectedDate" : ""}
            >
              <p className="days_t">T2</p>
              <p className={` ${selectedDate === 4 ? "selected-days_n" : "days_n "}`}>1/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(5)}
              className={selectedDate === 5 ? "selectedDate" : ""}
            >
              <p className="days_t">T3</p>
              <p className={`${selectedDate === 5 ? "selected-days_n" : "days_n"}`}>2/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(6)}
              className={selectedDate === 6 ? "selectedDate" : ""}
            >
              <p className="days_t">T4</p>
              <p className={`${selectedDate === 6 ? "selected-days_n" : "days_n"}`}>3/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(7)}
              className={selectedDate === 7 ? "selectedDate" : ""}
            >
              <p className="days_t">T5</p>
              <p className={`${selectedDate === 7 ? "selected-days_n" : "days_n"}`}>4/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(8)}
              className={selectedDate === 8 ? "selectedDate" : ""}
            >
              <p className="days_t">T6</p>
              <p className={`${selectedDate === 8 ? "selected-days_n" : "days_n"}`}>5/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(9)}
              className={selectedDate === 9 ? "selectedDate" : ""}
            >
              <p className="days_t">T7</p>
              <p className={`${selectedDate === 9 ? "selected-days_n" : "days_n"}`}>6/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(10)}
              className={selectedDate === 10 ? "selectedDate" : ""}
            >
              <p className="days_t">CN</p>
              <p className={`${selectedDate === 10 ? "selected-days_n" : "days_n"}`}>7/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(11)}
              className={selectedDate === 11 ? "selectedDate" : ""}
            >
              <p className="days_t">T2</p>
              <p className={`${selectedDate === 11 ? "selected-days_n" : "days_n"}`}>8/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(12)}
              className={selectedDate === 12 ? "selectedDate" : ""}
            >
              <p className="days_t">T3</p>
              <p className={`${selectedDate === 12 ? "selected-days_n" : "days_n"}`}>9/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(13)}
              className={selectedDate === 13 ? "selectedDate" : ""}
            >
              <p className="days_t">T4</p>
              <p className={`${selectedDate === 13 ? "selected-days_n" : "days_n"}`}>10/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(14)}
              className={selectedDate === 14 ? "selectedDate" : ""}
            >
              <p className="days_t">T5</p>
              <p className={`${selectedDate === 14 ? "selected-days_n" : "days_n"}`}>11/4</p>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick(15)}
              className={selectedDate === 15 ? "selectedDate" : ""}
            >
              <p className="days_t">T6</p>
              <p className={`${selectedDate === 15 ? "selected-days_n" : "days_n"}`}>12/4</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
