import React, {Component} from "react";
import { useNavigate } from "react-router-dom";

const NavigateButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-96">
      <div>
        <button className="text-[25px] mb-3" onClick={() => navigate("/list")}>
          Danh sách chuyến đi
        </button>
      </div>
      <div>
        <button className="text-[25px]" onClick={() => navigate("/filter")}>
          Lọc chuyến xe
        </button>
      </div>
    </div>
  );
};

class Main extends Component {
  render() {
    return (
      <div className="h-screen bg-[#012f48] text-center">
        <div className=" text-center text-white relative">
          <div className="relative flex justify-center items-center">
            <div className="opacity-80 h-24 absolute bg-[#224963] w-[400px] rounded-md "></div>
            <div className="opacity-50 h-40 absolute bg-[#224963] w-[350px] rounded-md"></div>
            <h1 className="absolute top-16 text-[20px] font-bold uppercase">
              Xe liên tỉnh
            </h1>
            <NavigateButtons />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
