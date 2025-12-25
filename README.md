# 🌍 GlobeNest

**Connect. Relocate. Thrive.**

GlobeNest is the ultimate platform for expats relocating to London. Find housing, flatmates, and essential items all in one trusted, community-driven app.

Available as both a **Next.js web app** and **React Native mobile app** (iOS & Android).

---

## ✨ Features

### 🏠 Smart Room Matching
- **Tinder-like swipe interface** for finding rooms and flatmates
- Filter by location, budget, and lifestyle preferences
- View multiple property images with smooth transitions
- Track liked rooms and matches in real-time
- Verified user profiles with badges

### 🛋️ Marketplace
- Buy and sell furniture, appliances, and household essentials
- Category-based filtering (Furniture, Appliances, Kitchen, Decor, Electronics)
- Real-time search functionality
- Condition badges (New, Like-New, Good, Fair)
- Direct messaging with sellers

### 💬 Messaging System
- Secure in-app messaging
- Conversation list with unread indicators
- Real-time chat interface
- Message timestamps and read receipts
- Profile verification in chat

### 🔐 Authentication
- Beautiful login and signup flows
- User type selection (Arriving/Leaving expat)
- Social authentication options (Google, Facebook)
- Profile verification system

### 🎨 Design System
- **Primary:** `#FF4741` (Vivid Red)
- **Secondary:** `#5CE1E6` (Turquoise Blue)
- **Background:** `#FFF8F0` (Light Orange)
- **Accent:** `#A7D2DD` (Pastel Gray Azure)
- Custom shadows and micro-interactions
- Fully responsive design

---

## 🚀 Tech Stack

### Web App
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand
- **Forms:** React Hook Form

### Mobile App (iOS & Android)
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** React Navigation v7
- **Animations:** React Native Reanimated
- **Gestures:** React Native Gesture Handler
- **UI:** Custom components with gradients

---

## 📦 Installation

### Web App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the web app.

### Mobile App

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS (requires macOS)
npm run ios

# Run on Android
npm run android
```

See [mobile/README.md](mobile/README.md) for detailed mobile setup instructions.

---

## 📁 Project Structure

```
globenest/
├── app/                      # Next.js web app
│   ├── auth/                 # Authentication pages
│   ├── marketplace/          # Marketplace page
│   ├── messages/             # Messaging page
│   ├── rooms/                # Room matching page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── mobile/                   # React Native mobile app
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── screens/          # App screens
│   │   ├── navigation/       # Navigation setup
│   │   ├── constants/        # Theme and constants
│   │   └── types/            # TypeScript types
│   ├── App.tsx               # Root component
│   ├── app.json              # Expo configuration
│   └── README.md             # Mobile app documentation
├── components/               # Web app components
│   ├── features/
│   ├── layout/
│   └── ui/
├── lib/                      # Shared utilities
│   ├── mockData.ts
│   └── utils.ts
├── types/                    # Shared types
│   └── index.ts
├── next.config.js
└── tsconfig.json
```

---

## 🎯 Pages

- **`/`** - Landing page with hero, features, and CTA sections
- **`/rooms`** - Swipeable room matching interface
- **`/marketplace`** - Browse and search marketplace items
- **`/messages`** - In-app messaging system
- **`/auth/login`** - User login
- **`/auth/signup`** - User registration

---

## 🎨 Component Library

### Button
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Get Started
</Button>
```

### Card
```tsx
<Card hover padding="lg">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  icon={<Mail size={18} />}
/>
```

### Badge
```tsx
<Badge variant="success">Verified</Badge>
```

---

## 🌟 Key Features Explained

### Swipeable Room Cards
The room matching interface uses Framer Motion for smooth drag animations:
- **Swipe right** to like a room
- **Swipe left** to pass
- **Undo button** to go back
- Real-time match tracking

### Marketplace Filtering
Advanced filtering system with:
- Category tabs
- Search functionality
- Condition badges
- Location-based sorting

### Messaging Interface
Professional chat experience with:
- Conversation list sidebar
- Real-time message updates
- User verification indicators
- Message timestamps

---

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Payment processing
- [ ] Advanced search filters
- [ ] User reviews and ratings
- [ ] In-app booking system
- [ ] Push notifications
- [ ] Mobile app (React Native)

---

## 📄 License

This project is part of a private repository.

---

## 👥 Contributing

This is a private project. Please contact the repository owner for contribution guidelines.

---

**Built with ❤️ for expats worldwide**