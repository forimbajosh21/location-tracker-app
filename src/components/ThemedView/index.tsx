import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'primary' | 'secondary';
};

function ThemedView({
  style,
  lightColor,
  darkColor,
  variant = 'primary',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant === 'primary' ? 'backgroundPrimary' : 'backgroundSecondary',
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default ThemedView;
