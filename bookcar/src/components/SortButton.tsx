import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  sortDirection: "asc" | "desc" | null;
}

const SortButton: React.FC<ButtonProps> = ({
  label,
  selected,
  onClick,
  sortDirection,
}) => {
  return (
    <button className={selected ? "selected-filter" : "button"} onClick={onClick}>
      {label}{" "}
      {selected && sortDirection && (
        <FontAwesomeIcon icon={sortDirection === "asc" ? faArrowUp : faArrowDown} />
      )}
    </button>
  );
};

export default SortButton;
