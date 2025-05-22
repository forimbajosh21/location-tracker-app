import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/src/constants/Colors';

const MapMarker = () => {
  return (
    <Pressable accessibilityRole="button" style={styles.root}>
      <View accessibilityRole="none" accessible style={styles.content} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.backgroundPrimary,
    padding: 4,
    borderRadius: 24,
  },
  content: {
    backgroundColor: Colors.light.active,
    width: 16,
    height: 16,
    borderRadius: 24,
  },
});

export default MapMarker;
