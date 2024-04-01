import data from "../constants/locchuyenxe.json";

export function groupTripsByTimeOfDate(trips: any[]) {
  const groupedTrips: Record<string, any[]> = {
    morning: [],
    noon: [],
    afternoon: [],
    evening: [],
  };

  trips.forEach((trip) => {
    const pickUpTime = parseTime(trip.pick_up_time);
    if (pickUpTime >= 0 && pickUpTime < 6) {
      groupedTrips.morning.push(trip);
    } else if (pickUpTime >= 6 && pickUpTime < 12) {
      groupedTrips.noon.push(trip);
    } else if (pickUpTime >= 12 && pickUpTime < 18) {
      groupedTrips.afternoon.push(trip);
    } else if (pickUpTime >= 18 && pickUpTime <= 23) {
      groupedTrips.evening.push(trip);
    }
  });
  return groupedTrips;
}

function parseTime(timeString: string) {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours + minutes / 60;
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} giờ ${remainingMinutes} phút`;
};

export function dateTime(dateString: string) {
  const convertedDateString = dateString.split("-").join("/");
  return convertedDateString;
}
