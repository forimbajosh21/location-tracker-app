import { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export interface BottomSheetThemedViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BottomSheetThemedView: React.FC<BottomSheetThemedViewProps> = ({
  children,
  style,
}) => {
  const backgroundPrimaryColor = useThemeColor({}, 'backgroundPrimary');

  return (
    <BottomSheetView
      style={StyleSheet.flatten([
        styles.root,
        { backgroundColor: backgroundPrimaryColor },
        style,
      ])}
    >
      {children}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 30,
    paddingTop: 12,
  },
});

export default BottomSheetThemedView;
