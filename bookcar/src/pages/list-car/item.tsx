import React, { useState, useEffect, useRef } from "react";
import CarListItem from "../../components/list/CarListItem";

interface Trip {
  uuid: string;
  name: string;
  departure_time: string;
  pick_up_date: string;
  vehicle_name: string;
  duration_in_min: number;
  merchant_start_point_name: string;
  merchant_end_point_name: string;
  transport_information: {
    image_url: string;
    rating: string;
    name: string;
  };
  discount_amount: number;
}

interface ItemProps {
  filteredTrips: Trip[];
}

const Item: React.FC<ItemProps> = ({ filteredTrips }) => {
  const [heartSelected, setHeartSelected] = useState<number[]>([]);
  const [prevFilteredTrips, setPrevFilteredTrips] = useState<Trip[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(10);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Array.isArray(filteredTrips)) {
      setPrevFilteredTrips(filteredTrips.slice(0, itemsToShow));
    }
  }, [filteredTrips, itemsToShow]);

  const changeHeart = (index: number) => {
    const selectedIndex = heartSelected.indexOf(index);
    if (selectedIndex === -1) {
      setHeartSelected([...heartSelected, index]);
    } else {
      const updatedHeartSelected = [...heartSelected];
      updatedHeartSelected.splice(selectedIndex, 1);
      setHeartSelected(updatedHeartSelected);
    }
  };

  const loadMoreItems = () => {
    if (prevFilteredTrips.length < filteredTrips.length) {
      setItemsToShow(itemsToShow + 10);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          loadMoreItems();
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreItems]);

  return (
    <div>
      <div
        ref={containerRef}
        style={{ overflowY: "scroll", maxHeight: "800px" }}
      >
        {prevFilteredTrips.map((item, index) => (
          <CarListItem
            key={index}
            item={item}
            index={index}
            heartSelected={heartSelected.includes(index)}
            changeHeart={changeHeart}
          />
        ))}
      </div>
    </div>
  );
};

export default Item;
