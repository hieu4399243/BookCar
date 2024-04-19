import React, { Component } from "react";
import { connect } from "react-redux";
import PriceView from "./PriceTripView";
import TimeOption from "../../components/TimeOption";
import GarageListItem from "../../components/List/GarageListItem";
import VehicleListItem from "../../components/List/VehicleListItem";
import {
  setFilteredTrips,
  setAppliedFilter,
} from "../../stores/Features/Slices/FilterTripSlice";
import { groupTripsByTimeOfDate } from "../../utils/groupTripsByDate";
import data from "../../constants/locchuyenxe.json";
import { Trip } from "../TripModels";
import { useNavigate } from "react-router";

interface TimeTripViewProps {
  dispatch: any;
  appliedFilter: any;
}

interface TimeTripViewState {
  selectedTime: string[];
  priceRange: number[];
  vehicleCheckboxes: string[];
  garageCheckboxes: string[];
  groupedTrips: { [key: string]: Trip[] };
  groupedTripsLength: Trip[];
  tempFilteredTrips: Trip[] | null;
  clickedOption: string | null;
}

interface NavigationComponentProps {
  applyFilters: () => void;
  tempFilteredTrips: any;
}

const NavigationComponent: React.FC<NavigationComponentProps> = ({
  applyFilters,
  tempFilteredTrips,
}) => {
  const navigate = useNavigate();
  const _handleFilter = () => {
    applyFilters();
    navigate("/list");
  };

  return (
    <div>
      <button className="button-right" onClick={_handleFilter}>
        Áp dụng(
        {tempFilteredTrips && tempFilteredTrips.length
          ? tempFilteredTrips.length
          : 0}
        )
      </button>
    </div>
  );
};

class TimeTripView extends Component<TimeTripViewProps, TimeTripViewState> {
  constructor(props: TimeTripViewProps) {
    super(props);
    this.state = {
      selectedTime: [],
      priceRange: [0, 3000000],
      vehicleCheckboxes: [],
      garageCheckboxes: [],
      groupedTrips: groupTripsByTimeOfDate(data.json.coreData.data),
      groupedTripsLength: data.json.coreData.data,
      tempFilteredTrips: data.json.coreData.data,
      clickedOption: null,
    };
  }

  componentDidMount() {
    const { appliedFilter } = this.props;
    if (appliedFilter) {
      this.setState({
        selectedTime: appliedFilter.selectedTime,
        priceRange: appliedFilter.priceRange,
        vehicleCheckboxes: appliedFilter.vehicleCheckboxes,
        garageCheckboxes: appliedFilter.garageCheckboxes,
      });
    }
  }

  componentDidUpdate(
    prevProps: TimeTripViewProps,
    prevState: TimeTripViewState
  ) {
    const {
      selectedTime,
      priceRange,
      garageCheckboxes,
      vehicleCheckboxes,
      groupedTrips,
    } = this.state;
    if (
      prevState.selectedTime !== selectedTime ||
      prevState.priceRange !== priceRange ||
      prevState.garageCheckboxes !== garageCheckboxes ||
      prevState.vehicleCheckboxes !== vehicleCheckboxes ||
      prevState.groupedTrips !== groupedTrips
    ) {
      let currentFilteredTrips = data.json.coreData.data;
      if (selectedTime.length > 0) {
        currentFilteredTrips = selectedTime.reduce(
          (acc: Trip[], time: string) => {
            return acc.concat(groupedTrips[time] || []);
          },
          []
        );
      }

      currentFilteredTrips = currentFilteredTrips.filter((trip: Trip) => {
        return (
          trip.discount_amount >= priceRange[0] &&
          trip.discount_amount <= priceRange[1] &&
          (vehicleCheckboxes.length === 0 ||
            vehicleCheckboxes.includes(trip.vehicle_name)) &&
          (garageCheckboxes.length === 0 ||
            garageCheckboxes.includes(trip.transport_information.name))
        );
      });

      const timerId = setTimeout(() => {
        this.setState({ tempFilteredTrips: currentFilteredTrips });
      }, 500);

      return () => clearTimeout(timerId);
    }
  }

  _handleApplyFilters = () => {
    const {
      tempFilteredTrips,
      selectedTime,
      priceRange,
      vehicleCheckboxes,
      garageCheckboxes,
    } = this.state;
    const appliedFilters = {
      selectedTime: selectedTime,
      priceRange: priceRange,
      vehicleCheckboxes: vehicleCheckboxes,
      garageCheckboxes: garageCheckboxes,
    };
    this.props.dispatch(setFilteredTrips(tempFilteredTrips));
    this.props.dispatch(setAppliedFilter(appliedFilters));
  };

