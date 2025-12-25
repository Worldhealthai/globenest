import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    user: {
      name: 'Marcus Johnson',
      avatar: null,
      verified: true,
    },
    lastMessage: 'The sofa is still available! When would you like to pick it up?',
    timestamp: '2:30 PM',
    unread: 2,
  },
  {
    id: '2',
    user: {
      name: 'Sarah Chen',
      avatar: null,
      verified: true,
    },
    lastMessage: "Great! I'd love to view the room this weekend.",
    timestamp: '12:15 PM',
    unread: 0,
  },
  {
    id: '3',
    user: {
      name: 'Elena Rodriguez',
      avatar: null,
      verified: true,
    },
    lastMessage: 'Thanks for the info about the area!',
    timestamp: 'Yesterday',
    unread: 0,
  },
];

export default function MessagesScreen() {
  const renderConversation = ({ item }: any) => (
    <TouchableOpacity style={styles.conversationItem} activeOpacity={0.7}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color={COLORS.gray[400]} />
        {item.unread > 0 && <View style={styles.unreadDot} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.user.name}</Text>
            {item.user.verified && (
              <Ionicons name="shield-checkmark" size={14} color={COLORS.secondary} />
            )}
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <Text
          style={[styles.lastMessage, item.unread > 0 && styles.lastMessageUnread]}
          numberOfLines={2}
        >
          {item.lastMessage}
        </Text>
      </View>

      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages 💬</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={COLORS.gray[400]} />
        <Text style={styles.searchPlaceholder}>Search messages...</Text>
      </View>

      {/* Conversations List */}
      <FlatList
        data={MOCK_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.soft,
  },
  searchPlaceholder: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[400],
  },
  list: {
    paddingHorizontal: SPACING.lg,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  name: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
  },
  lastMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    lineHeight: 18,
  },
  lastMessageUnread: {
    color: COLORS.gray[900],
    fontWeight: '500',
  },
  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  unreadText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
  },
  separator: {
    height: SPACING.xs,
  },
});
