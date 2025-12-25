import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from '../constants/theme';
import Button from '../components/Button';
import Card from '../components/Card';

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'arriving' | 'leaving'>('arriving');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundSecondary]}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color={COLORS.gray[900]} />
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>
              <Text style={{ color: COLORS.primary }}>Globe</Text>
              <Text style={{ color: COLORS.secondary }}>Nest</Text>
            </Text>
          </View>

          {/* Form Card */}
          <Card style={styles.formCard}>
            <Text style={styles.title}>Join GlobeNest</Text>
            <Text style={styles.subtitle}>Start your relocation journey today</Text>

            {/* User Type Selection */}
            <View style={styles.userTypeContainer}>
              <Text style={styles.label}>I am...</Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'arriving' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('arriving')}
                >
                  <Text style={styles.userTypeEmoji}>✈️</Text>
                  <Text style={[
                    styles.userTypeTitle,
                    userType === 'arriving' && styles.userTypeTextActive,
                  ]}>
                    Arriving
                  </Text>
                  <Text style={styles.userTypeSubtitle}>Moving to London</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'leaving' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('leaving')}
                >
                  <Text style={styles.userTypeEmoji}>🚀</Text>
                  <Text style={[
                    styles.userTypeTitle,
                    userType === 'leaving' && styles.userTypeTextActive,
                  ]}>
                    Leaving
                  </Text>
                  <Text style={styles.userTypeSubtitle}>Departing London</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={COLORS.gray[400]} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor={COLORS.gray[400]}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.gray[400]} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    placeholderTextColor={COLORS.gray[400]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray[400]} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={COLORS.gray[400]}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Signup Button */}
              <Button
                title="Create Account"
                onPress={() => navigation.navigate('Main')}
                fullWidth
                size="lg"
                style={{ marginTop: SPACING.md }}
              />

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-google" size={24} color={COLORS.gray[700]} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Ionicons name="logo-facebook" size={24} color={COLORS.gray[700]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  logo: {
    fontSize: FONT_SIZES.xxxl + 8,
    fontWeight: 'bold',
  },
  formCard: {
    marginHorizontal: SPACING.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    marginBottom: SPACING.lg,
  },
  userTypeContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  userTypeButton: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.gray[200],
    alignItems: 'center',
  },
  userTypeButtonActive: {
    borderColor: COLORS.secondary,
    backgroundColor: `${COLORS.secondary}10`,
  },
  userTypeEmoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  userTypeTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[700],
  },
  userTypeTextActive: {
    color: COLORS.secondary,
  },
  userTypeSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  form: {},
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray[50],
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  input: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[900],
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  dividerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[500],
    paddingHorizontal: SPACING.md,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
  },
  footerLink: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
