import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { createRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheetModal, {
  BottomSheetModalProps,
} from '@/src/components/BottomSheetModal';
import BottomSheetThemedView from '@/src/components/BottomSheetThemedView';
import ThemedText from '@/src/components/ThemedText';
import { MapTypes } from '@/src/constants';
import { useMapStore } from '@/src/stores';
import { MapType } from '@/src/types/Map';

import ChangeMapViewCard from './Card';

export type BottomSheetChangeMapViewProps = Omit<
  BottomSheetModalProps,
  'children'
>;

const BottomSheetChangeMapView = forwardRef<
  GorhomBottomSheetModal,
  BottomSheetChangeMapViewProps
>((props, ref) => {
  const insets = useSafeAreaInsets();

  const insideRef = createRef<GorhomBottomSheetModal>();

  useImperativeHandle(
    ref,
    () => insideRef.current as unknown as GorhomBottomSheetModal,
  );

  const mapType = useMapStore((state) => state.type);
  const setMapType = useMapStore((state) => state.setMapType);

  async function handleMapViewPress(type: MapType) {
    setMapType(type);

    await insideRef.current?.dismiss();
  }

  return (
    <BottomSheetModal ref={insideRef} enablePanDownToClose enableDismissOnClose>
      <BottomSheetThemedView style={{ paddingBottom: insets.bottom }}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">Choose Map:</ThemedText>
        </View>
        <View style={styles.mapsContainer}>
          {MapTypes.map((map, index) => {
            return (
              <ChangeMapViewCard
                key={index}
                active={mapType === map.id}
                onMapViewPress={handleMapViewPress}
                {...map}
              />
            );
          })}
        </View>
      </BottomSheetThemedView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: 16,
  },
  mapsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

BottomSheetChangeMapView.displayName = 'BottomSheetChangeMapView';

export default BottomSheetChangeMapView;
