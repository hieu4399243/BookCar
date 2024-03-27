import React from "react";
import {
  Route,
  Link,
  Routes,
} from "react-router-dom";

export default function Main() {
  const main = () => {
    return (
      <div className="h-screen bg-[#012f48] text-center">
        <div className=" text-center text-white relative">
          <div className="relative flex justify-center items-center">
            <div className="opacity-80 h-24 absolute bg-[#224963] w-[400px] rounded-md "></div>
            <div className="opacity-50 h-40 absolute bg-[#224963] w-[350px] rounded-md"></div>
            <h1 className="absolute top-16 text-[20px] font-bold uppercase">
              Xe liên tỉnh
            </h1>
            <div className="absolute top-96">
              <div>
                <Link className="text-[25px] mb-3" to={'/filter'}>
                  Danh sách chuyến đi
                </Link>
              </div>
              <div>
                <Link className="text-[25px]" to={'/list'}>Lọc chuyến xe</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      {main()}
    </div>
  );
}
