import React from "react";
import ic_close from "../../assets/images/ic_close.svg";
import Time from "./time";
import Price from "./price";
import { Link} from "react-router-dom";

export default function List() {
  return (
    <div>
      <div className="flex bg-white header-filter">
        <Link to={"/filter"}>
          <img src={ic_close} />
        </Link>
        <h1 className="font-bold text-xl">Lọc chuyến xe</h1>
      </div>
      <div className="main-list">
        <Time />
      </div>
    </div>
  );
}
