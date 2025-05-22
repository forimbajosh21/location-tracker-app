import { PermissionStatus } from 'expo-location';
import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

import { MapType } from '@/src/types/Map';

interface MapState {
  type: MapType;
  poi: { name: string; coordinate: LatLng } | null;
}

interface MapActions {
  setMapType: (type: MapType) => void;
  setPoi: (poi: { name: string; coordinate: LatLng } | null) => void;
}

export const useMapStore = create<MapState & MapActions>((set) => ({
  type: 'standard',
  poi: null,
  setMapType: (type) => set(() => ({ type })),
  setPoi: (poi) => set(() => ({ poi })),
}));

interface LocationState {
  /** if the user comes from settings */
  isUserFromSettings: boolean;
  permission: PermissionStatus | null;
  location: LatLng | null;
}

interface LocationActions {
  setIsUserFromSettings: (isUserFromSettings: boolean) => void;
  setPermission: (permission: PermissionStatus) => void;
  setLocation: (location: LatLng) => void;
}

export const useLocationStore = create<LocationState & LocationActions>(
  (set) => ({
    isUserFromSettings: false,
    permission: null,
    location: null,
    setIsUserFromSettings: (isUserFromSettings) =>
      set(() => ({ isUserFromSettings })),
    setPermission: (permission) => set(() => ({ permission })),
    setLocation: (location) => set(() => ({ location: location })),
  }),
);
