import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

import { useLocationStore, useMapStore } from '@/src/stores';

import BottomSheetPlaceInfo from '@/src/components/BottomSheetPlaceInfo';
import MapTools from '@/src/components/MapTools';
import NotificationMapPermission from '@/src/components/NotificationMapPermission';
import ThemedMapView from '@/src/components/ThemedMapView';
import useLocation from '@/src/hooks/useLocation';

export default function App() {
  const { getCurrentLocation } = useLocation();

  const permission = useLocationStore((state) => state.permission);
  const location = useLocationStore((state) => state.location);
  const isUserFromSettings = useLocationStore(
    (state) => state.isUserFromSettings,
  );

  const setPoi = useMapStore((state) => state.setPoi);

  const appState = useRef(AppState.currentState);
  const mapRef = useRef<MapView>(null);
  const placeInfoRef = useRef<GorhomBottomSheetModal>(null);

  /** trigger getting of user location when the app goes from background to foreground */
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        isUserFromSettings
      ) {
        getCurrentLocation();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [getCurrentLocation, isUserFromSettings]);

  /** force the map to re-center and animate to user coordinates */
  function handleAnimateToUserLocation() {
    if (permission === 'granted' && location) {
      mapRef.current?.animateCamera({
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        zoom: 17,
      });
    }
  }

  function handleShowPlaceInfoSheet() {
    placeInfoRef.current?.present();
  }

  function handleOnPlaceInfoDismiss() {
    setPoi(null);
  }

  return (
    <View style={styles.container}>
      <NotificationMapPermission />
      <MapTools onCenterMap={handleAnimateToUserLocation} />
      <ThemedMapView
        ref={mapRef}
        onAnimateToUserLocation={handleAnimateToUserLocation}
        onSelectPoi={handleShowPlaceInfoSheet}
      />
      <BottomSheetPlaceInfo
        enableDismissOnClose
        enablePanDownToClose
        ref={placeInfoRef}
        onDismiss={handleOnPlaceInfoDismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
});
