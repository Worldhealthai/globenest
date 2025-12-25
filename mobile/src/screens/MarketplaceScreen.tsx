import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES, SHADOWS } from '../constants/theme';
import Card from '../components/Card';
import Badge from '../components/Badge';

const CATEGORIES = ['All', 'Furniture', 'Appliances', 'Kitchen', 'Decor', 'Electronics'];

const MOCK_ITEMS = [
  {
    id: '1',
    title: 'IKEA Sofa - Excellent Condition',
    price: 150,
    category: 'Furniture',
    condition: 'like-new',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
    location: 'Shoreditch, E1',
    user: { name: 'Marcus Johnson', verified: true },
  },
  {
    id: '2',
    title: 'Desk & Office Chair Set',
    price: 80,
    category: 'Furniture',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1551815113-5d8c91e2e9a6?w=800',
    location: 'Camden, NW1',
    user: { name: 'Sarah Chen', verified: true },
  },
  {
    id: '3',
    title: 'Kitchen Essentials Bundle',
    price: 45,
    category: 'Kitchen',
    condition: 'good',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800',
    location: 'Notting Hill, W11',
    user: { name: 'Elena Rodriguez', verified: true },
  },
];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = MOCK_ITEMS.filter(item =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConditionColor = (condition: string) => {
    if (condition === 'new' || condition === 'like-new') return 'success';
    if (condition === 'good') return 'primary';
    return 'warning';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace 🛋️</Text>
        <Text style={styles.headerSubtitle}>
          Buy and sell with fellow expats
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.gray[400]}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          Showing <Text style={styles.resultsCount}>{filteredItems.length}</Text> items
        </Text>
      </View>

      {/* Items Grid */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card padding="none" style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Badge variant={getConditionColor(item.condition)} style={styles.conditionBadge}>
              {item.condition}
            </Badge>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>£{item.price}</Text>
            </View>

            <View style={styles.itemContent}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.itemLocation}>
                <Ionicons name="location" size={12} color={COLORS.gray[500]} />
                <Text style={styles.itemLocationText}>{item.location}</Text>
              </View>
              <View style={styles.itemUser}>
                <View style={styles.userAvatar}>
                  <Ionicons name="person" size={12} color={COLORS.gray[400]} />
                </View>
                <Text style={styles.userName} numberOfLines={1}>
                  {item.user.name}
                </Text>
                {item.user.verified && (
                  <Ionicons name="shield-checkmark" size={12} color={COLORS.secondary} />
                )}
              </View>
            </View>
          </Card>
        )}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color={COLORS.white} />
      </TouchableOpacity>
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
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.soft,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[900],
  },
  filterButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.soft,
  },
  categoriesContainer: {
    marginTop: SPACING.lg,
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  categoryButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray[100],
  },
  categoryButtonActive: {
    backgroundColor: COLORS.secondary,
  },
  categoryText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.gray[700],
  },
  categoryTextActive: {
    color: COLORS.white,
  },
  resultsHeader: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  resultsText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
  },
  resultsCount: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  grid: {
    paddingHorizontal: SPACING.lg,
  },
  row: {
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  itemCard: {
    flex: 1,
    ...SHADOWS.soft,
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  conditionBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
  },
  priceTag: {
    position: 'absolute',
    bottom: 100,
    left: SPACING.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  priceText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  itemContent: {
    padding: SPACING.md,
  },
  itemTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
    lineHeight: 18,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  itemLocationText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[500],
    marginLeft: 2,
  },
  itemUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userAvatar: {
    width: 16,
    height: 16,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    flex: 1,
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray[600],
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.hard,
  },
});
