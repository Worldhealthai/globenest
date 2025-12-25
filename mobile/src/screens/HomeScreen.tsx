import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function HomeScreen() {
  const navigation = useNavigation();

  const features = [
    {
      icon: 'home',
      title: 'Smart Room Matching',
      description: 'Swipe through verified rooms and flatmates',
      color: COLORS.primary,
    },
    {
      icon: 'cart',
      title: 'Instant Marketplace',
      description: 'Buy and sell furniture and essentials',
      color: COLORS.secondary,
    },
    {
      icon: 'chatbubbles',
      title: 'Secure Messaging',
      description: 'Chat directly with matches',
      color: COLORS.accent,
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '5K+', label: 'Matches' },
    { value: '£2M+', label: 'Traded' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.background, COLORS.backgroundSecondary]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.logo}>
                <Text style={{ color: COLORS.primary }}>Globe</Text>
                <Text style={{ color: COLORS.secondary }}>Nest</Text>
              </Text>
              <Badge variant="secondary">London's #1 Expat Platform</Badge>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle" size={40} color={COLORS.gray[400]} />
            </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              Your New Life in London{'\n'}
              <Text style={{ color: COLORS.primary }}>Starts Here</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Connect with expats leaving as you arrive. Find housing, flatmates, and everything you need.
            </Text>
            <Button
              title="Get Started"
              onPress={() => navigation.navigate('Rooms' as never)}
              size="lg"
              fullWidth
              style={styles.ctaButton}
            />
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Everything You Need</Text>
          <View style={styles.features}>
            {features.map((feature, index) => (
              <Card key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                  <Ionicons name={feature.icon as any} size={32} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* CTA */}
        <Card style={styles.ctaCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.ctaGradient}
          >
            <Ionicons name="globe" size={48} color={COLORS.white} />
            <Text style={styles.ctaTitle}>Ready to Make London Home?</Text>
            <Text style={styles.ctaText}>
              Join thousands of expats who've found their perfect place
            </Text>
            <Button
              title="Start Your Journey"
              onPress={() => navigation.navigate('Rooms' as never)}
              variant="secondary"
              size="lg"
              style={{ marginTop: SPACING.lg }}
            />
          </LinearGradient>
        </Card>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
  },
  logo: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  hero: {
    marginTop: SPACING.xl,
  },
  heroTitle: {
    fontSize: FONT_SIZES.xxxl + 4,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
    marginBottom: SPACING.xl,
    lineHeight: 26,
  },
  ctaButton: {
    marginTop: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.white,
    marginTop: -SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    marginHorizontal: SPACING.lg,
    ...SHADOWS.soft,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginTop: SPACING.xs,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  features: {
    gap: SPACING.md,
  },
  featureCard: {
    padding: SPACING.lg,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  featureDescription: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    lineHeight: 22,
  },
  ctaCard: {
    marginHorizontal: SPACING.lg,
    padding: 0,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});
