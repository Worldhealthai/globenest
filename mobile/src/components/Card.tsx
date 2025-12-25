import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ children, onPress, style, padding = 'md' }: CardProps) {
  const cardStyles = [
    styles.card,
    styles[`padding_${padding}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.soft,
  },
  padding_none: {
    padding: 0,
  },
  padding_sm: {
    padding: SPACING.sm,
  },
  padding_md: {
    padding: SPACING.md,
  },
  padding_lg: {
    padding: SPACING.lg,
  },
});
