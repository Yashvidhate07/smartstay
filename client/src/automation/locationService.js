export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Use OpenStreetMap reverse geocoding (free)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "";

        resolve(city.toLowerCase());
      },
      () => reject("Location permission denied")
    );
  });
};
