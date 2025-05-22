import { LocationGeocodedAddress } from 'expo-location';

/**
 * Remove all non-alphanumeric characters from a string
 *
 * @note this will prevent null and undefined being transformed into a string
 */
export function stringOnly(text: string | null) {
  if (typeof text !== 'string') {
    return '';
  }

  return text.replace(/[^a-zA-Z0-9 ]/g, '');
}

/**
 * Transform the location details into a readable string
 */
export function transformPlaceDetails(location: LocationGeocodedAddress) {
  const { streetNumber, name, district, city, postalCode, region, country } =
    location;

  const firstDetails = [
    stringOnly(streetNumber),
    stringOnly(name),
    stringOnly(district),
  ];

  const secondDetails = [
    stringOnly(city),
    stringOnly(postalCode),
    stringOnly(region),
    stringOnly(country),
  ];

  return (
    firstDetails.filter((d) => d).join(' ') +
    ', ' +
    secondDetails.filter((d) => d).join(' ')
  );
}