  _handleCancel = () => {
    this.setState({
      clickedOption: null,
      selectedTime: [],
    });
    this.props.dispatch(setFilteredTrips(this.state.groupedTripsLength));
    this.setState({
      priceRange: [0, 3000000],
      vehicleCheckboxes: [],
      garageCheckboxes: [],
    });
  };

  _handleFilter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    time: string
  ) => {
    const { selectedTime, clickedOption } = this.state;
    const updateSelectedTime = selectedTime.includes(time)
      ? selectedTime.filter((t) => t !== time)
      : [...selectedTime, time];
    this.setState({
      selectedTime: updateSelectedTime,
      clickedOption: time === clickedOption ? null : time,
    });
  };

  _handleCheckBoxByVehicle = (name: string) => {
    const { vehicleCheckboxes } = this.state;
    const updatedVehicleCheckboxes = vehicleCheckboxes.includes(name)
      ? vehicleCheckboxes.filter((checkbox) => checkbox !== name)
      : [...vehicleCheckboxes, name];
    this.setState({ vehicleCheckboxes: updatedVehicleCheckboxes });
  };

  _handleCheckBoxByGarage = (name: string) => {
    const { garageCheckboxes } = this.state;
    const updatedGarageCheckboxes = garageCheckboxes.includes(name)
      ? garageCheckboxes.filter((checkbox) => checkbox !== name)
      : [...garageCheckboxes, name];
    this.setState({ garageCheckboxes: updatedGarageCheckboxes });
  };

  setPriceRange = (priceRange: number[]) => {
    this.setState({ priceRange });
  };

  render() {
    const {
      selectedTime,
      priceRange,
      tempFilteredTrips,
      clickedOption,
      vehicleCheckboxes,
      garageCheckboxes,
    } = this.state;

    const timeOptions: { time: string; label: string }[] = [
      { time: "morning", label: "Sáng sớm" },
      { time: "noon", label: "Buổi sáng" },
      { time: "afternoon", label: "Buổi trưa" },
      { time: "evening", label: "Buổi tối" },
    ];

    const isOptionSelected = (time: string) => selectedTime.includes(time);

    const uniqueTransportNames: { name: string; imageUrl: string }[] = [];
    const seenTransportNames = new Set<string>();

    data.json.coreData.data.forEach((trip: Trip) => {
      const transportName = trip.transport_information.name;
      if (!seenTransportNames.has(transportName)) {
        uniqueTransportNames.push({
          name: transportName,
          imageUrl: trip.transport_information.image_url,
        });
        seenTransportNames.add(transportName);
      }
    });

    const allVehicleNames = Array.from(
      new Set(data.json.coreData.data.map((trip: Trip) => trip.vehicle_name))
    );

    return (
      <div>
        <div>
          <h2 className="px-5 pt-5 font-semibold">Thời gian khởi hành</h2>

          <div className="grid grid-cols-2 main-grid">
            {timeOptions.map(({ time, label }, index) => (
              <TimeOption
                key={index}
                isSelected={isOptionSelected(time)}
                time={time}
                handleFilter={this._handleFilter}
                label={label}
              />
            ))}
          </div>

          <PriceView
            setPriceRange={this.setPriceRange}
            priceRange={priceRange}
          />

          <div className="garage">
            <div>
              <h2 className="font-semibold mb-3">Nhà xe</h2>
            </div>
            <div>
              <div className="garage-list">
                <ul>
                  {uniqueTransportNames.map((item, index) => (
                    <GarageListItem
                      key={index}
                      item={item}
                      isChecked={garageCheckboxes.includes(item.name)}
                      handleCheckBox={this._handleCheckBoxByGarage}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="category-car">
            <div>
              <h2 className="font-semibold mb-3">Loại xe</h2>
            </div>
            <div>
              <div className="vertical-list">
                <ul>
                  {allVehicleNames.map((name, index) => (
                    <VehicleListItem
                      key={index}
                      name={name}
                      vehicleCheckboxes={vehicleCheckboxes.includes(name)}
                      handleCheckBox={this._handleCheckBoxByVehicle}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-list">
            <div>
              <button className="button-left" onClick={this._handleCancel}>
                Xoá lọc
              </button>
            </div>
            <NavigationComponent
              applyFilters={this._handleApplyFilters}
              tempFilteredTrips={tempFilteredTrips}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  appliedFilter: state.filteredTrips.appliedFilter.filter,
});

export default connect(mapStateToProps)(TimeTripView);
