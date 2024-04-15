import React from "react";
import ic_select from "../../assets/images/ic_select.svg";
import ic_selected from "../../assets/images/ic_selected.svg";

interface GarageListItemProps {
  item: { name: string; imageUrl: string };
  isChecked: boolean;
  handleCheckBox: (name: string) => void;
}

const GarageListItem: React.FC<GarageListItemProps> = ({
  item,
  isChecked,
  handleCheckBox,
}) => {
  return (
    <li className="garage-list-item">
      <div className="item-list-car">
        <div className="item-garage">
          <img
            src={item.imageUrl}
            className="image-item-garage"
            alt={item.name}
          />
        </div>
        <p>{item.name}</p>
      </div>
      <div>
        <img
          src={isChecked ? ic_selected : ic_select}
          alt="Select icon"
          onClick={() => handleCheckBox(item.name)}
        />
      </div>
    </li>
  );
};

export default GarageListItem;
