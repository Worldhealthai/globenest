export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  isLeaving: boolean;
  location?: string;
  moveDate?: Date;
  preferences?: {
    lifestyle: string[];
    budget: { min: number; max: number };
    duration: string;
  };
}

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  available: Date;
  user: User;
  amenities: string[];
  roomType: 'private' | 'shared';
  billsIncluded: boolean;
  deposit: number;
  minStay: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  images: string[];
  location: string;
  user: User;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  user: User;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}
