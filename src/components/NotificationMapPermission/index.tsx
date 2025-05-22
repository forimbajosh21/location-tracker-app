import AntDesign from '@expo/vector-icons/AntDesign';
import { useHeaderHeight } from '@react-navigation/elements';
import { Pressable, StyleSheet } from 'react-native';

import ThemedText from '@/src/components/ThemedText';
import { Colors } from '@/src/constants/Colors';
import useLocation from '@/src/hooks/useLocation';
import { useLocationStore } from '@/src/stores';

/**
 * NotificationMapPermission component
 *
 * This component is used to show the notification
 * when the user has not granted location permission
 */
const NotificationMapPermission = () => {
  const headerHeight = useHeaderHeight();

  const permission = useLocationStore((state) => state.permission);

  const { getCurrentLocationAndShowAlert } = useLocation();

  if (permission === 'granted') {
    return null;
  }

  return (
    <Pressable
      role="button"
      onPress={getCurrentLocationAndShowAlert}
      style={StyleSheet.flatten([styles.root, { top: headerHeight }])}
    >
      <ThemedText
        lightColor="#FFFFFF"
        darkColor="#FFFFFF"
        type="defaultSemiBold"
        variant="primary"
      >
        Location Services is off
      </ThemedText>
      <AntDesign name="rightcircle" size={16} color="#FFFFFF" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,

    backgroundColor: Colors.light.active,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,

    flexDirection: 'row',
  },
});

export default NotificationMapPermission;
