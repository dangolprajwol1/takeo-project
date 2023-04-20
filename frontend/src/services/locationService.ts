export const getCurrentLocation = () => {
  const location: number[] = [];
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("allowed");
      location.push(position.coords.longitude);
      location.push(position.coords.latitude);
    },
    () => {
      console.log("denied");
      return [];
    }
  );
  return location;
};
