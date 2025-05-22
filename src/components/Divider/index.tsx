import { StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

const Divider = () => {
  const textSecondaryColor = useThemeColor({}, 'textSecondary');

  return (
    <View
      style={StyleSheet.flatten([
        styles.root,
        { backgroundColor: textSecondaryColor },
      ])}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    height: 1,
  },
});

export default Divider;
