import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, {
  LatLng,
  MapViewProps,
  Marker,
  PoiClickEvent,
} from 'react-native-maps';

import MapMarker from '@/src/components/MapMarker';
import { customDarkMapStyle } from '@/src/constants';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { useLocationStore, useMapStore } from '@/src/stores';

export interface ThemedMapViewProps extends MapViewProps {
  onAnimateToUserLocation?: () => void;
  onSelectPoi?: () => void;
}

const camera = {
  center: {
    latitude: 12.8797,
    longitude: 121.774,
  },
  pitch: 0,
  heading: 0,
  zoom: 5.5,
};

const ThemedMapView = React.forwardRef<MapView, ThemedMapViewProps>(
  ({ onAnimateToUserLocation, onSelectPoi }, ref) => {
    const colorScheme = useColorScheme();

    const mapType = useMapStore((state) => state.type);
    const poi = useMapStore((state) => state.poi);
    const location = useLocationStore((state) => state.location);

    const setPoi = useMapStore((state) => state.setPoi);

    const insideRef = React.useRef<MapView>(null);

    React.useImperativeHandle(
      ref,
      () => insideRef.current as unknown as MapView,
    );

    async function handleOnMapReady() {
      await new Promise((resolve) => setTimeout(resolve, 350));
      onAnimateToUserLocation?.();
    }

    async function handleSetPoi(event: PoiClickEvent) {
      const ne = event.nativeEvent;

      setPoi({ coordinate: ne.coordinate, name: ne.name });

      /** this will present the PlaceInfo Bottom Sheet */
      onSelectPoi?.();

      /** delay the map re-centering */
      await new Promise((resolve) => setTimeout(resolve, 350));

      insideRef.current?.animateCamera(
        {
          center: {
            latitude: ne.coordinate.latitude,
            longitude: ne.coordinate.longitude,
          },
        },
        { duration: 500 },
      );
    }

    return (
      <MapView
        poiClickEnabled
        provider="google"
        userInterfaceStyle="dark"
        ref={insideRef}
        mapType={mapType}
        style={styles.map}
        camera={camera}
        customMapStyle={colorScheme === 'dark' ? customDarkMapStyle : undefined}
        onMapReady={handleOnMapReady}
        onPoiClick={handleSetPoi}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          }}
          onPress={() =>
            handleSetPoi({
              nativeEvent: {
                placeId: '',
                name: 'My Location',
                coordinate: location as LatLng,
              },
            } as PoiClickEvent)
          }
          style={{ visibility: location ? 'visible' : 'hidden' }}
        >
          <MapMarker />
        </Marker>
        {poi !== null && <Marker coordinate={poi.coordinate} zIndex={1} />}
      </MapView>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

ThemedMapView.displayName = 'ThemedMapView';

export default ThemedMapView;
