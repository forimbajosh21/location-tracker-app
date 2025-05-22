import { render } from '@testing-library/react-native';
import React from 'react';

import ThemedView from '@/src/components/ThemedView';

import { useThemeColor } from '@/src/hooks/useThemeColor';

// Mock useThemeColor hook
jest.mock('@/src/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with primary background color by default', () => {
    (useThemeColor as jest.Mock).mockReturnValue('mocked-primary-color');
    const { getByTestId } = render(<ThemedView testID="themed-view" />);
    const view = getByTestId('themed-view');
    expect(view.props.style[0].backgroundColor).toBe('mocked-primary-color');
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      'backgroundPrimary',
    );
  });

  it('renders with secondary background color when variant is secondary', () => {
    (useThemeColor as jest.Mock).mockReturnValue('mocked-secondary-color');
    const { getByTestId } = render(
      <ThemedView testID="themed-view" variant="secondary" />,
    );
    const view = getByTestId('themed-view');
    expect(view.props.style[0].backgroundColor).toBe('mocked-secondary-color');
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: undefined, dark: undefined },
      'backgroundSecondary',
    );
  });

  it('passes lightColor and darkColor to useThemeColor', () => {
    (useThemeColor as jest.Mock).mockReturnValue('mocked-color');
    render(
      <ThemedView testID="themed-view" lightColor="#fff" darkColor="#000" />,
    );
    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#fff', dark: '#000' },
      'backgroundPrimary',
    );
  });

  it('applies custom style and other props', () => {
    (useThemeColor as jest.Mock).mockReturnValue('mocked-color');
    const style = { borderRadius: 10 };
    const { getByTestId } = render(
      <ThemedView
        testID="themed-view"
        style={style}
        accessible
        accessibilityLabel="label"
      />,
    );
    const view = getByTestId('themed-view');
    expect(view.props.style).toEqual([
      { backgroundColor: 'mocked-color' },
      style,
    ]);
    expect(view.props.accessible).toBe(true);
    expect(view.props.accessibilityLabel).toBe('label');
  });
});
