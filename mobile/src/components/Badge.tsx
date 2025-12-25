import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';

interface BadgeProps {
  children: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral';
  style?: ViewStyle;
}

export default function Badge({ children, variant = 'neutral', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={[styles.text, styles[`text_${variant}`]]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  primary: {
    backgroundColor: `${COLORS.primary}20`,
  },
  secondary: {
    backgroundColor: `${COLORS.secondary}20`,
  },
  success: {
    backgroundColor: `${COLORS.success}20`,
  },
  warning: {
    backgroundColor: `${COLORS.warning}20`,
  },
  neutral: {
    backgroundColor: COLORS.gray[100],
  },
  text: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  text_primary: {
    color: COLORS.primary,
  },
  text_secondary: {
    color: COLORS.secondaryDark,
  },
  text_success: {
    color: COLORS.success,
  },
  text_warning: {
    color: COLORS.warning,
  },
  text_neutral: {
    color: COLORS.gray[700],
  },
});
