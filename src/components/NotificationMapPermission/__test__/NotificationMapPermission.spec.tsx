import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import NotificationMapPermission from '@/src/components/NotificationMapPermission';

const mockUseLocationStore = require('@/src/stores').useLocationStore;

// Mock dependencies
jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 42),
}));

jest.mock('@/src/hooks/useLocation', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getCurrentLocationAndShowAlert: jest.fn(),
  })),
}));

jest.mock('@/src/stores', () => ({
  useLocationStore: jest.fn(),
}));

jest.mock('@expo/vector-icons/AntDesign', () => 'AntDesign');
// jest.mock('@/src/components/ThemedText', () => 'ThemedText');

describe('NotificationMapPermission', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when permission is granted', () => {
    mockUseLocationStore.mockImplementation((cb: any) =>
      cb({ permission: 'granted' }),
    );
    const { queryByText } = render(<NotificationMapPermission />);
    expect(queryByText(/Location Services is off/i)).toBeNull();
  });

  it('should render notification when permission is not granted', () => {
    mockUseLocationStore.mockImplementation((cb: any) =>
      cb({ permission: null }),
    );

    const { getByText } = render(<NotificationMapPermission />);
    expect(getByText(/Location Services is off/i)).toBeTruthy();
  });

  it('should call getCurrentLocationAndShowAlert when pressed', () => {
    mockUseLocationStore.mockImplementation((cb: any) =>
      cb({ permission: null }),
    );
    const getCurrentLocationAndShowAlert = jest.fn();
    const useLocation = require('@/src/hooks/useLocation').default;
    useLocation.mockReturnValue({
      getCurrentLocationAndShowAlert,
    });

    const { getByRole } = render(<NotificationMapPermission />);
    fireEvent.press(getByRole('button'));
    expect(getCurrentLocationAndShowAlert).toHaveBeenCalled();
  });
});
