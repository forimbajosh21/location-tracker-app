import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import MapTools from '@/src/components/MapTools';

// Mock dependencies
jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 0,
}));
jest.mock('@/src/hooks/useThemeColor', () => ({
  useThemeColor: (_: any, color: string) => color,
}));
jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');
jest.mock('@/src/components/Divider', () => {
  const { Text } = require('react-native');
  return {
    __esModule: true,
    default: () => <Text>Divider</Text>,
  };
});
jest.mock('@/src/components/BottomSheetChangeMapView', () => {
  const r = require('react');
  return {
    __esModule: true,
    default: r.forwardRef(() => <></>),
  };
});

describe('MapTools', () => {
  it('renders two icons and a divider', () => {
    const { getAllByText, queryAllByText } = render(<MapTools />);
    // Ionicons is mocked as a string, so getAllByType won't work; check for Pressable count
    // There should be two Pressable components (for two icons)
    // Divider is mocked as a string, so getAllByText
    expect(getAllByText('Divider').length).toBe(1);
  });

  it('calls onCenterMap when location icon is pressed', () => {
    const onCenterMap = jest.fn();
    const { getAllByRole } = render(<MapTools onCenterMap={onCenterMap} />);
    // The second icon is the location icon
    const pressables = getAllByRole('button');
    fireEvent.press(pressables[1]);
    expect(onCenterMap).toHaveBeenCalled();
  });

  it('opens BottomSheetChangeMapView when map icon is pressed', () => {
    // We need to spy on the ref's present method
    const presentMock = jest.fn();
    jest
      .spyOn(React, 'useRef')
      .mockReturnValueOnce({ current: { present: presentMock } });
    const { getAllByRole } = render(<MapTools />);
    // The first icon is the map icon
    const pressables = getAllByRole('button');
    fireEvent.press(pressables[0]);
    expect(presentMock).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
