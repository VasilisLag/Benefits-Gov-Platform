import geoData from '@/utils/geo_data.json';

// Function to get the coefficient for a specified area
export function getCoefficient(areaName) {
  // Find the area in the data and return the coefficient if found
  const areaData = geoData.find(item => item.area === areaName);
  return areaData ? parseFloat(areaData.coefficient) : null;
}
