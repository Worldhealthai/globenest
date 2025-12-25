import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import Card from '../components/Card';
import Badge from '../components/Badge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

// Mock data
const MOCK_ROOMS = [
  {
    id: '1',
    title: 'Cozy Double Room in Camden',
    price: 950,
    location: 'Camden, NW1',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    user: { name: 'Marcus Johnson', verified: true, isLeaving: true },
    amenities: ['WiFi', 'Garden', 'Washing Machine'],
    roomType: 'private',
    billsIncluded: true,
  },
  {
    id: '2',
    title: 'Modern Studio in Shoreditch',
    price: 1350,
    location: 'Shoreditch, E1',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    user: { name: 'Sarah Chen', verified: true, isLeaving: false },
    amenities: ['WiFi', 'Gym', 'Concierge'],
    roomType: 'private',
    billsIncluded: false,
  },
  {
    id: '3',
    title: 'Spacious Room in Notting Hill',
    price: 1100,
    location: 'Notting Hill, W11',
    images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800'],
    user: { name: 'Elena Rodriguez', verified: true, isLeaving: false },
    amenities: ['WiFi', 'Cleaner', 'Central Heating'],
    roomType: 'private',
    billsIncluded: true,
  },
];

export default function RoomsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedRooms, setLikedRooms] = useState<any[]>([]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const room = MOCK_ROOMS[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setLikedRooms([...likedRooms, room]);
    }
    if (currentIndex < MOCK_ROOMS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.1;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        runOnJS(handleSwipe)(direction);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = (translateX.value / SCREEN_WIDTH) * 25;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  if (!room) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
          <Text style={styles.emptyTitle}>All Caught Up!</Text>
          <Text style={styles.emptyText}>
            You've viewed all available rooms. Check back soon for more!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Room</Text>
        <View style={styles.stats}>
          <Badge variant="success">{likedRooms.length} Liked</Badge>
          <Badge variant="neutral">{MOCK_ROOMS.length - currentIndex} Remaining</Badge>
        </View>
      </View>

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <Card padding="none" style={styles.roomCard}>
              <Image source={{ uri: room.images[0] }} style={styles.image} />
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>£{room.price}</Text>
                <Text style={styles.priceLabel}>/mo</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.title}>{room.title}</Text>
                <View style={styles.location}>
                  <Ionicons name="location" size={16} color={COLORS.gray[600]} />
                  <Text style={styles.locationText}>{room.location}</Text>
                </View>

                <View style={styles.user}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={24} color={COLORS.gray[400]} />
                  </View>
                  <View style={styles.userInfo}>
                    <View style={styles.userName}>
                      <Text style={styles.userNameText}>{room.user.name}</Text>
                      {room.user.verified && (
                        <Ionicons name="shield-checkmark" size={16} color={COLORS.secondary} />
                      )}
                    </View>
                    <Text style={styles.userStatus}>
                      {room.user.isLeaving ? '🚀 Leaving London' : '✨ New to London'}
                    </Text>
                  </View>
                </View>

                <View style={styles.amenities}>
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="neutral">
                      {amenity}
                    </Badge>
                  ))}
                </View>

                {room.billsIncluded && (
                  <Text style={styles.billsIncluded}>✓ Bills Included</Text>
                )}
              </View>
            </Card>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleSwipe('left')}
        >
          <Ionicons name="close" size={32} color={COLORS.error} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('right')}
        >
          <Ionicons name="heart" size={32} color={COLORS.success} />
        </TouchableOpacity>
      </View>

      {/* Liked Rooms List */}
      {likedRooms.length > 0 && (
        <View style={styles.likedSection}>
          <Text style={styles.likedTitle}>❤️ Liked ({likedRooms.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {likedRooms.map((likedRoom, index) => (
              <Card key={index} padding="sm" style={styles.likedCard}>
                <Image source={{ uri: likedRoom.images[0] }} style={styles.likedImage} />
                <Text style={styles.likedPrice}>£{likedRoom.price}/mo</Text>
              </Card>
            ))}
          </ScrollView>
        </View>
      )}
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
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  card: {
    width: SCREEN_WIDTH - SPACING.lg * 2,
  },
  roomCard: {
    ...SHADOWS.hard,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  priceTag: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginLeft: 2,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  locationText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    marginLeft: SPACING.xs,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.gray[100],
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  userNameText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  userStatus: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginTop: 2,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  billsIncluded: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  passButton: {},
  likeButton: {},
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    textAlign: 'center',
  },
  likedSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  likedTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  likedCard: {
    marginRight: SPACING.md,
    width: 120,
  },
  likedImage: {
    width: '100%',
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  likedPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
