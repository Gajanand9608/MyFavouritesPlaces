const GOOGLE_API_KEY = "USE_YOUR_KEY";

export function getMapPreview(lat, log) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${log}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${log}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddressAsync(lat,lng) {
  const locationurl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(locationurl);

  if(!response.ok){
    throw new Error("Failed to fetch address. Please try again!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
} 