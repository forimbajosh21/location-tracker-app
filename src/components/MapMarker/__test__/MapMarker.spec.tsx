import { render } from '@testing-library/react-native';
import React from 'react';

import MapMarker from '@/src/components/MapMarker';

describe('MapMarker', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<MapMarker />);
    // The root Pressable should exist
    expect(getByRole('button')).toBeTruthy();
    // The content View should exist
    expect(getByRole('none')).toBeTruthy();
  });
});
