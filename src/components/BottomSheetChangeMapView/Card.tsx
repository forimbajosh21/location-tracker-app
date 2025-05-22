import { Image } from 'expo-image';
import { Dimensions, Pressable, StyleSheet } from 'react-native';

import ThemedText from '@/src/components/ThemedText';
import ThemedView from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';
import { MapType } from '@/src/types/Map';

export interface ChangeMapViewCardProps {
  active?: boolean;
  id: MapType;
  title: string;
  source: string;
  onMapViewPress?: (type: MapType) => void;
}

const ChangeMapViewCard: React.FC<ChangeMapViewCardProps> = ({
  active = false,
  id,
  title,
  source,
  onMapViewPress,
}) => {
  function handlePress() {
    onMapViewPress?.(id);
  }

  return (
    <Pressable onPress={handlePress}>
      <ThemedView
        variant="primary"
        style={StyleSheet.flatten([styles.root, active && styles.active])}
      >
        <Image contentFit="cover" source={source} style={styles.image} />
        <ThemedView variant="secondary" style={styles.content}>
          <ThemedText>{title}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  active: {
    borderColor: Colors.light.active,
  },
  image: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    width: Dimensions.get('screen').width / 2 - 30 - 16,
    height: 80,
  },
  content: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    padding: 8,
  },
});

export default ChangeMapViewCard;
