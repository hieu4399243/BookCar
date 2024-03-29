import React, { useState, useRef } from 'react';

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
    console.log('Next slide');
  };

  const prevSlide = () => {
    console.log('Previous slide');
  };

  const handleClick = (index:number) =>{
    setSelected(index);
  }
  

  return (
    <div 
      className="slider-container" 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider" ref={sliderRef}>
        <ul style={{ transform: `translateX(${offset}px)` }}>
        <li onClick={() => handleClick(0)} className={selectedDate === 0 ? 'selectedDate' : ''}>T5 <br/> 28/03</li>
          <li onClick={() => handleClick(1)} className={selectedDate === 1 ? 'selectedDate' : ''}>T6 <br/> 29/03</li>
          <li onClick={() => handleClick(2)} className={selectedDate === 2 ? 'selectedDate' : ''}>T7 <br/> 30/03</li>
          <li onClick={() => handleClick(3)} className={selectedDate === 3 ? 'selectedDate' : ''}>CN <br/> 31/03</li>
          <li onClick={() => handleClick(4)} className={selectedDate === 4 ? 'selectedDate' : ''}>T2 <br/> 01/04</li>
          <li onClick={() => handleClick(5)} className={selectedDate === 5 ? 'selectedDate' : ''}>T3 <br/> 02/04</li>
          <li onClick={() => handleClick(6)} className={selectedDate === 6 ? 'selectedDate' : ''}>T4 <br/> 03/04</li>
          <li onClick={() => handleClick(7)} className={selectedDate === 7 ? 'selectedDate' : ''}>T5 <br/> 04/04</li>
          <li onClick={() => handleClick(8)} className={selectedDate === 8 ? 'selectedDate' : ''}>T6 <br/> 05/04</li>
          <li onClick={() => handleClick(9)} className={selectedDate === 9 ? 'selectedDate' : ''}>T7 <br/> 06/04</li>
          <li onClick={() => handleClick(10)} className={selectedDate === 10 ? 'selectedDate' : ''}>CN <br/> 07/04</li>
          <li onClick={() => handleClick(11)} className={selectedDate === 11 ? 'selectedDate' : ''}>T2 <br/> 08/04</li>
          <li onClick={() => handleClick(12)} className={selectedDate === 12 ? 'selectedDate' : ''}>T3 <br/> 09/04</li>
          <li onClick={() => handleClick(13)} className={selectedDate === 13 ? 'selectedDate' : ''}>T4 <br/> 10/04</li>
          <li onClick={() => handleClick(14)} className={selectedDate === 14 ? 'selectedDate' : ''}>T5 <br/> 11/04</li>
          <li onClick={() => handleClick(15)} className={selectedDate === 15 ? 'selectedDate' : ''}>T6 <br/> 12/04</li>

        </ul>
      </div>
    </div>
  );
}
