# 📱 GlobeNest Mobile App

**Native iOS & Android App for Expat Relocation**

This is the React Native mobile app for GlobeNest, built with Expo. It provides a native mobile experience for finding housing, flatmates, and essential items in London.

## ✨ Features

- 🏠 **Swipeable Room Matching** - Tinder-like interface for browsing rooms
- 🛋️ **Marketplace** - Buy and sell furniture and essentials
- 💬 **Messaging** - Chat with matches and sellers
- 🔐 **Authentication** - Login and signup with social options
- 📱 **Native Experience** - Smooth animations and gestures
- 🎨 **Beautiful UI** - Matches the web app design system

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- For iOS: macOS with Xcode
- For Android: Android Studio

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device/Emulator

```bash
# iOS (requires macOS)
npm run ios

# Android
npm run android

# Web (for quick testing)
npm run web
```

### Using Expo Go

1. Install Expo Go on your iOS or Android device
2. Run `npm start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

## 📁 Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── RoomsScreen.tsx
│   │   ├── MarketplaceScreen.tsx
│   │   ├── MessagesScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SignupScreen.tsx
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── constants/           # Theme and constants
│   │   └── theme.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── utils/               # Utility functions
├── assets/                  # App icons and images
├── App.tsx                  # Root component
├── app.json                 # Expo configuration
└── package.json
```

## 🎨 Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **UI**: Custom components with gradient support

## 🎯 Screens

- **Home** - Landing screen with features and CTAs
- **Rooms** - Swipeable room cards with like/pass gestures
- **Marketplace** - Grid layout with search and filters
- **Messages** - Conversation list with unread indicators
- **Login/Signup** - Authentication flows

## 🔧 Configuration

The app is configured in `app.json`:

- **Name**: GlobeNest
- **Bundle ID**: com.globenest.app
- **Version**: 1.0.0
- **Orientation**: Portrait
- **Splash Screen**: Custom GlobeNest branding

## 📱 Building for Production

### iOS

```bash
# Build for iOS
expo build:ios

# Or with EAS
eas build --platform ios
```

### Android

```bash
# Build for Android
expo build:android

# Or with EAS
eas build --platform android
```

## 🎨 Design System

Colors match the web app:
- Primary: `#FF4741`
- Secondary: `#5CE1E6`
- Accent: `#A7D2DD`
- Background: `#FFF8F0`

## 🚧 Future Enhancements

- [ ] Backend integration
- [ ] Push notifications
- [ ] Camera for photo uploads
- [ ] Maps integration
- [ ] Biometric authentication
- [ ] Offline support
- [ ] Real-time messaging

## 📄 License

Part of the GlobeNest project - Private repository

---

**Built with ❤️ using React Native & Expo**
