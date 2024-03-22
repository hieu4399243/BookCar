import React from "react";

export default function Main() {
  return (
    <div className=" text-center text-white relative">
      <div className="relative flex justify-center items-center">
        <div className="opacity-80 h-24 absolute bg-[#224963] w-[400px] rounded-md "></div>
        <div className="opacity-50 h-40 absolute bg-[#224963] w-[350px] rounded-md"></div>
        <h1 className="absolute top-16 text-[20px] font-bold uppercase">
          Xe liên tỉnh
        </h1>
        <div className="absolute top-96">
          <div>
            <button className="text-[25px] mb-3">
              Danh sách chuyến đi
            </button>
          </div>
          <div>
            <button className="text-[25px]">Lọc chuyến xe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
