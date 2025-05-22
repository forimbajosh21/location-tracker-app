import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { LocationGeocodedAddress } from 'expo-location';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheetModal, {
  BottomSheetModalProps,
} from '@/src/components/BottomSheetModal';
import BottomSheetThemedView from '@/src/components/BottomSheetThemedView';
import ThemedText from '@/src/components/ThemedText';
import useLocation from '@/src/hooks/useLocation';
import { useMapStore } from '@/src/stores';
import { transformPlaceDetails } from '@/src/utils/text';

export type BottomSheetPlaceInfoProps = Omit<BottomSheetModalProps, 'children'>;

/**
 * BottomSheetPlaceInfo
 *
 * This component is used to show the place information
 * when the user clicks on a POI (Point of Interest) on the map.
 */
const BottomSheetPlaceInfo = React.forwardRef<
  GorhomBottomSheetModal,
  BottomSheetPlaceInfoProps
>(({ onDismiss, ...props }, ref) => {
  const insets = useSafeAreaInsets();

  const poi = useMapStore((state) => state.poi);

  const { getReverseGeocode } = useLocation();

  const insideRef = React.useRef<GorhomBottomSheetModal>(null);

  const [info, setInfo] = useState<LocationGeocodedAddress | null>(null);

  React.useImperativeHandle(
    ref,
    () => insideRef.current as unknown as GorhomBottomSheetModal,
  );

  async function handleReverseGeocode(index: number) {
    /**
     * this means that the sheet is being closed
     * and we should not do anything
     */
    if (index === -1) {
      return;
    }

    const coordinate = poi?.coordinate;
    if (!coordinate) return;

    /** get the detailed information using lat and lng */
    const response = await getReverseGeocode(
      coordinate.latitude,
      coordinate.longitude,
    );
    if (!response) return;

    setInfo(response);
  }

  function handleOnDismiss() {
    onDismiss?.();

    setInfo(null);
  }

  return (
    <BottomSheetModal
      ref={insideRef}
      stackBehavior="push"
      onChange={handleReverseGeocode}
      onDismiss={handleOnDismiss}
      {...props}
    >
      <BottomSheetThemedView
        style={StyleSheet.flatten([{ paddingBottom: insets.bottom }])}
      >
        <ThemedText type="subtitle" style={styles.title}>
          {poi?.name}
        </ThemedText>

        {info === null ? (
          <ActivityIndicator size="large" style={styles.indicator} />
        ) : (
          <View style={styles.details}>
            <ThemedText>{transformPlaceDetails(info)}</ThemedText>
          </View>
        )}
      </BottomSheetThemedView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  title: {
    paddingBottom: 16,
  },
  indicator: {
    paddingVertical: 32,
    alignSelf: 'center',
  },
  details: {
    paddingVertical: 16,
  },
});

BottomSheetPlaceInfo.displayName = 'BottomSheetPlaceInfo';
export default BottomSheetPlaceInfo;
