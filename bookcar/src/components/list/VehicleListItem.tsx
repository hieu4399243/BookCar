import React from "react";
import ic_select from "../../assets/images/ic_select.svg";
import ic_selected from "../../assets/images/ic_selected.svg";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface VehicleListItemProps {
  name: string;
  vehicleCheckboxes: boolean;
  handleCheckBox: (name: string) => void;
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({
  name,
  vehicleCheckboxes,
  handleCheckBox,
}) => {
  return (
    <li className="garage-list-item">
      <div className="item-list-car">
        <div className="item-car">
          <FontAwesomeIcon icon={faBusSimple} />
        </div>
        <p>{name}</p>
      </div>
      <div>
        <img
          src={vehicleCheckboxes ? ic_selected : ic_select}
          alt="Select icon"
          onClick={() => handleCheckBox(name)}
        />
      </div>
    </li>
  );
};

export default VehicleListItem;
