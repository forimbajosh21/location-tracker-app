import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { Fragment, useRef } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Divider from '@/src/components/Divider';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import BottomSheetChangeMapView from '../BottomSheetChangeMapView';

export interface MapToolsProps {
  onCenterMap?: () => void;
  style?: StyleProp<ViewStyle>;
}

const icons = ['map', 'location-outline'] as const;

/**
 * MapTools component
 *
 * This component is used to show the map tools
 * It contains two icons:
 * 1. Map: to show the map type selection
 * 2. Location: to center the map on the user's location
 */
const MapTools: React.FC<MapToolsProps> = ({ onCenterMap, style }) => {
  const headerHeight = useHeaderHeight();
  const backgroundPrimaryColor = useThemeColor({}, 'backgroundPrimary');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');

  const changeMapViewRef = useRef<GorhomBottomSheetModal>(null);

  function handlePress(icon: (typeof icons)[number]) {
    switch (icon) {
      /** for changing map view */

      case 'map':
        changeMapViewRef.current?.present();
        break;
      /** for centering the map on user's location */
      case 'location-outline':
        onCenterMap?.();
      default:
        break;
    }
  }

  return (
    <>
      <View
        style={StyleSheet.flatten([
          styles.root,
          { top: headerHeight + 40 },
          style,
        ])}
      >
        {icons.map((icon, index) => (
          <Fragment key={`${icon}-${index}`}>
            <Pressable
              accessibilityRole="button"
              onPress={() => handlePress(icon)}
              style={StyleSheet.flatten([
                styles.content,
                { backgroundColor: backgroundPrimaryColor },
              ])}
            >
              <Ionicons name={icon} size={22} color={textSecondaryColor} />
            </Pressable>
            {index % 2 === 0 && <Divider />}
          </Fragment>
        ))}
      </View>
      <BottomSheetChangeMapView ref={changeMapViewRef} />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 16,
    zIndex: 1,
    borderRadius: 10,
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapTools;
