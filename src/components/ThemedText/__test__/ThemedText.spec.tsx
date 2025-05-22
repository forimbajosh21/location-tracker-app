import { render } from '@testing-library/react-native';
import React from 'react';

import ThemedText, { ThemedTextProps } from '@/src/components/ThemedText';

// Mock useThemeColor hook
jest.mock('@/src/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn().mockImplementation((_, colorName) => {
    // Return a different color for primary/secondary for test visibility
    return colorName === 'textPrimary' ? 'black' : 'gray';
  }),
}));

describe('ThemedText', () => {
  const baseProps: ThemedTextProps = {
    children: 'Test Text',
  };

  it('renders with default props', () => {
    const { getByText } = render(<ThemedText {...baseProps} />);
    const text = getByText('Test Text');
    expect(text).toBeTruthy();
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: 'black' }),
        expect.objectContaining({ fontSize: 16 }),
      ]),
    );
  });

  it('applies the correct style for type="title"', () => {
    const { getByText } = render(<ThemedText {...baseProps} type="title" />);
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 48,
        }),
      ]),
    );
  });

  it('applies the correct style for type="defaultSemiBold"', () => {
    const { getByText } = render(
      <ThemedText {...baseProps} type="defaultSemiBold" />,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontWeight: '600' })]),
    );
  });

  it('applies the correct style for type="subtitle"', () => {
    const { getByText } = render(<ThemedText {...baseProps} type="subtitle" />);
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 20, fontWeight: 'bold' }),
      ]),
    );
  });

  it('applies the correct style for type="link"', () => {
    const { getByText } = render(<ThemedText {...baseProps} type="link" />);
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#0a7ea4', fontSize: 16 }),
      ]),
    );
  });

  it('uses secondary color when variant="secondary"', () => {
    const { getByText } = render(
      <ThemedText {...baseProps} variant="secondary" />,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'gray' })]),
    );
  });

  it('passes additional style prop', () => {
    const customStyle = { fontSize: 99, color: 'red' };
    const { getByText } = render(
      <ThemedText {...baseProps} style={customStyle} />,
    );
    const text = getByText('Test Text');
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining(customStyle)]),
    );
  });

  it('passes other TextProps', () => {
    const { getByText } = render(
      <ThemedText {...baseProps} accessibilityLabel="label" />,
    );
    const text = getByText('Test Text');
    expect(text.props.accessibilityLabel).toBe('label');
  });
});
