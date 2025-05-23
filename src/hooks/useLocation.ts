import * as Location from 'expo-location';
import { Alert, Linking, Platform } from 'react-native';

import { useLocationStore } from '@/src/stores';

const useLocation = () => {
  const setIsUserFromSettings = useLocationStore(
    (state) => state.setIsUserFromSettings,
  );
  const setPermission = useLocationStore((state) => state.setPermission);
  const setLocation = useLocationStore((state) => state.setLocation);

  function triggerPermissionAlert() {
    Alert.alert(
      'Maps works best with Location Services turned on.',
      "You'll get turn-by-turn directions, estimated travel times, and improved search results when you turn on Location Services for Maps.",
      [
        {
          text: 'Turn On in Settings',
          onPress: () => {
            if (Platform.OS === 'android') {
              return Linking.openSettings().then(() => {
                setIsUserFromSettings(true);
              });
            }

            Linking.openURL('app-settings:').then(() => {
              setIsUserFromSettings(true);
            });
          },
        },
        {
          text: 'Keep Location Services Off',
        },
      ],
    );
  }

  /** get the current location of the user */
  async function getCurrentLocation() {
    /** reset flag  */
    setIsUserFromSettings(false);

    let { status } = await Location.requestForegroundPermissionsAsync();
    setPermission(status);

    if (status !== 'granted') {
      /** show an alert when location permission is denied */
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    return location.coords;
  }

  /** get the current location of the user and show an alert if permission is denied */
  async function getCurrentLocationAndShowAlert() {
    const location = await getCurrentLocation();

    if (!location) {
      triggerPermissionAlert();
    }
  }

  async function getReverseGeocode(
    latitude: number,
    longitude: number,
  ): Promise<Location.LocationGeocodedAddress> {
    const response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    return response[0];
  }

  return {
    triggerPermissionAlert,
    getCurrentLocation,
    getCurrentLocationAndShowAlert,
    getReverseGeocode,
  };
};

export default useLocation;
