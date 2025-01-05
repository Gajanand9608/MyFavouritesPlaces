const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export function getMapPreview(lat, log) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${log}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${log}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
