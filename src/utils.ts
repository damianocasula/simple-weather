const DEFAULT_USER_LOCATION = {
  lat: 47.2344,
  lon: 16.3667,
}

export function getUserLocation() {
  const userLocation = { ...DEFAULT_USER_LOCATION }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation.lat = position.coords.latitude
      userLocation.lon = position.coords.longitude
    }, console.error)
  }

  return userLocation
}