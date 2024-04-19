import React, { Component } from "react";
import { Link } from "react-router-dom";
import ic_filter_white from "../../assets/images/ic_filter_white.svg";
import ListCar from "../List-car/ListCar";
import Slider from "./Slider";
import { connect} from "react-redux";
import data from "../../constants/locchuyenxe.json";
import SortButton from "../../components/SortButton";
import FilterHeader from "../../components/FilterHeader";
import { Trip } from "../TripModels";
import "./ListCar.css";
import { setFilteredTrips } from "../../stores/Features/Slices/FilterTripSlice";

interface FilterListCarProps {
  filteredTrips: Trip[];
  appliedFilter: boolean;
  setFilteredTrips: (trips: Trip[]) => void;
}

interface FilterListCarState {
  initialData: Trip[];
  filteredTrips: Trip[];
  appliedFilter: boolean;
  selectedFilters: string[];
  sortDirectionDeparture: "asc" | "desc" | null;
  sortDirectionRating: "asc" | "desc" | null;
  sortDirectionDiscount: "asc" | "desc" | null;
  selectedButton: string;
  filtered: Trip[];
}

class FilterListCar extends Component<FilterListCarProps, FilterListCarState> {
  constructor(props: FilterListCarProps) {
    super(props);
    const trip = data.json.coreData.data;
    this.state = {
      initialData: trip,
      filteredTrips: props.filteredTrips || [],
      appliedFilter: props.appliedFilter,
      selectedFilters: [],
      sortDirectionDeparture: null,
      sortDirectionRating: null,
      sortDirectionDiscount: null,
      selectedButton: "",
      filtered: trip || [],
    };
  }

  componentDidMount() {
    if (this.state.appliedFilter) {
      this.setState({ filtered: this.state.filteredTrips });
    } else {
      this.setState({ filtered: this.state.initialData });
    }
  }

  componentDidUpdate(prevProps: FilterListCarProps) {
    if (prevProps.filteredTrips !== this.props.filteredTrips) {
      this.setState({ filteredTrips: this.props.filteredTrips });
    }
    if (prevProps.appliedFilter !== this.props.appliedFilter) {
      if (this.props.appliedFilter) {
        this.setState({ filtered: this.state.filteredTrips });
      } else {
        this.setState({ filtered: this.state.initialData });
      }
    }
  }

  sortByDepartureTimeAndDate = (a: Trip, b: Trip) => {
    const dateComparison = a.pick_up_date.localeCompare(b.pick_up_date);
    if (dateComparison === 0) {
      return a.departure_time.localeCompare(b.departure_time);
    }
    return dateComparison;
  };

  sortRating = (a: Trip, b: Trip) => {
    return (
      parseFloat(a.transport_information.rating) -
      parseFloat(b.transport_information.rating)
    );
  };

  sortTripsAndUpdate = (
    trips: Trip[],
    direction: "asc" | "desc" | null,
    field: string
  ) => {
    let sortedTrips = [...trips];
    if (field === "departure_time") {
      sortedTrips.sort((a, b) =>
        direction === "asc"
          ? this.sortByDepartureTimeAndDate(a, b)
          : this.sortByDepartureTimeAndDate(b, a)
      );
    } else if (field === "rating") {
      sortedTrips.sort((a, b) =>
        direction === "asc" ? this.sortRating(a, b) : this.sortRating(b, a)
      );
    } else if (field === "discount_amount") {
      sortedTrips.sort((a, b) =>
        direction === "asc"
          ? a.discount_amount - b.discount_amount
          : b.discount_amount - a.discount_amount
      );
    }
    this.setState({ filteredTrips: sortedTrips });
  };

  _handleSort = (field: string) => {
    let newSortDirection: "asc" | "desc" | null = null;

    let sortedTrips: Trip[] = [...this.state.filteredTrips];
    let updatedFilters: string[] = [];
    let selectedButtonIcon = "";
    if (field === "departure_time") {
      newSortDirection =
        this.state.sortDirectionDeparture === "asc" ? "desc" : "asc";
      this.setState({ sortDirectionDeparture: newSortDirection });
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? this.sortByDepartureTimeAndDate(a, b)
          : this.sortByDepartureTimeAndDate(b, a)
      );
      updatedFilters = ["departure_time"];
      selectedButtonIcon = "sortDirectionDeparture";
    } else if (field === "rating") {
      newSortDirection =
        this.state.sortDirectionRating === "asc" ? "desc" : "asc";
      this.setState({ sortDirectionRating: newSortDirection });
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? this.sortRating(a, b)
          : this.sortRating(b, a)
      );
      updatedFilters = ["rating"];
      selectedButtonIcon = "sortDirectionRating";
    } else if (field === "discount_amount") {
      newSortDirection =
        this.state.sortDirectionDiscount === "asc" ? "desc" : "asc";
      this.setState({ sortDirectionDiscount: newSortDirection });
      sortedTrips.sort((a, b) =>
        newSortDirection === "asc"
          ? a.discount_amount - b.discount_amount
          : b.discount_amount - a.discount_amount
      );
      updatedFilters = ["discount_amount"];
      selectedButtonIcon = "sortDirectionDiscount";
    }

    this.setState({
      selectedFilters: updatedFilters,
      selectedButton: selectedButtonIcon,
    });
    this.sortTripsAndUpdate(sortedTrips, newSortDirection, field);
  };

  _handleCancel() {
    this.setState({
      selectedFilters: [],
      selectedButton: "",
      sortDirectionDeparture: null,
      sortDirectionRating: null,
      sortDirectionDiscount: null,
    });
    if (this.props.appliedFilter === true) {
      this.setState({ filteredTrips: this.props.filteredTrips });
    } else {
      this.setState({ filteredTrips: this.state.initialData });
    }
  }

  render() {
    const { appliedFilter } = this.props;
    const buttonConfigs = [
      {
        label: "Giờ chạy",
        field: "departure_time",
        selected: this.state.selectedFilters.includes("departure_time"),
        sortDirection: this.state.sortDirectionDeparture,
      },
      {
        label: "Giá vé",
        field: "discount_amount",
        selected: this.state.selectedFilters.includes("discount_amount"),
        sortDirection: this.state.sortDirectionDiscount,
      },
      {
        label: "Đánh giá",
        field: "rating",
        selected: this.state.selectedFilters.includes("rating"),
        sortDirection: this.state.sortDirectionRating,
      },
    ];

    return (
      <div>
        <div className="header-filter-list">
          <FilterHeader
            title="Chọn chuyến đi"
            subTitle="Long Biên - An Lão"
            onCancel={this._handleCancel}
          />
          <div>
            <Slider />
          </div>
          <div className="filter-button">
            {buttonConfigs.map((item, index) => (
              <SortButton
                key={index}
                label={item.label}
                selected={item.selected}
                onClick={() => this._handleSort(item.field)}
                sortDirection={item.sortDirection}
              />
            ))}

            <Link
              className={`${appliedFilter ? "filter-selected" : "filter-icon"}`}
              to={"/filter"}
            >
              <button>Lọc</button>
              <img src={ic_filter_white} alt="Filter" />
            </Link>
          </div>
        </div>

        <div className="main-list-filter">
          <ListCar filteredTrips={this.state.filtered} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  filteredTrips: state.filteredTrips.filteredTrips,
  appliedFilter: state.filteredTrips.appliedFilter.filterApplied,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilteredTrips: (trips: Trip[]) => dispatch(setFilteredTrips(trips)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterListCar);
