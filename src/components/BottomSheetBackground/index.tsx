import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

const BottomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, 'backgroundPrimary');

  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        styles.root,
        { backgroundColor: backgroundColor },
        style,
      ])}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomSheetBackground;
