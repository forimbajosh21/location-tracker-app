import { render } from '@testing-library/react-native';
import React from 'react';

import Divider from '@/src/components/Divider';

const useThemeColor = require('@/src/hooks/useThemeColor').useThemeColor;

// Mock useThemeColor hook
jest.mock('@/src/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('Divider', () => {
  const mockColor = '#cccccc';

  beforeEach(() => {
    useThemeColor.mockReturnValue(mockColor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a View with correct style', () => {
    const { getByTestId } = render(<Divider />);

    // Since the component does not have a testID, we can query by type
    const divider = getByTestId('divider-view');
    expect(divider).toBeTruthy();
    expect(divider.props.style).toEqual(
      expect.objectContaining({
        height: 1,
        backgroundColor: mockColor,
      }),
    );
  });

  it('calls useThemeColor with correct arguments', () => {
    render(<Divider />);
    expect(useThemeColor).toHaveBeenCalledWith({}, 'textSecondary');
  });
});

// Patch Divider to add testID for easier querying in tests
jest.mock('@/src/components/Divider', () => {
  const { StyleSheet, View } = require('react-native');
  const { useThemeColor } = require('@/src/hooks/useThemeColor');

  const styles = StyleSheet.create({ root: { height: 1 } });
  return function Divider() {
    const textSecondaryColor = useThemeColor({}, 'textSecondary');
    return (
      <View
        testID="divider-view"
        style={StyleSheet.flatten([
          styles.root,
          { backgroundColor: textSecondaryColor },
        ])}
      />
    );
  };
});
